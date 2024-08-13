import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, FlatList, Alert} from 'react-native';
import axios from 'axios';
import { fetchWeatherData } from './fetchWeather';

const API_KEY_WEATHER = 'cbf8b8330b7cb5b3f1e535563cba25bc';

export default function SixDaysForecast({route}: any) {
    const { city } = route.params;
    const [forecastData, setForecastData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchHistory, setSearchHistory] = useState<string[]>([]);


    useEffect(() => {
        fetchForecastData();
        Alert.alert('CITY',city)

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
    console.log(forecastData);
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
        description: item.weather[0].description
    }));
    

        return (
            <View style={styles.container}>
            <Text>5-Day Weather Forecast for {city}</Text>
            <FlatList
                data={dailyForecastArray}
                keyExtractor={(item) => item.date}
                renderItem={({ item }) => (
                    <View style={styles.dayContainer}>
                        <Text>Date: {item.date}</Text>
                        <Text>Temperature: {item.temp.toFixed(1)} °C</Text>
                        <Text>Description: {item.description}</Text>
                    </View>
                )}
            />
        </View>
        )
    

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 24,
    },
    dayContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        width: '100%',
    },
});
