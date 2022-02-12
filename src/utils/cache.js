import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import config from '../config';

const app = initializeApp({
    credential: cert(config.serviceAccount),
});
const db = getFirestore(app);

export const getCityLatLongFromCache = async (postalCode) => {
    const citiesRef = db.collection('cities');
    const cities = await citiesRef.where('postalCode', '==', postalCode).get();
    if (!cities.empty) {
        console.debug('Firebase: Got city from cache', postalCode);
        return cities.docs[0].get('latLong');
    }
    return null;
};

export const saveCityLatLongToCache = async (postalCode, latLong) => {
    const city = {
        postalCode,
        latLong,
    };
    const citiesRef = db.collection('cities');
    const res = await citiesRef.add(city);
    console.debug('Firebase: Saved city in cache', postalCode, res.id);
    return res;
};

export const getMatrixFromCache = async (start, dest) => {
    const matrixesRef = db.collection('matrixes');
    let matrixes = await matrixesRef
        .where('start', '==', start)
        .where('dest', '==', dest)
        .get();
    if (!matrixes.empty) {
        console.debug('Firebase: Got matrix from cache', start, dest);
        return {
            duration: matrixes.docs[0].get('duration'),
            distance: matrixes.docs[0].get('distance'),
        };
    }
    matrixes = await matrixesRef
        .where('start', '==', dest)
        .where('dest', '==', start)
        .get();
    if (!matrixes.empty) {
        console.debug('Firebase: Got matrix from cache', dest, start);
        return {
            duration: matrixes.docs[0].get('duration'),
            distance: matrixes.docs[0].get('distance'),
        };
    }
    return null;
};

export const saveMatrixToCache = async (start, dest, matrix) => {
    const newMatrix = {
        start,
        dest,
        duration: matrix.duration,
        distance: matrix.distance,
    };
    const distancesRef = db.collection('matrixes');
    const res = await distancesRef.add(newMatrix);
    console.debug('Firebase: Saved matrix in cache', start, dest, res.id);
    return res;
};
