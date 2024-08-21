import React from 'react';
import { StyleSheet, View,Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocation } from '../context/LocationContext';

const WeatherMapLocation = ({ route }: any) => {
  const { location } = useLocation();

  if (!location) {
    return <View><Text>No location available</Text></View>;
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
          description="Weather information here"
        />
      </MapView>
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
