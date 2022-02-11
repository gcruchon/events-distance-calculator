# Events Distance Calculator

Calculates distances between your city and a bunch of events

## Config

Copy `src/config-sample.js` to `src/config.js`.

- `ORS_API_KEY`: Get an API key from [OpenRoute Service](https://openrouteservice.org/)
- `serviceAccount`: Get the config JSON from [Firebase console](https://console.firebase.google.com/) (Project settings > Service accounts > Firebase admin SDK > Node.JS > Generate new private key)

## API Call

```sh
curl -d '{"start":"59110"}' -H "Content-Type: application/json" -X POST http://localhost:3001/api/distances
```
