import express from 'express';
const app = express();
import {} from 'dotenv/config'
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    return res.status(200).send('Hello world');
})

app.use('/books', booksRoute);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Server connected to Database');
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })