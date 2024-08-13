import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SixDaysForecast from './SixDaysScreen';
import WeatherApp from './forecastScreen';
import StartScreen from './homeScreen';
import { ThemeProvider } from './ThemeContext';

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
