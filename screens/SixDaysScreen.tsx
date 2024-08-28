import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet, ActivityIndicator, FlatList, Alert, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getWeatherImage } from '../functions/getWeatherImage';
import axios from 'axios';
import BackButtonComponent from '../components/BackButton';
import { WeatherNotification } from '../functions/WeatherNotifications';


const API_KEY_WEATHER = 'cbf8b8330b7cb5b3f1e535563cba25bc';


export default function SixDaysForecast({ route, navigation }: any) {
    const { city } = route.params;
    const [forecastData, setForecastData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>('vertical');

    const scrollX = new Animated.Value(0);

    useEffect(() => {
        fetchForecastData();
    }, [city]);

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
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    }

    if (!forecastData) {
        return (
            <View style={styles.container}>
                 <BackButtonComponent/>
                <Text>No data available.</Text>
            </View>
        );
    }

    const backgroundColor = scrollX.interpolate({
        inputRange: [0, 300],
        outputRange: ['#03c2fc', '#61ffba'],
        extrapolate: 'clamp',
    });

    const dailyForecastArray = forecastData.list
        .filter((item: any, index: number) => index % 8 === 0)
        .slice(0, 6)
        .map((item: any) => ({
            date: new Date(item.dt * 1000).toLocaleDateString(),
            temp: item.main.temp,
            description: item.weather[0].description,
            image: getWeatherImage(item.weather[0].description)
        }));

    const firstRow = dailyForecastArray.filter((_: any, index: any) => index % 2 === 0);
    const secondRow = dailyForecastArray.filter((_: any, index: any ) => index % 0 !== 0);

    return (
        <LinearGradient colors={['#03c2fc', '#61ffba']} style={styles.container}>
            <WeatherNotification city={city}/>
            <Animated.View style={[styles.container, { backgroundColor }]}>
            <BackButtonComponent/>
                <Text style={styles.title}>5-Day Weather Forecast for {city}</Text>
                <View style={styles.toggleContainer}>
                    <TouchableOpacity onPress={() => setOrientation('vertical')} style={[styles.toggleButton, orientation === 'horizontal' && styles.activeToggle]}>
                        <Text style={styles.toggleText}>Vertical</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setOrientation('horizontal')} style={[styles.toggleButton, orientation === 'vertical' && styles.activeToggle]}>
                        <Text style={styles.toggleText}>Horizontal</Text>
                    </TouchableOpacity>
                </View>

                {orientation === 'horizontal' ? (
                    <>
                        <View style={styles.rowContainer}>
                            <Animated.FlatList
                                data={firstRow}
                                horizontal
                                keyExtractor={(item) => item.date}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => navigation.navigate('DetailWeather', { city })}>
                                        <View style={styles.dayContainer}>
                                            <Image source={{ uri: item.image }} style={styles.image} />
                                            <Text style={styles.date}>Date: {item.date}</Text>
                                            <Text>Temperature:
                                                <Text style={styles.temperature}> {item.temp.toFixed(1)} °C</Text>
                                            </Text>
                                            <Text>Description: {item.description}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                    { useNativeDriver: false }
                                )}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                        <View style={styles.rowContainer}>
                            <Animated.FlatList
                                data={firstRow}
                                horizontal
                                keyExtractor={(item) => item.date}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => navigation.navigate('DetailWeather', { city })}>
                                        <View style={styles.dayContainer}>
                                            <Image source={{ uri: item.image }} style={styles.image} />
                                            <Text style={styles.date}>Date: {item.date}</Text>
                                            <Text>Temperature:
                                                <Text style={styles.temperature}> {item.temp.toFixed(1)} °C</Text>
                                            </Text>
                                            <Text>Description: {item.description}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                    { useNativeDriver: false }
                                )}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </>
                ) : (
                    <FlatList
                        data={dailyForecastArray}
                        keyExtractor={(item) => item.date}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigation.navigate('DetailWeather', { city })}>
                                <View style={styles.dayContainer}>
                                    <Image source={{ uri: item.image }} style={styles.image} />
                                    <Text style={styles.date}>Date: {item.date}</Text>
                                    <Text>Temperature:
                                        <Text style={styles.temperature}> {item.temp.toFixed(1)} °C</Text>
                                    </Text>
                                    <Text>Description: {item.description}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                  
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollX } } }],
                            { useNativeDriver: false }
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </Animated.View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 24,
        borderRadius: 15,
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
        width: 200,
        marginHorizontal: 10,
    },
    title: {
        fontWeight: '500',
        fontSize: 19,
        marginBottom: 20,
    },
    image: {
        width: 170,
        height: 70,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#ffffff',
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    toggleButton: {
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 5,
        backgroundColor: '#61ffba',
    },
    activeToggle: {
        backgroundColor: '#03c2fc',
    },
    toggleText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    rowContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
});

SixDaysForecast.navigationOptions = {
    headerShown: false,
};
