import express from 'express';
const app = express();
import {} from 'dotenv/config'
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js'

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).send('Hello world');
})

// Route to Save a new book 
app.post('/books', async (req,res) => {
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return response.status(400).json({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);

    } catch(error) {
        console.log(error.message);
        response.status(500).json({ message : error.message })
    }
})

//Route for Get All books from database
app.get('/books', async (req,res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            books
        });
    } catch(error) {
        console.log(error.message);
        response.status(500).json({ message : error.message })
    }
})

// Route for Get one book from database by Id
app.get('/books/:id', async (req,res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        return res.status(200).json(book);
    } catch(error) {
        console.log(error.message);
        response.status(500).json({ message : error.message })
    }
})

// Route to Update a book
app.put('/books/:id', async (req,res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return response.status(400).json({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result) {
            return res.status(404).json({ message: 'Book not found'})
        }

        return res.status(200).send({ message : 'Book updated successfully'});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message})
    }
})

// Route to Delete a book
app.delete('/books/:id', async(req,res) => {
    try {
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(400).json({message : 'Book not found'})
        }

        return res.status(200).send({message : 'Book deleted successfully'})

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message})
    }
})

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