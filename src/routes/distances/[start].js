import { readFileSync } from 'fs';
import { getDistances } from '../../utils/getDistances';
import { isValidPostalCode } from '../../utils/postalCode';

export const get = async ({ params }) => {
    const { start } = params;

    if (isValidPostalCode(start)) {
        const dataFile = 'data/events-AF-2022.json';

        const eventsWithoutMatrix = JSON.parse(readFileSync(dataFile));

        const destinations = eventsWithoutMatrix.map(
            (e) => e.location.postalCode
        );

        const values = await getDistances(start, destinations);
        const events = eventsWithoutMatrix.map((eventWithoutMatrix) => {
            const matrix =
                values.destinations[eventWithoutMatrix.location.postalCode];
            return { ...eventWithoutMatrix, ...matrix };
        });
        return {
            body: {
                start,
                events,
            },
        };
    }
    return {
        status: {
            status: 401,
        },
        body: {
            error: `start is not a valid postal code: "${start}"`,
        },
    };
};
