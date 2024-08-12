export const getWeatherImage = (description: string) =>{
    switch (description.toLowerCase()) {
        case 'clear sky':
            return 'https://media.istockphoto.com/id/1430537932/photo/blue-sky-with-white-clouds.webp?b=1&s=170667a&w=0&k=20&c=h9jXcgHg0keOp2OnI-hkJhsAEAEewKNediKrg-s97a8=';
        case 'few clouds':
            return 'https://www.vishopper.com/images/products/300x300/SK/15233_bright-sky-with-few-clouds.jpg';
        case 'scattered clouds':
            return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Q3KLzcPNM93f69ufKa6EKEULt17CCtf_CQ&s';
        case 'rain':
            return 'https://media.istockphoto.com/id/1257951336/photo/transparent-umbrella-under-rain-against-water-drops-splash-background-rainy-weather-concept.jpg?s=612x612&w=0&k=20&c=lNvbIw1wReb-owe7_rMgW8lZz1zElqs5BOY1AZhyRXs=';
        case 'snow':
            return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0HlI6KGJed3SRLpbz7wE2c2hQtbZc-_g_QQ&s';
        default:
            return 'https://cdn-icons-png.flaticon.com/512/8655/8655461.png';
    }
}
