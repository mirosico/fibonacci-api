# fibonacci-api

This is simple fibonacci API

# Instalitaion 

You will need Docker installed on your laptop

### Build & Run the Server

```bash
docker-compose up --build
```


### Run load tests

The app should be active when will you run tests

```bash
docker pull grafana/k6
docker run --rm -i grafana/k6 run - <./src/tests/load-test.ts
```


### Development

```bash
npm install
npm run dev
```

### Run tests

```bash
npm run test
```
