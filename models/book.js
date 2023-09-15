const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// custom validator function
function checkDataValidity(data) {

    const regexPattern = /^[A-Za-z.-]+$/;
    return regexPattern.test(data);

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

// added the index directly in the db because otherwise it doesn't work
// bookSchema.index({ title: 'text', author: 'text', genre: 'text' });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;