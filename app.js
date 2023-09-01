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
    .then((result) => app.listen(PORT))
    .catch((err) => console.log(err));

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

app.use(express.json());

app.get('/', (req, res) => {

    // automatically sends content-type header
    // it infers the status code

    // res.send('<p>home page <p>');

    res.sendFile('./build/index.html', { root: __dirname });
});

// books routes
app.use('/api/books', booksRoutes);

app.post('/api/add', async (req, res) => {
    const book = new Book(req.body);
    book.save()
        .then((data) => {
            res.status(201).json('Book successfully added');
        })
        .catch((err) => {
            console.log(err);
        })
})


// app.get('/add-book', (req, res) => {
//     const book = new Book({
//         title: 'Orientalism',
//         author: 'Edward W. Said',
//         genre: 'non-fiction',
//         favourite: false,
//         currentlyReading: true
//     });

//     book.save()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });

// });


// const http = require('http');
// const fs = require('fs');

// const server = http.createServer((req, res) => {
//     console.log('request made');

//     // set header content type
//     res.setHeader('Content-Type', 'text/html');

//     fs.readFile('./public/index.html', (err, data) => {
//         if (err) {
//             console.log(err);
//             res.end();
//         } else {
//             res.write(data);
//             res.end();
//         }
//     }

//     );

//     // content we want to send back to the browser
//     // res.write('<h1>Hello world</h1>');

//     // res.end();

// });

// // localhost is default value
// server.listen(3000, 'localhost', () => {
//     console.log('Listening for requests on port 3000');

// }

// )
