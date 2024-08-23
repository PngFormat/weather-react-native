import axios from 'axios';

const cities = [
    { name: 'Kryvyi Rih', latitude: 47.9363, longitude: 33.0615 },
    { name: 'Kyiv', latitude: 50.4501, longitude: 30.5234 },
    { name: 'Lviv', latitude: 49.8397, longitude: 24.0297 },
];

export const getCityName = (latitude: number, longitude: number): string => {
    const threshold = 0.01; 
    for (const city of cities) {
        const latDiff = Math.abs(city.latitude - latitude);
        const lonDiff = Math.abs(city.longitude - longitude);

        if (latDiff <= threshold && lonDiff <= threshold) {
            return city.name;
        }
    }
    return '';
};