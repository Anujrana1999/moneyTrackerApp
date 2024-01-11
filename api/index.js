import express, { json } from 'express';
import mongoose from 'mongoose';
import Transaction from './models/Transaction.js';
import cors from 'cors'

// database initialization
const connectToMongo = async () => {
    await mongoose.connect('mongodb://localhost:27017/moneyTracker')
        .then(() => console.log('Database is connected'))
};
connectToMongo();

// middleware
const app = express();
app.use(cors()) 
app.use(express.json())

// gateways
app.get('/', (req, res) => {
    res.send('server is ok')
})

app.post('/api/transaction', async (req, res) => {
    const { name, des, datetime, price } = await req.body;

    Transaction.create({
        name,
        des,
        datetime,
        price
    })

    res.status(201).json('record saved successfully')
})
app.get('/api/transaction', async (req, res) => {
    const transaction = await Transaction.find({});

    res.status(200).json(transaction)
})

// server initialization
app.listen(4000, () => console.log(`Server is connected at ${4000}`))