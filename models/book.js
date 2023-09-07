const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// custom validator function
function checkDataValidity(data) {

    const regexPattern = /[^A-Za-z\s.-]/;
    return !regexPattern.test(data);

}


// Schema = constructor function
const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    author: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 70,
        validate: {
            validator: checkDataValidity,
            message: 'Author data is not valid.'
        }
    },
    genre: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        validate: {
            validator: checkDataValidity,
            message: 'Genre data is not valid.'
        }
    },
    favourite: {
        type: Boolean,
        required: true
    },
    currentlyReading: {
        type: Boolean,
        required: true
    }

}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;