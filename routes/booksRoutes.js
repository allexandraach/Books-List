const express = require('express');

const router = express.Router();

const Book = require('../models/book');

// bring book data from db
router.get('', async (req, res) => {
    try {
        const books = await Book.find(); // Fetch all books from the database
        res.json(books);
    } catch (error) {
        console.error('Error fetching books', error);
        res.status(500).json({ error: 'Failed to fetch books' });
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
        .then((result) => res.status(200).json('Resource deleted')) 
        .catch (err => console.log(err));
})

module.exports = router;