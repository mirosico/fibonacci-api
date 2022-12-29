import express from 'express';
import { fibonacciRouter } from './modules/fibonacci';
import mongoose from "mongoose";
import {mongodbConnection} from "./db";
import {Worker} from "worker_threads";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/', fibonacciRouter);


const PORT = process.env.PORT || 3001;

mongoose.connect(mongodbConnection).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.log(err);
});