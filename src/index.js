import { readFileSync } from "fs";
import getDistances from "./getDistances.js"

const dataFile = "data/events-AF-2022.json";
const myPostalCode = "59110"

const events = JSON.parse(readFileSync(dataFile));
const destinations = events.map(e => e.location.postalCode);

getDistances(myPostalCode, destinations)
    .then((distances) => {
        // Add your own result handling here
        const eventWithDistance = events.map(e => {
            const matrix = distances.destinations[e.location.postalCode];
            return {...e, ...matrix};
        });
        console.log("eventWithDistance", eventWithDistance);
    })
    .catch((err) => {
        var str = "An error occurred: " + err;
        console.log(str);
    });