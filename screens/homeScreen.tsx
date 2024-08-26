import React, { useEffect, useState } from 'react';
import { Alert, View, Text, Button, StyleSheet, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Notifications from 'expo-notifications';
import registerNNPushToken from 'native-notify';

import { loadNotificationPreferences, handleSavePreferences } from '../functions/pushNotifications';

const StartScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [isRainNotificationEnabled, setIsRainNotificationEnabled] = useState<boolean>(false);
  registerNNPushToken(23217, 'WDRGqdzHrwwNMjhbAYPxLy');


  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          Alert.alert('No access', 'You need to enable permissions to receive notifications');
        }
      }
    };

    getPermissions();

    const loadPreferences = async () => {
      const preferences = await loadNotificationPreferences();
      if (preferences) {
        setIsRainNotificationEnabled(preferences.isRainNotificationEnabled);
      }
    };

    loadPreferences();
  }, []);

  const handleSavePreferencesClick = async () => {
    await handleSavePreferences(isRainNotificationEnabled);
  };

  return (
    <LinearGradient colors={['#0b5fa5', '#00ad6b']} style={styles.container}>
      <Text style={styles.title}>Welcome to the Weather App</Text>

      <View style={styles.preferenceContainer}>
        <Text style={styles.preferenceText}>Enable Rain Notifications</Text>
        <Switch
          value={isRainNotificationEnabled}
          onValueChange={(value) => setIsRainNotificationEnabled(value)}
        />
      </View>

      <Button title="Save Preferences" onPress={handleSavePreferencesClick} />
      <Button title="Get Started" onPress={() => navigation.navigate('Weather')} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
  },
  preferenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  preferenceText: {
    fontSize: 16,
    color: '#fff',
    marginRight: 10,
  },
});

export default StartScreen;
