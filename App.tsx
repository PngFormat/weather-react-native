import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SixDaysForecast from './screens/SixDaysScreen';
import WeatherApp from './screens/forecastScreen';
import StartScreen from './screens/homeScreen';
import { ThemeProvider } from './context/ThemeContext';

const Stack = createStackNavigator();
export default function App() {
    return (
        <ThemeProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={StartScreen} />
                    <Stack.Screen name="Weather" component={WeatherApp} />
                    <Stack.Screen name="WeatherForecast" component={SixDaysForecast} />
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
}
