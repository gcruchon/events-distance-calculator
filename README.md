# Events Distance Calculator

Calculates distances between your city and a bunch of events

## Config

Copy `.env-sample` to `.env`.

Change the file to match the config.

-   `ORS_API_KEY`: Get an API key from [OpenRoute Service](https://openrouteservice.org/)
-   `FIREBASE_PROJECT_ID`: from the `serviceAccount.project_id` key of Firebase config file.
-   `FIREBASE_PRIVATE_KEY_ID`: from the `serviceAccount.private_key_id` key of Firebase config file.
-   `FIREBASE_PRIVATE_KEY`: from the `serviceAccount.private_key` key of Firebase config file.
-   `FIREBASE_CLIENT_EMAIL`: from the `serviceAccount.client_email` key of Firebase config file.
-   `FIREBASE_CLIENT_ID`: from the `serviceAccount.client_id` key of Firebase config file.
-   `FIREBASE_CLIENT_X509_CERT_URL`: from the `serviceAccount.client_x509_cert_url` key of Firebase config file.

Get the `serviceAccount` config JSON from [Firebase console](https://console.firebase.google.com/) (Project settings > Service accounts > Firebase admin SDK > Node.JS > Generate new private key)

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

Build image

```sh
docker build -t event-distance-calculator:latest .
```

To run the docker container, best to to create docker secrets from the config section. Each variable name should add the `_FILE` suffix.

Only for the first time, init a Swarm:

```sh
docker swarm init
```

Then, for each key in the `.env` file, create the docker corresponding secret by creating a file.

For example:

```sh
docker secret create ORS_API_KEY_FILE ORS_API_KEY.txt
rm ORS_API_KEY.txt
```

Doc: [Manage sensitive data with Docker secrets](https://docs.docker.com/engine/swarm/secrets/)

Run docker:

```sh
docker service create \
    --name edc \
    --secret ORS_API_KEY_FILE \
    --secret FIREBASE_PROJECT_ID_FILE \
    --secret FIREBASE_PRIVATE_KEY_ID_FILE \
    --secret FIREBASE_PRIVATE_KEY_FILE \
    --secret FIREBASE_CLIENT_EMAIL_FILE \
    --secret FIREBASE_CLIENT_ID_FILE \
    --secret FIREBASE_CLIENT_X509_CERT_URL_FILE \
    -p 3005:3000 \
    event-distance-calculator:latest
```

Debug "builder" container:

```sh
docker build --target builder -t event-distance-calculator-builder:latest .
docker run -it event-distance-calculator-builder:latest /bin/bash
```
