import { readFileSync } from 'fs';
import getDistances from './utils/getDistances.js';

const distances = async start => {
    const dataFile = 'data/events-AF-2022.json';

    const events = JSON.parse(readFileSync(dataFile));
    const destinations = events.map(e => e.location.postalCode);

    const values = await getDistances(start, destinations);
    const eventWithDistance = events.map(e => {
        const matrix = values.destinations[e.location.postalCode];
        return { ...e, ...matrix };
    });
    return eventWithDistance;
};
export default distances;
