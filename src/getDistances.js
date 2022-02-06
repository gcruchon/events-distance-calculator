import { readFileSync, writeFileSync, existsSync } from "fs"
import openrouteservice from "openrouteservice-js"
import getCityLatLong from "./getCity.js"
import config from "./config.js";

const CACHE_FILE = "./cache/distances.json";

const getKey = (start, end) => `${start} > ${end}`;

const getDistanceFromCache = (start, dest) => {
    if (existsSync(CACHE_FILE)) {
        let cache = JSON.parse(readFileSync(CACHE_FILE));
        if (cache[getKey(start, dest)]) {
            console.debug("Got distance from cache", getKey(start, dest));
            return cache[getKey(start, dest)];
        } else if (cache[getKey(dest, start)]) {
            console.debug("Got distance from cache", getKey(dest, start));
            return cache[getKey(dest, start)];
        } else {
            return null;
        }
    } else {
        return null;
    }
}

const saveDistanceToCache = (start, dest, distance) => {
    let cache = JSON.parse(readFileSync(CACHE_FILE));
    cache[getKey(start, dest)] = distance;
    writeFileSync(CACHE_FILE, JSON.stringify(cache));
    console.debug("Saved distance in cache", getKey(start, dest));
}


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
    const objDistances = destinations.reduce((acc, dest) => {
        let distance = {}
        distance[dest] = getDistanceFromCache(start, dest);
        if (!distance[dest]) {
            destinationsForAPI.push(dest)
        }
        return { ...acc, ...distance }
    }, {});
    console.debug("distances from cache", objDistances);
    console.debug("destinationsForAPI", destinationsForAPI);

    if (destinationsForAPI.length) {
        let locations = [await getCityLatLong(start)];
        for (let i = 0; i < destinationsForAPI.length; i++) {
            locations.push(await getCityLatLong(destinationsForAPI[i]))
        }
        console.debug("locations", locations);
        const fromAPI = await getDistancesFromAPI(locations);
        console.debug("fromAPI", JSON.stringify(fromAPI));
        const durationsFromAPI = fromAPI.durations[0];
        const distancesFromAPI = fromAPI.distances[0];
        destinationsForAPI.forEach((dest, index) => {
            objDistances[dest] = {
                duration: durationsFromAPI[index],
                distance: distancesFromAPI[index],
            }
            saveDistanceToCache(start, dest, objDistances[dest])
        });
    }
    return { start, destinations: objDistances };
}

export default getDistances;