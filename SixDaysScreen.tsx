import React, { useEffect, useState } from 'react';
import {Image,View, Text, StyleSheet, ActivityIndicator, FlatList, Alert} from 'react-native';
import axios from 'axios';
import { fetchWeatherData } from './fetchWeather';
import { getWeatherImage } from './getWeatherImage';
import { LinearGradient } from 'expo-linear-gradient';


const API_KEY_WEATHER = 'cbf8b8330b7cb5b3f1e535563cba25bc';

export default function SixDaysForecast({route}: any) {
    const { city } = route.params;
    const [forecastData, setForecastData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        fetchForecastData();
        // Alert.alert('CITY',city)

    },[city]);

    const fetchForecastData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY_WEATHER}&units=metric`
            );
            setForecastData(response.data);
            setError(null);
        } catch (e: any) {
            setError(e.message);
            Alert.alert('Error', e.message);
        } finally {
            setLoading(false);
        }
    }
    if(loading){
        <View style={styles.container}>
            <Text> Error: {error}</Text>
        </View>
    }

    if (!forecastData) {
        return (
            <View style={styles.container}>
                <Text>No data available.</Text>
            </View>
        );
    }

    const dailyForecastArray = forecastData.list
    .filter((item:any, index: number) => index % 8 ===0)
    .slice(0,6)
    .map((item:any) => ({
        date: new Date(item.dt * 1000).toLocaleDateString(),
        temp: item.main.temp,
        description: item.weather[0].description,
        image: getWeatherImage(item.weather[0].description)
    }));
    

        return (
         
            <LinearGradient
            colors={['#03c2fc', '#61ffba']}
            style={styles.container}
        >
            <Text  style={styles.title}>5-Day Weather Forecast for {city}</Text>
            <FlatList
                data={dailyForecastArray}
                keyExtractor={(item) => item.date}
                renderItem={({ item }) => (
                    <View style={styles.dayContainer}>
                   
                    <Image source={{ uri: item.image }} style={styles.image}></Image>
                    <Text  style={styles.date}>Date: {item.date}</Text>
                    <Text >Temperature: 
                        <Text style={styles.temperature}>{item.temp.toFixed(1)} °C</Text></Text>
                    <Text>Description: {item.description}</Text>
                    </View>
                )}
                />
        </LinearGradient>
        )
    

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 24,
    },
    temperature: {
        fontWeight: '500',
        fontSize: 18,
    },
    date: {
        fontWeight: '500',
        fontSize: 16,
    },
    dayContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        width: '100%',
    },
    description: {
        width:170,
        height:70,
    },
    title: {
        fontWeight: '500',
        fontSize: 25,
    },
    image: {
        width: 170,
        height: 70,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#ffffff', 
    },
});
