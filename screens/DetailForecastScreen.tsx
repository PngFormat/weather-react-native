import React, { useEffect, useState } from 'react';
import { Image,View, Text, Button, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { getWeatherImage } from '../functions/getWeatherImage';

const API_KEY_WEATHER = 'cbf8b8330b7cb5b3f1e535563cba25bc';

const DetailForecast: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const { city } = route.params;
    const [hourlyData, setHourlyData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchHourlyWeatherData();
    }, [city]);

    const fetchHourlyWeatherData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY_WEATHER}&units=metric`);
            const hourlyData = response.data.list.filter((item: any, index: number) => index % 1 === 0);
            setHourlyData(hourlyData);
            setError(null);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <LinearGradient
                colors={['#0b5fa5', '#00ad6b']}
                style={styles.container}
            >
                <ActivityIndicator size="large" color="#fff" />
            </LinearGradient>
        );
    }

    if (error) {
        return (
            <LinearGradient
                colors={['#0b5fa5', '#00ad6b']}
                style={styles.container}
            >
                <Text style={styles.error}>Error: {error}</Text>
            </LinearGradient>
        );
    }

    if (hourlyData.length === 0) {
        return (
            <LinearGradient
                colors={['#0b5fa5', '#00ad6b']}
                style={styles.container}
            >
                <Text style={styles.noData}>No hourly data available for {city}.</Text>
            </LinearGradient>
        );
    }

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.time}>{new Date(item.dt * 1000).toLocaleTimeString()}</Text>
            <Text style={styles.temperature}>{item.main.temp} °C</Text>
            <Text style={styles.description}>{item.weather[0].description}</Text>
            <Image 
                source={{ uri: getWeatherImage(item.weather[0].description) }} 
                style={styles.weatherImage}
            />
        </View>
    );

    return (
        <LinearGradient
            colors={['#0b5fa5', '#00ad6b']}
            style={styles.container}
        >
            <Text style={styles.title}>Hourly Forecast for {city}</Text>
            <FlatList
                data={hourlyData}
                renderItem={renderItem}
                keyExtractor={(item) => item.dt.toString()}
                contentContainerStyle={styles.listContainer}
            />
            <Button
                title="Back to Weather"
                onPress={() => navigation.goBack()}
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    weatherImage: {
        width: 50,
        height: 50,
        marginTop: 10,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 16,
    },
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    time: {
        fontSize: 18,
        color: '#fff',
    },
    temperature: {
        fontSize: 18,
        color: '#fff',
    },
    description: {
        fontSize: 16,
        color: '#fff',
    },
    error: {
        color: 'red',
        fontSize: 18,
    },
    noData: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        marginTop: 20,
    },
    listContainer: {
        flexGrow: 1,
    },
});

export default DetailForecast;
