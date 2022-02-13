import openrouteservice from 'openrouteservice-js';
import getCityLatLong from './getCity';
import { getMatrixFromCache, saveMatrixToCache } from './cache';
import logger from './logger';
import config from '../config';

const getDistancesFromAPI = async (locations) => {
    const destinations = [];
    for (let i = 1; i < locations.length; i += 1) {
        destinations.push(i);
    }
    const Matrix = new openrouteservice.Matrix({ api_key: config.ORS_API_KEY });
    return Matrix.calculate({
        locations,
        profile: 'driving-car',
        units: 'km',
        metrics: ['distance', 'duration'],
        sources: [0],
        destinations,
    });
};

export const getDistances = async (start, destinations) => {
    const destinationsForAPI = [];
    const objDistances = {};
    let matrixesFromCache = [];
    for (let i = 0; i < destinations.length; i += 1) {
        matrixesFromCache.push(getMatrixFromCache(start, destinations[i]));
    }
    matrixesFromCache = await Promise.all(matrixesFromCache);
    for (let i = 0; i < destinations.length; i += 1) {
        const dest = destinations[i];
        objDistances[dest] = matrixesFromCache[i];
        if (!objDistances[dest]) {
            destinationsForAPI.push(dest);
        }
    }
    if (destinationsForAPI.length) {
        let locations = [getCityLatLong(start)];
        for (let i = 0; i < destinationsForAPI.length; i += 1) {
            locations.push(getCityLatLong(destinationsForAPI[i]));
        }
        locations = await Promise.all(locations);
        const fromAPI = await getDistancesFromAPI(locations);
        logger.debug('Got matrixes from API', locations);
        const durationsFromAPI = fromAPI.durations[0];
        const distancesFromAPI = fromAPI.distances[0];
        const savesToCache = [];
        for (let i = 0; i < destinationsForAPI.length; i += 1) {
            const dest = destinationsForAPI[i];
            objDistances[dest] = {
                duration: durationsFromAPI[i],
                distance: distancesFromAPI[i],
            };
            savesToCache.push(
                saveMatrixToCache(start, dest, objDistances[dest])
            );
        }
        await Promise.all(savesToCache);
    }
    return { start, destinations: objDistances };
};
