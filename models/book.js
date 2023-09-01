const mongoose = require('mongoose');
const { generatePath } = require('react-router-dom');
const Schema = mongoose.Schema;

// Schema = constructor function

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    favourite: {
        type: Boolean,
        required: true
    },
    currentlyReading: {
        type: Boolean,
        required: true
    }

}, {timestamps: true});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;