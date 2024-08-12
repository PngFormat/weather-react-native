import React, { useEffect, useState, useCallback } from 'react';
import { Image,ActivityIndicator, Button, StyleSheet, Text, TextInput, View, TouchableHighlight, ScrollView, FlatList } from 'react-native';
import { fetchWeatherData } from './fetchWeather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getLocation from './getLocation';
import LocationComponent from './getLocation';
import { useTheme } from './ThemeContext';
import { getWeatherImage } from './getWeatherImage';

const WeatherApp = () => {
  const { theme, toggleTheme } = useTheme();
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const styles = theme === 'light' ? lightTheme : darkTheme;

  const handleLocationFetched = (fetchedCity: string) => {
    setCity(fetchedCity);
  };


  const renderItem = ({ item }: { item: string }) => (
    <TouchableHighlight onPress={() => setCity(item)}>
      <View style={styles.historyItem}>
        <Text>{item}</Text>
      </View>
    </TouchableHighlight>
  );
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
  }, [city, searchHistory]);

  return (
    <View style={styles.container}>
    <Text style={styles.text}>Weather</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter city"
      value={city}
      onChangeText={setCity}
      placeholderTextColor={theme === 'light' ? '#000000' : '#CCCCCC'} 
    />
    <Button title="Refresh Weather" onPress={handleFetchWeather} />
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
          <Image source={{ uri: getWeatherImage(weatherData.weather[0].description) }} style={styles.icon}></Image>
         </View>

         <View style={styles.row}>
          <Text>Humidity: {weatherData.main.humidity}%</Text>
          <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/747/747769.png'}} style={styles.icon}></Image>
        </View>
        <View style={styles.row}>
          <Text>Wind Speed: {weatherData.wind.speed} m/s</Text>
          <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/622/622464.png'}} style={styles.icon}></Image>
        </View>
        <View style={styles.row}>
          <Text>Pressure: {weatherData.main.pressure} hPa</Text>
          <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/748/748272.png'}} style={styles.icon}></Image>
        </View>
        <View style={styles.row}>
          <Text>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</Text>
          <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/869/869636.png'}} style={styles.icon}></Image>
        </View>
        <View style={styles.row}>
          <Text>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</Text>
          <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/869/869636.png'}} style={styles.icon}></Image>
        </View>


        </View>
      )}
      <View style={styles.historyContainer}>
      <Text>Search History:</Text>
      {searchHistory.length > 3 ? (
        <FlatList
          data={searchHistory}
          keyExtractor={(item,index) => index.toString()}
          renderItem={renderItem}
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
     
    </View>
  );
};

export default WeatherApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  historyContainer: {
    width: '80%',
    height:'20%',
    marginVertical: 20,
    flex: 1,
  },
  historyItem: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
  },
  row: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 50,
    height: 50,
  }
});

const lightTheme = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#000000',
  },
  input: {
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  historyContainer: {
    width: '80%',
    height:'20%',
    marginVertical: 20,
    flex: 1,
  },
  historyItem: {
    padding: 10,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  row: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 50,
    height: 50,
  },
});

const darkTheme = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#000000',
  },
  text: {
    color: '#FFFFFF',
  },
  historyContainer: {
    width: '80%',
    height:'20%',
    marginVertical: 20,
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#333333',
    color: '#FFFFFF',
  },
  historyItem: {
    padding: 10,
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
    backgroundColor: '#333333',
  },
  row: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 50,
    height: 50,
  },
});