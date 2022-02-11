import openrouteservice from 'openrouteservice-js';
import config from '../config.js';
import { getCityLatLongFromCache, saveCityLatLongToCache } from './cache.js';

const getCityLatLongFromAPI = async postalCode => {
    const Geocode = new openrouteservice.Geocode({
        api_key: config.ORS_API_KEY,
    });
    const response = await Geocode.geocode({
        text: `${postalCode}`,
        layers: ['postalcode'],
        boundary_country: ['FR'],
    });
    console.debug('Got city from API', postalCode);
    return response.features[0].geometry.coordinates;
};

const getCityLatLong = async postalCode => {
    let cityLatLong = await getCityLatLongFromCache(postalCode);
    if (!cityLatLong) {
        cityLatLong = await getCityLatLongFromAPI(postalCode);
        await saveCityLatLongToCache(postalCode, cityLatLong);
    }
    return cityLatLong;
};

export default getCityLatLong;
