const express = require('express');
require('dotenv').config();

const app = express();
const mongoose = require('mongoose');

const cors = require('cors');
app.use(cors());

const path = require('path');
const PORT = process.env.PORT || 8080;
const Book = require('./models/book');
const booksRoutes = require('./routes/booksRoutes');

// connect to mongodb
const dbURI = process.env.DB_URI;
mongoose.connect(dbURI)
    .then(() => app.listen(PORT))
    .catch((err) => console.log(err));

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// books routes
app.use('/api/books', booksRoutes);

app.post('/api/add', (req, res) => {
    console.log(req.body);

    const book = new Book(req.body);
    book.save()
        .then((result) => {
            res.status(201).json({ message: 'Book successfully added' });
        })
        .catch((err) => {

            console.log(err);

            if (err.name == "MongoServerError") {
                res.status(400).json({ error: "MongoServerError" });
            } else if (err.name == "ValidationError") {
                res.status(400).json({ error: "ValidationError" });
            } else { res.status(500).json({ error: err }) }

        })

    });

app.use((req, res) => {

    res.status(404).json({ Error: "Page not found" })
})

