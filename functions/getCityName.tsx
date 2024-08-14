import axios from 'axios';

const API_KEY_OPENCAGE = '7641762b14a642da84ffc407bcc93a2f'; 

export const getCityName = async (latitude:number,longitude:number) => {
    try{
        const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${47.9363}+${33.0615}&key=${API_KEY_OPENCAGE}`
        )
        if( response.data && response.data.results.length > 0  ){
            const city = response.data.results[0].components.city || response.data.results[0].components.town || response.data.results[0].components.village;
            return city || 'Unknown city'
        }
    }
    catch(e) {
        console.error('Error fetching city ',e)
        return 'Unknown location';
    } 

}