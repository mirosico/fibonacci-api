import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
const { Schema } = mongoose;

const fibTicketSchema = new Schema({
    ticketId: {
        type: Number,
        unique: true,
    },
    number: Number,
    answer: String,
});

autoIncrement.initialize(mongoose.connection);
fibTicketSchema.plugin(autoIncrement.plugin, {
    model: "FibonacciTicket",
    field: "ticketId",
    startAt: 1,
});

export const FibonacciTicket = mongoose.model("FibonacciTicket", fibTicketSchema);