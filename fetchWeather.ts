import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY_WEATHER = 'cbf8b8330b7cb5b3f1e535563cba25bc';

export const fetchWeatherData = async (city: string, searchHistory: string[], setWeatherData: any, setLoading: (loading: boolean) => void, setError: (error: string | null) => void, setSearchHistory: (history: string[]) => void) => {
  if (city === '') {
    setError('Please enter a city');
    setLoading(false);
    return;
  }

  try {
    setLoading(true);
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_WEATHER}&units=metric`);
    setWeatherData(response.data);
    const updatedHistory = [city, ...searchHistory.filter(item => item !== city)];
    setSearchHistory(updatedHistory);
    await AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    setError(null);
    setTimeout(() => {
      setWeatherData(null);
    }, 10000); 
  } catch (e: any) {
    setError(e.message);
  } finally {
    setLoading(false);
  }
};
