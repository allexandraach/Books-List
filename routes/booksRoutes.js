const express = require('express');

const router = express.Router();

const Book = require('../models/book');

// bring book data from db
router.get('', async (req, res) => {
  try {
    const books = await Book.find(); // Fetch all books from the database
    res.status(200).json(books);

  } catch (error) {
    console.error('Error fetching books', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// sort books
router.get(`/sort`, async (req, res) => {

  const category = req.query.sort;

  try {
    const book = await Book.find().sort({ [category]: 1 });
    res.status(200).json(book);

  } catch (error) {
    console.error('Error sorting books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// filter books
router.get('/filter', async (req, res) => {

  const category = req.query;

  try {
    const book = await Book.find(category);
    res.status(200).json(book);

  } catch (error) {
    console.error('Error filtering books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/:id', async (req, res) => {
  const bookId = req.params.id;
  try {

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    // If the book is found, return it as a JSON response
    res.json(book);
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Book.findByIdAndDelete(id)
    .then((res) => res.status(200).json({ message: 'Book deleted' }))
    .catch(err => console.log(err));
})


router.put('/:id', (req, res) => {
  const id = req.params.id;
  Book.findByIdAndUpdate(id)
    .then((res) => res.status(200).json({ message: 'Book data updated' }))
    .catch(err => console.log(err));

})


module.exports = router;