import {ParsedQs} from "qs";

export const fibonacci = (n: number): number => {
    if (n < 2) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

export const fibonacciAsync = async (n: number): Promise<number> => {
    if (n < 0) {
        throw new Error("n must be a positive number");
    }
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }
    return await fibonacciAsync(n - 1) + await fibonacciAsync(n - 2);
}

export const getTicketIdFromQueryString = (ticketId: string | string[] | ParsedQs | ParsedQs[]): number => {
    return  Array.isArray(ticketId) ? parseInt(String(ticketId[0])) : parseInt(String(ticketId));
}