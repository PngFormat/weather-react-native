import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, FlatList, Alert} from 'react-native';
import axios from 'axios';

const API_KEY_WEATHER = 'cbf8b8330b7cb5b3f1e535563cba25bc';

export default function SixDaysForecast({route}: any) {
    const {city } = route.params;
    const [forecastData, setForecastData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        fetchForecastData();

    },[city]);

    const fetchForecastData = async () =>{
       try {
           setLoading(true)
           const response = await axios.get(
               ' `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=6&appid=${API_KEY_WEATHER}&units=metric`')
           setForecastData(response.data)
           setError(null)
       }
       catch (e: any) {
           setError(e)
           Alert.alert('Error',e)
       }
       finally {
           setLoading(false);
       }
    }

    if(loading){
        <View style={styles.container}>
            <Text> Error: {error}</Text>
        </View>
    }

    return(
        <View style={styles.container}>
            <Text>6-Day Weather Forecast for {city}</Text>
            <FlatList
                data={forecastData.list}
                keyExtractor={(item) => item.dt.toString()}
                renderItem={({item}) => (
                    <View style={styles.dayContainer}>
                        <Text>Date: {new Date(item.dt * 1000).toLocaleDateString()}</Text>
                        <Text>Temperature: {item.temp.day} °C</Text>
                        <Text>Description: {item.weather[0].description}</Text>
                    </View>
                )}/>
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
