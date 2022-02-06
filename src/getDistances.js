import { readFileSync, writeFileSync, existsSync } from "fs"
import openrouteservice from "openrouteservice-js"
import getCityLatLong from "./getCity.js"
import { getMatrixFromCache, saveMatrixToCache } from "./cache.js"
import config from "./config.js";

const CACHE_FILE = "./cache/distances.json";

const getDistancesFromAPI = async (locations) => {
    let destinations = [];
    for (let i = 1; i < locations.length; i++) {
        destinations.push(i);
    }
    const Matrix = new openrouteservice.Matrix({ api_key: config.ORS_API_KEY });
    return await Matrix.calculate({
        locations,
        profile: "driving-car",
        units: "km",
        metrics: ["distance", "duration"],
        sources: [0],
        destinations
    });
}


const getDistances = async (start, destinations) => {
    let destinationsForAPI = [];
    let objDistances = {};
    for (let i = 0; i < destinations.length; i++) {
        const dest = destinations[i];
        objDistances[dest] = await getMatrixFromCache(start, dest);
        if (!objDistances[dest]) {
            destinationsForAPI.push(dest)
        }
    }
    if (destinationsForAPI.length) {
        let locations = [await getCityLatLong(start)];
        for (let i = 0; i < destinationsForAPI.length; i++) {
            locations.push(await getCityLatLong(destinationsForAPI[i]))
        }
        const fromAPI = await getDistancesFromAPI(locations);
        console.debug("Got matrixes from API", locations);
        const durationsFromAPI = fromAPI.durations[0];
        const distancesFromAPI = fromAPI.distances[0];
        for (let i = 0; i < destinationsForAPI.length; i++) {
            const dest = destinationsForAPI[i];
            objDistances[dest] = {
                duration: durationsFromAPI[i],
                distance: distancesFromAPI[i],
            }
            const res = await saveMatrixToCache(start, dest, objDistances[dest])
        }
    }
    return { start, destinations: objDistances };
}

export default getDistances;