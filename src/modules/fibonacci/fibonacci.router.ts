import express from 'express';
import FibonacciController from './fibonacci.controller';


export const fibonacciRouter = express.Router();

fibonacciRouter.post('/input', FibonacciController.input);

fibonacciRouter.get('/output', FibonacciController.output);