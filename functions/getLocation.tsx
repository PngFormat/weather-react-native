import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';
import { getCityName } from './getCityName';
import { useLocation } from '../context/LocationContext';

interface ILocationProps { 
    onLocationFetched: (location: { latitude: number; longitude: number }, city: string) => void;
  
}

const LocationComponent: React.FC<ILocationProps> = ({ onLocationFetched }) => {
  const { location, setLocation } = useLocation();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [city, setCity] = useState<string>('Fetching city...');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        let currentLocation = await Location.getCurrentPositionAsync();
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });

        if (currentLocation) {
          const cityName = await getCityName(currentLocation.coords.latitude, currentLocation.coords.longitude);

          if (cityName) {
            setCity(cityName);
            onLocationFetched(
                { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude }, 
                cityName
              );         
             } else {
            setCity('City not found');
          }
        }
      } catch (error) {
        console.error('Error fetching location or city:', error);
        setErrorMsg('Error fetching location or city');
      }
    })();
  }, [setLocation, onLocationFetched]);

  return ( 
    <View>
      {errorMsg && <Text>{errorMsg}</Text>}
      {location ? (
        <Text>Lat: {location.latitude}, Lon: {location.longitude}</Text>
      ) : (
        <Text>Fetching Location...</Text>
      )}
      <Text>City: {city}</Text>
    </View>
  );
}

export default LocationComponent;
