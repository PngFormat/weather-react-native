import React, { useEffect, useState } from 'react';
import {ScrollView,Image, Button, ActivityIndicator, StyleSheet, Text, View, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWeatherImage } from '../functions/getWeatherImage';

export default function Page() {

    const[weatherData , setWeatherData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [city, setCity] = useState<string> ('');
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [dark, setDark] = useState<boolean> (false);


    const API_KEY_WEATHER = 'cbf8b8330b7cb5b3f1e535563cba25bc'


    useEffect(() =>{
        fetchWeatherData()
        const loadSearchHistory = async () => {
          const history = await AsyncStorage.getItem('searchHistory')
          if(history) {
            setSearchHistory(JSON.parse(history));
          }
        }
    },[])

    const fetchWeatherData = async () => {
      if (city === '') {
        setError('Please enter a city');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_WEATHER}&units=metric`);
        setWeatherData(response.data);


        const updatedHisrtory = [city, ...searchHistory.filter(item => item !== city)]
        setSearchHistory(updatedHisrtory);
        await AsyncStorage.setItem('searchHistory',JSON.stringify(updatedHisrtory))
        setError(null);
  

      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };


    useEffect(() => {
      if (city !== '') {
        fetchWeatherData();
      }
    }, []);

    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="black" />
        </View>
      );

    }

    // if (error) {
    //   return (
    //     <View style={styles.container}>
    //       <Text>Error: {error}</Text>
    //       <Button title="Retry" onPress={fetchWeatherData} />
    //     </View>
    //   );
    // }

    const handleFetchWeather  = () =>{
      setLoading(true)
      setTimeout(() => {

        fetchWeatherData()
      },1000)
    }
  return (
    <ScrollView contentContainerStyle={styles.container}>
    <Text>Weather</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter city"
      value={city}
      onChangeText={setCity}
    />
    {weatherData && (
      <View>
        <View style={styles.row}>
          <Text>Weather in: {city}</Text>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/8354/8354127.png' }}
            style={styles.icon}
          />
        </View>
        <View style={styles.row}>
          <Text>Temperature: {weatherData.main.temp} °C</Text>
          <Image
            source={{
              uri: 'https://static-00.iconduck.com/assets.00/thermometer-celsius-icon-1669x2048-7lousfb6.png',
            }}
            style={styles.icon}
          />
        </View>
        <View style={styles.row}>
          <Text>Description: {weatherData.weather[0].description}</Text>
          <Image
            source={{ uri: getWeatherImage(weatherData.weather[0].description) }}
            style={styles.icon}
          />
        </View>
        <View style={styles.row}>
          <Text>Humidity: {weatherData.main.humidity}%</Text>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/747/747769.png' }}
            style={styles.icon}
          />
        </View>
      </View>
    )}
    {weatherData && (
      <Image
        source={{ uri: getWeatherImage(weatherData.weather[0].description) }}
        style={styles.description}
      />
    )}
    <View style={styles.historyContainer}>
      <Text>Search History:</Text>
      {searchHistory.map((item, index) => (
        <View key={index} style={styles.historyItem}>
          <Text onPress={() => setCity(item)}>{item}</Text>
        </View>
      ))}
    </View>
    <Button title="Refresh Weather" onPress={handleFetchWeather} />
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  historyContainer: {
    width: '80%',
    marginVertical: 20,
  },
  historyItem: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  icon:{
    width:50,
    height:50,
  },
    description:{
        width:300,
        height:300,
    },
  row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 50,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  input:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
