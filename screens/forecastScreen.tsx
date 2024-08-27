
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, ActivityIndicator, ScrollView, FlatList, Alert, Image, TouchableHighlight } from 'react-native';
import { fetchWeatherData } from '../functions/fetchWeather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocationComponent from '../functions/getLocation';
import { useTheme } from '../context/ThemeContext';
import { getWeatherImage } from '../functions/getWeatherImage';
import { LinearGradient } from 'expo-linear-gradient';
import { darkTheme, lightTheme } from '../styles/forecastScreenStyle';
import { t, setLanguage } from '../functions/changeLanguage';
import ButtonComponent from '../components/ButtonForecast';
import LanguageModal from '../components/LanguageModal';
import WeatherAlerts from '../components/WeatherAlerts';
import * as Notifications from 'expo-notifications';


const WeatherApp = ({ navigation }: any) => {
  const { theme, toggleTheme } = useTheme();
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [language, setLang] = useState<'en' | 'uk'>('en');
  const [modalVisible, setModalVisible] = useState(false);

  const isLight = theme === 'light';
  const styles = theme === 'light' ? lightTheme : darkTheme;

  const handleLocationFetched = (location: { latitude: number; longitude: number }, fetchedCity: string) => {
    setCity(fetchedCity);
    setCurrentLocation(location);
  };

  
  const handleChangeLanguage = useCallback((lang: 'en' | 'uk') => {
    setLanguage(lang);
    setLang(lang);
    setModalVisible(false);
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: t('pageTitle') });
  }, [language, t]);

  useEffect(() => {
    const loadSearchHistory = async () => {
      const history = await AsyncStorage.getItem('searchHistory');
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    };
    loadSearchHistory();

    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Notification permission not granted');
      }
    })();
  }, [t]);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Notification permission not granted');
      } else {
        console.log('Notification permission granted');
      }
    };
  
    requestPermissions();
  }, [weatherData]);

  const handleFetchWeather = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(city, searchHistory, setWeatherData, setLoading, setError, setSearchHistory);
      if (data) {
        setWeatherData(data);
      }
    } catch (err) {
      console.error(err);
      setError('Error fetching weather data');
    } finally {
      setLoading(false);
    }
  }, [city, searchHistory]);

  return (
    <LinearGradient
      colors={isLight ? ['#03c2fc', '#61ffba'] : ['#0b5fa5', '#00ad6b']}
      style={styles.container}
    >
      <Text>{t('greeting')}</Text>
      <Text>{t('weather')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('enter_city')}
        value={city}
        onChangeText={setCity}
        placeholderTextColor={theme === 'light' ? '#000000' : '#CCCCCC'}
      />
      <View style={styles.buttonContainer}>
        <ButtonComponent
          onPress={() => setModalVisible(true)}
          title={t('select_language')}
          style={styles.button}
          textStyle={styles.buttonText}
        />
        <ButtonComponent
          onPress={handleFetchWeather}
          title={t('refresh_weather')}
          style={styles.button}
          textStyle={styles.buttonText}
        />
        <ButtonComponent
          onPress={() => navigation.navigate('WeatherForecast', { city })}
          title={t('see_forecast')}
          style={styles.button}
          textStyle={styles.buttonText}
        />
        <ButtonComponent
          onPress={toggleTheme}
          title={t('switch_theme')}
          style={styles.button}
          textStyle={styles.buttonText}
        />
        <ButtonComponent
          onPress={() => {
            if (currentLocation) {
              navigation.navigate('WeatherMap', { location: currentLocation });
            } else {
              Alert.alert(t('locationNotAvailable'), t('enableLocationServices'));
            }
          }}
          title={t('weatherMap')}
          style={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
      <Text>{t('yourLocation')}</Text>
      <LocationComponent onLocationFetched={handleLocationFetched} />

      {loading && <ActivityIndicator size="large" color="#00ff00" />}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      {weatherData && (
        <View>
          <View style={styles.row}>
            <Text>{t('temperature')}: <Text style={styles.descTitle}>{weatherData.main.temp} °C</Text></Text>
            <Image source={{ uri: 'https://static-00.iconduck.com/assets.00/thermometer-celsius-icon-1669x2048-7lousfb6.png' }} style={styles.icon} />
          </View>
          <View style={styles.row}>
            <Text style={styles.descTitle}>{weatherData.weather[0].description}</Text>
          </View>
        </View>
      )}

      <View style={styles.historyContainer}>
        <Text>{t('searchHistory')}:</Text>
        {searchHistory.length > 3 ? (
          <FlatList
            data={searchHistory}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableHighlight onPress={() => setCity(item)}>
                <View style={styles.historyItem}>
                  <Text>{item}</Text>
                </View>
              </TouchableHighlight>
            )}
            contentContainerStyle={styles.listContent}
            scrollEnabled={searchHistory.length > 4}
            style={{ maxHeight: 200 }}
          />
        ) : (
          <ScrollView>
            {searchHistory.map((item, index) => (
              <TouchableHighlight key={index} onPress={() => setCity(item)}>
                <View style={styles.historyItem}>
                  <Text>{item}</Text>
                </View>
              </TouchableHighlight>
            ))}
          </ScrollView>
        )}
      </View>

      {weatherData && <WeatherAlerts weatherData={weatherData} />}

      <LanguageModal modalVisible={modalVisible} handleChangeLanguage={handleChangeLanguage} t={t} setModalVisible={setModalVisible} />
    </LinearGradient>
  );
};

export default WeatherApp;
