import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import { getCityName } from './getCityName';


interface ILocationProps { 
    onLocationFetched: (city: string) => void;
}

const LocationComponent: React.FC<ILocationProps> = ({ onLocationFetched }) => {
    const [location, setLocation] = useState<Location.LocationObject  | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [city, setCity] = useState<string>('Fetching city...');

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }

          let location = await Location.getCurrentPositionAsync();
          setLocation(location);
          
          if(location) {
            const cityName = await getCityName(location.coords.latitude,location.coords.longitude)
            setCity(cityName)
            onLocationFetched(cityName);
          }
         
        })();
      }, []);

    let text = 'Waiting...'
    if (errorMsg) {
        text = errorMsg;
    } else if(location)  {
        text = `Latitute : ${location?.coords.latitude} , Longtitude : ${location?.coords.longitude}`
    }
    return ( 
        <View>
            {errorMsg ? <Text>
                {errorMsg}
            </Text> : null}
            {location ? (
                <Text>
                Lat: {location.coords.latitude}, Lon: {location.coords.longitude}
                </Text>
            ) : (
            <Text>Fetching Location...</Text>
      )}
        </View>
    );
}

export default LocationComponent;