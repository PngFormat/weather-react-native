import React, { useEffect, useState, useCallback } from 'react';
import { Image,ActivityIndicator, Button, StyleSheet, Text, TextInput, View, TouchableHighlight, ScrollView, FlatList } from 'react-native';
import { fetchWeatherData } from '../functions/fetchWeather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getLocation from '../functions/getLocation';
import LocationComponent from '../functions/getLocation';
import { useTheme } from '../context/ThemeContext';
import { getWeatherImage } from '../functions/getWeatherImage';
import { LinearGradient } from 'expo-linear-gradient';
import { darkTheme,lightTheme } from '../styles/forecastScreenStyle';

const WeatherApp = ( {navigation}: any  ) => {
  const { theme, toggleTheme } = useTheme();
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const isLight = theme === 'light';
  const styles = theme === 'light' ? lightTheme : darkTheme;

  const handleLocationFetched = (fetchedCity: string) => {
    setCity(fetchedCity);
  };

  
  useEffect(() => {
    const loadSearchHistory = async () => {
      const history = await AsyncStorage.getItem('searchHistory');
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    };
    loadSearchHistory();
  }, []);

  const handleFetchWeather = useCallback(() => {
    fetchWeatherData(city, searchHistory, setWeatherData, setLoading, setError, setSearchHistory);
    setCity(city);
  }, [city, searchHistory]);

  return (
   
    
       <LinearGradient
       colors={isLight ? ['#03c2fc', '#61ffba'] : ['#0b5fa5', '#00ad6b']}
            style={styles.container}
        >
    
    <Text style={styles.text}>Weather</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter city"
      value={city}
      onChangeText={setCity}
      placeholderTextColor={theme === 'light' ? '#000000' : '#CCCCCC'} 
    />
    <Button title="Refresh Weather" onPress={handleFetchWeather} />
    <Button 
        title="See 6-Day Forecast" 
        onPress={() => navigation.navigate('WeatherForecast', { city })}
      />
    <Button title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Theme`} onPress={toggleTheme} />
    <Text style={styles.text}>Your location</Text>
    <LocationComponent onLocationFetched={handleLocationFetched} />
    
         {weatherData && (
        <View>
          <View style={styles.row}>
            <Text>Weather in: {city}</Text>
            <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/8354/8354127.png'}} style={styles.icon}></Image>
          </View>
          <View style={styles.row}>
          <Text>Temperature: {weatherData.main.temp} °C</Text>
          <Image source={{uri:'https://static-00.iconduck.com/assets.00/thermometer-celsius-icon-1669x2048-7lousfb6.png'}} style={styles.icon}></Image>
          </View>
          <View style={styles.row}>
          <Text>Description: {weatherData.weather[0].description}</Text>
          <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/8655/8655461.png'}} style={styles.icon}></Image>
         </View>

        </View>
      )}
       
      <View style={styles.historyContainer}>
      <Text>Search History:</Text>
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
     />
      ): (
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
      {weatherData&& (
            <Image source={{ uri: getWeatherImage(weatherData.weather[0].description) }} style={styles.description}></Image>
        )}
      </LinearGradient>
  
  );
};

export default WeatherApp;
