import React, { useEffect, useState } from 'react';
import { StyleSheet, View,Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocation } from '../context/LocationContext';
import axios from 'axios';
import { fetchWeatherData } from '../functions/fetchWeather';

const WeatherMapLocation = ({ route }: any) => {
  const { location } = useLocation();
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading,setLoading] = useState<boolean>(false);
  if (!location) {
    return <View><Text>No location available</Text></View>;
  }

  useEffect(() => {
    const fetchWeather = async () => {
      if( location) {
        try {
          setLoading(true);
          const data = await fetchWeatherData(
            '', 
            [], 
            setWeatherData, 
            setLoading, 
            setError, 
            (history) => {}, 
            location.latitude, 
            location.longitude
          );          setWeatherData(data);
        }catch (e) {
          setError(`Eror ${e}`)
        }
        finally {
          setLoading
        }
    }
    }
    fetchWeather();
  },[location])
  if (!location) {
    return <View><Text>No location available</Text></View>;
  }

  if (loading) {
    return <View><Text>Loading weather information...</Text></View>;
  }

  if (error) {
    return <View><Text>{error}</Text></View>;
  }



  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          title="Your Location"
          description={`Weather in ${weatherData?.name}, Temp :${weatherData?.main?.temp} °C`}
        />
      </MapView>
      <Text>{weatherData?.weather[0]?.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default WeatherMapLocation;
