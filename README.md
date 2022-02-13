# Events Distance Calculator

Calculates distances between your city and a bunch of events

## Config

Copy `src/config-sample.js` to `src/config.js`.

-   `ORS_API_KEY`: Get an API key from [OpenRoute Service](https://openrouteservice.org/)
-   `serviceAccount`: Get the config JSON from [Firebase console](https://console.firebase.google.com/) (Project settings > Service accounts > Firebase admin SDK > Node.JS > Generate new private key)

## Developing

Once you've created a project and installed dependencies with `npm install`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Docker

Install Docker Desktop:

```sh
brew install --cask docker
```

Connect to redhat rehistry:

```sh
docker login registry.redhat.io
```

NB: You will need to create a developer account before: <https://developers.redhat.com/>

Compaile and run
```sh
docker build -t event-distance-calculator:latest .
docker run --name edc -d -p 3005:3000 event-distance-calculator:latest
```

Debug "builder" container:

```sh
docker build --target builder -t event-distance-calculator-builder:latest .
docker run -it event-distance-calculator-builder:latest /bin/bash
```
