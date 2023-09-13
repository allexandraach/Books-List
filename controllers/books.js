
const Book = require('../models/book');

const getBooks = async (req, res) => {

    try {
        const books = await Book.find().limit(10);
        res.json(books);

    } catch (error) {
        console.error('Error fetching books', error);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
}

const searchBooks = async (req, res) => {

    const query = req.query.q;
    console.log(query);

    try {

        const results = await Book.find({
            $text: { $search: query }
        });

        console.log(results);
        res.json(results);

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Server Error' });

    }

}

const sortBooks = async (req, res) => {

    const category = req.query.sort;

    try {
        const book = await Book.find().sort({ [category]: 1 });
        res.json(book);

    } catch (error) {
        console.error('Error sorting books:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const filterBooks = async (req, res) => {

    const category = req.query.filter;

    try {
        const book = await Book.find({ [category]: true });
        res.json(book);

    } catch (error) {
        console.error('Error filtering books:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const viewMoreBooks = async (req, res) => {

    const pageNumber = req.query.page;
    console.log(pageNumber);

    try {
        const books = await Book.find().skip((pageNumber - 1) * 10).limit(10);
        res.json(books);

    } catch (error) {
        console.error('Error displaying the next 10 books', error);
        res.status(500).json({ error: 'Failed to display the next 10 books' });
    }

}

const getBook = async (req, res) => {

    const bookId = req.params.id;

    try {
        const book = await Book.findById(bookId).select("_id title author genre favourite currentlyReading");

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        // If the book is found, return it as a JSON response
        res.json(book);

    } catch (error) {
        console.error('Error fetching book by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const putBook = (req, res) => {

    const bookId = req.params.id;
    const updatedBook = req.body;
    console.log(updatedBook);

    Book.findByIdAndUpdate(bookId, updatedBook)
        .then((result) => res.json({ message: 'Book data updated' }))
        .catch(err => console.log(err));
}

const deleteBook = (req, res) => {

    const bookId = req.params.id;

    Book.findByIdAndDelete(bookId)
        .then((result) => res.json({ message: 'Book deleted' }))
        .catch(err => console.log(err));
}


module.exports = {
    getBooks,
    searchBooks,
    sortBooks,
    filterBooks,
    viewMoreBooks,
    getBook,
    putBook,
    deleteBook
};