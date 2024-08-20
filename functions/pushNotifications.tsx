import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

export const saveNotificationPreferences = async (preferences: any) => {
  try {
    await AsyncStorage.setItem('notificationPreferences', JSON.stringify(preferences));
  } catch (e) {
    console.log('Failed to save preferences.');
  }
};

export const loadNotificationPreferences = async () => {
  try {
    const preferences = await AsyncStorage.getItem('notificationPreferences');
    return preferences ? JSON.parse(preferences) : null;
  } catch (e) {
    console.log('Failed to load preferences');
    return null;
  }
};

export const handleSavePreferences = async (isRainNotificationEnabled: boolean) => {
  const preferences = { isRainNotificationEnabled };
  await saveNotificationPreferences(preferences);
  Alert.alert('Preferences Saved',);
};
