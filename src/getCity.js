import { readFileSync, writeFileSync, existsSync } from "fs"
import openrouteservice from "openrouteservice-js"
import config from "./config.js";

const CACHE_FILE = "./cache/cities.json";

const getCityLatLongFromAPI = async postalCode => {
    const Geocode = new openrouteservice.Geocode({ api_key: config.ORS_API_KEY });
    const response = await Geocode.geocode({
        text: `${postalCode}`,
        layers: ["postalcode"],
        boundary_country: ["FR"]
    });
    console.debug("Got city from API", postalCode);
    return response.features[0].geometry.coordinates;
}

const getCityLatLongFromCache = postalCode => {
    if (existsSync(CACHE_FILE)) {
        let cache = JSON.parse(readFileSync(CACHE_FILE));
        if (cache[postalCode]) {
            console.debug("Got city from cache", postalCode);
            return cache[postalCode];
        } else {
            return null;
        }
    } else {
        return null;
    }
}

const saveCityLatLongToCache = (postalCode, latLong) => {
    let cache = JSON.parse(readFileSync(CACHE_FILE));
    cache[postalCode] = latLong;
    writeFileSync(CACHE_FILE, JSON.stringify(cache));
    console.debug("Saved city in cache", postalCode);
}


const getCityLatLong = async postalCode => {
    let cityLatLong = getCityLatLongFromCache(postalCode);
    if (!cityLatLong) {
        cityLatLong = await getCityLatLongFromAPI(postalCode);
        saveCityLatLongToCache(postalCode, cityLatLong);
    }
    return cityLatLong;
}

export default getCityLatLong;