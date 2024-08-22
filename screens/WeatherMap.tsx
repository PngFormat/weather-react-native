import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocation } from '../context/LocationContext';
import { fetchWeatherData } from '../functions/fetchWeather';
import { LinearGradient } from 'expo-linear-gradient';

const WeatherMapLocation = () => {
  const { location } = useLocation();
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState(location);
  const mapRef = useRef<MapView>(null)

  useEffect(() => {
    if (location) {
      fetchWeatherSelectedLocation(location.latitude, location.longitude);
    }
  }, [location]);

  useEffect(() => {
    if (selectedLocation) {
      fetchWeatherSelectedLocation(selectedLocation.latitude, selectedLocation.longitude);
    }
  }, [selectedLocation]);

  const fetchWeatherSelectedLocation = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      const data = await fetchWeatherData(
        '', 
        [], 
        setWeatherData, 
        setLoading, 
        setError, 
        () => {}, 
        lat, 
        lon
      );
      setWeatherData(data);
    } catch (e) {
      setError(`Error - ${e}`);
    } finally {
      setLoading(false);
    }
  };

  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });

    if(mapRef.current) {
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,

      },1000)
    }
  };

  if (loading) {
    return <View><Text>Loading weather information...</Text></View>;
  }

  if (error) {
    return <View><Text>{error}</Text></View>;
  }

  if (!location) {
    return <View><Text>No location available</Text></View>;
  }

  return (
    <LinearGradient
      colors={['#03c2fc', '#61ffba']}
      style={styles.container}
    >
      <Text style={styles.text}>Weather</Text>

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: selectedLocation?.latitude || 0 ,
          longitude: selectedLocation?.longitude || 0,
          latitudeDelta: 100.0,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker
            coordinate={{ latitude: selectedLocation.latitude, longitude: selectedLocation.longitude }}
            title="Selected Location"
            description={`Weather in ${weatherData?.name}, Temp: ${weatherData?.main?.temp} °C`}
          />
        )}
      </MapView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    height: '100%',  
    width: '100%',   
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,  
  },
  text: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    textShadowColor: '#000000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    textAlign: 'center',
    marginBottom: 10,  
  },
  infoContainer: {
    position: 'absolute',
    bottom: 50,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 10,
  },
  infoText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
});


export default WeatherMapLocation;
