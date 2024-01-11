import { Schema, model } from "mongoose";

const transaction = new Schema({
    name: {
        type: String
    },
    des: {
        type: String
    },
    datetime: {
        type: String
    },
    price: {
        type: String
    }
});

const Transaction = model('transaction', transaction);

export default Transaction;