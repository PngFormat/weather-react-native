
import React, { useEffect, useCallback } from 'react';
import * as Notifications from 'expo-notifications';

type WeatherAlertsProps = {
  weatherData: any;
};

const WeatherAlerts: React.FC<WeatherAlertsProps> = ({ weatherData }) => {
    console.log(weatherData.weather[0].main)
    const checkWeatherForAlerts = useCallback(async () => {
        if (weatherData) {
          console.log('Weather data available:', weatherData);
          if (weatherData.weather[0].main === 'Clear') {
            console.log('Triggering notification...');
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Weather Alert',
                    body: `The weather is ${weatherData.weather[0].description} in ${weatherData.name}.`,
                    sound: 'default', 
                    priority: Notifications.AndroidNotificationPriority.HIGH,
                  },
              trigger: { seconds: 1 },
            });
          }
        }
      }, [weatherData]);
      

  useEffect(() => {
    if (weatherData) {
      checkWeatherForAlerts();
    }
  }, [weatherData, checkWeatherForAlerts]);

  return null;
};

export default WeatherAlerts;
