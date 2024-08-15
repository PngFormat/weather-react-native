import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const StartScreen: React.FC<{ navigation: any,route:any }> = ({ navigation,route }) => {
  return (

    <LinearGradient
    colors={['#0b5fa5', '#00ad6b']}
    style={styles.container}
>
      <Text style={styles.title}>Welcome to the Weather App</Text>
      <Button
        title="Get Started"
        onPress={() => navigation.navigate('Weather')}
      />
    </LinearGradient>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
