const express = require('express');
const router = express.Router();
// add other gets
const {
  getBooks,
  getBookById,
  postBook,
  updateBook,
  deleteBook,
} = require('../controllers/librarycontroller'); // for getBooks route from controller file

router.route('/').get(getBooks).post(postBook); //cleaner way. works if they have the same routes , implement later
router.route('/:id').delete(deleteBook).put(updateBook).get(getBookById);

module.exports = router;
