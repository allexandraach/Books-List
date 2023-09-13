const express = require('express');

const router = express.Router();

const { getBooks,
  searchBooks,
  sortBooks,
  filterBooks,
  viewMoreBooks,
  getBook,
  putBook,
  deleteBook } = require('../controllers/books');

const cors = require('cors');
router.use(cors());

// bring book data from db
router.get('', getBooks);

router.get('/search', searchBooks);

router.get('/sort', sortBooks);

router.get('/filter', filterBooks);

router.get('/view', viewMoreBooks);

router
  .route('/:id')
  .get(getBook)
  .put(putBook)
  .delete(deleteBook)

module.exports = router;