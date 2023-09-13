const express = require('express');

const router = express.Router();

const { getBooks,
  searchBooks,
  sortBooks,
  filterBooks,
  viewMoreBooks,
  putBook,
  deleteBook } = require('../controllers/books');

const cors = require('cors');
router.use(cors());

const Book = require('../models/book');

// bring book data from db
router.get('', getBooks);

router.get('/search', searchBooks);

router.get('/sort', sortBooks);

router.get('/filter', filterBooks);

router.get('/view', viewMoreBooks);

router
  .route('/:id')
  .get(async (req, res) => {
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
  })
  .put(putBook)
  .delete(deleteBook)


module.exports = router;