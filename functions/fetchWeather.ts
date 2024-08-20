import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY_WEATHER = 'cbf8b8330b7cb5b3f1e535563cba25bc';

export const fetchWeatherData = async (
  city: string,
  searchHistory: string[] = [],
  setWeatherData: (data: any) => void,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  setSearchHistory: (history: string[]) => void
) => {
  if (!city.trim()) {
    setError('Please enter a city');
    setLoading(false);
    return null;
  }

  try {
    setLoading(true);
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_WEATHER}&units=metric`
    );
    const weatherData = response.data;
    setWeatherData(weatherData);

    const updatedHistory = [city, ...searchHistory.filter((item) => item !== city)];
    setSearchHistory(updatedHistory);
    await AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

    setError(null);

    setTimeout(() => {
      setWeatherData(null);
    }, 10000);

    return weatherData;
  } catch (e: any) {
    if (e.response && e.response.status === 404) {
      setError('City not found. Please check the city name and try again.');
    } else {
      setError('Failed to fetch weather data. Please try again later.');
    }
    return null;
  } finally {
    setLoading(false);
  }
};
