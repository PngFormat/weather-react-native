import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const StartScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Weather App</Text>
      <Button
        title="Get Started"
        onPress={() => navigation.navigate('Weather')}
      />
    </View>
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
