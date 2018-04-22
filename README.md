# Cinema Ticket System
A web application that lets reserve and book tickets for cinema showings.

## How to start it
Use docker-compose, which should start a mongodb instance, the frontend and the backend.
```sh
docker-compose up -d
```
Frontend runs on [http://localhost:8080](http://localhost:8080), backend on [http://localhost:8081](http://localhost:8081). The ports can be customized using the environment variables in the `.env` file. Try it in multiple tabs!

## How to develop

1. Install dependencies
```sh
yarn
```

2. Start the backend in dev mode
```sh
cd backend
yarn start:dev
```

3. Start the frontend in dev mode
```sh
cd ../frontend
yarn start
```

