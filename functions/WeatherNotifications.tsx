import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_KEY_WEATHER = 'cbf8b8330b7cb5b3f1e535563cba25bc';

export const WeatherNotification = ({city} :{ city: string}) => {
    useEffect(() =>{
        const IntervalId = setInterval (() =>
        {
            checkWeatherChange();
        }, 60* 60 * 1000)
        return () => clearInterval(IntervalId);
    },[])

    const checkWeatherChange = async() =>{
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_WEATHER}&units=metric`
            )

            const currentWeather = response.data;
            const storedWeather = await AsyncStorage.getItem('lastWeatherData')

            if (storedWeather) {
                const lastWeather = JSON.parse(storedWeather);
                if (lastWeather.main.temp !== currentWeather.main.temp || lastWeather.weather[0].description !== currentWeather.weather[0].description) {
                    sendNotification(currentWeather);
                }
            }

            await AsyncStorage.setItem('lastWeatherData', JSON.stringify(currentWeather));
        }
        catch (e) {
            console.log(`Error` + {e})
        }

        };
        const sendNotification = (weatherData: any) => {
            Notifications.scheduleNotificationAsync({
                content: {
                    title: "Weather Update",
                    body: `The temperature is now ${weatherData.main.temp.toFixed(1)}°C with ${weatherData.weather[0].description}.`,
                },
                trigger: null, 
            });
    
        
    };
    return null;
}