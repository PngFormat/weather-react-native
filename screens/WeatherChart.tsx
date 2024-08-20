import React from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const WeatherChart:React.FC<{ hourlyData: any[] }> = ({hourlyData}) => {
    const temperatures = hourlyData.map(item => item.main.temp);
    const labels = hourlyData.map(item => new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Temperature Variation</Text>
            <LineChart
            
                data={{
                    labels: labels,
                    datasets: [
                        {
                            data: temperatures
                        }
                    ]
                }}
                width={Dimensions.get('window').width - 32}
                height={220}
                yAxisSuffix="°C"
                chartConfig={{
                    backgroundColor: '#0b5fa5',
                    backgroundGradientFrom: '#0b5fa5',
                    backgroundGradientTo: '#00ad6b',
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
              
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 16,
    },
    title: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 16,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
});

export default WeatherChart;