const express = require('express');

const app = express();
const mongoose = require('mongoose');
const path = require('path');
const PORT = process.env.PORT || 8080;
const Book = require('./models/book');

// connect to mongodb
const dbURI = 'mongodb+srv://achimov-alexandra:kayaPapaya@cluster0.jynieiw.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen(PORT))
    .catch((err) => console.log(err));

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// register view engine; default: looks in views folder
// app.set('view engine', 'ejs');

app.get('/', (req, res) => {

    // automatically sends content-type header
    // it infers the status code

    // res.send('<p>home page <p>');

    res.sendFile('./build/index.html', { root: __dirname });
});


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
