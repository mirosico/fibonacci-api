import {FibonacciTicket} from "./fibonacci.model";
import {Worker} from "worker_threads";
import path from "path";


export class FibonacciService {
  static calculateFibonacciNumber = async (ticketId: number): Promise<void> => {
    const fibTicket = await FibonacciTicket.findOne({ticketId});
    if (fibTicket) {
        const worker = new Worker(path.join(__dirname, 'fibonacci-worker.js'));
        worker.on('message',  async (message) => {
        fibTicket.answer = message.fib;
        await fibTicket.save();
      });
      worker.postMessage({num: fibTicket.number - 2});
    }
  }


  static createFibonacciTicket = async (n: number): Promise<number> => {
    const fibTicket = new FibonacciTicket({number: n, answer: 'Calculating...'});
    await fibTicket.save();
    return fibTicket.ticketId;
  }

  static getFibonacciAnswer = async (ticketId: number): Promise<string> => {
    const fibTicket = await FibonacciTicket.findOne({ticketId});
    if (!fibTicket) {
      throw new Error('Ticket not found');
    }
    return fibTicket.answer;
  }
}