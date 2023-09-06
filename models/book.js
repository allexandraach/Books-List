const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// custom validator function
function checkDataValidity(value) {
    const regexPattern =  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]/;
    return !regexPattern.test(value);
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
        validate: {
            validator: checkDataValidity,
            message: 'Author contains unpermitted characters.'
        }
    },
    genre: {
        type: String,
        required: true,
        validate: {
            validator: checkDataValidity,
            message: 'Genre contains unpermitted characters.'
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