import {Response, Request} from "../../types";
import {FibonacciService} from "./fibonacci.service";
import {getTicketIdFromQueryString} from "./fibonacci.helpers";

const input = async (req: Request, res: Response): Promise<void> => {
    try {
        const {number} = req.body;
        if (number === undefined) {
            res.status(400).json({success: false, error: 'Missing number property'});
            return;
        }

        const ticketId = await FibonacciService.createFibonacciTicket(number);
        setImmediate(async () => FibonacciService.calculateFibonacciNumber(ticketId));
        res.status(201).json({success: true, "ticket": ticketId});
    } catch (e) {
        res.json({success: false, error: e?.message});
    }
}

const output = async (req: Request, res: Response): Promise<void> => {
    try {
        const {ticket} = req.query;
        if (ticket === undefined) {
            res.status(400).json({success: false, error: 'Missing ticketId property'});
            return;
        }
        const ticketId = getTicketIdFromQueryString(ticket);
        const answer = await FibonacciService.getFibonacciAnswer(parseInt(ticket as string));
        res.status(200).json({success: true, "Fibonacci": answer});
    } catch (e) {
        res.json({success: false, error: e?.message});
    }
}

export default {input, output}