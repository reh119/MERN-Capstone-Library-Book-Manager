// using async because when using mongoose to interact with db we will be getting back a promise
const asyncHandler = require('express-async-handler'); // will handle async
const Library = require('../model/librarybookModel'); // willl have bunch of mongoose methods that we use to create in db .
// desc: returns a list of all books (title & id) regardless of checkout status (i.e. both available and checked-out books should be included)
//route: GET /books
const getBooks = asyncHandler(async (req, res) => {
  if (req.query.avail == undefined) {
    const books = await Library.find(); // find all of them (mongoose)
    res.json(books);
  } else {
    console.log(req.query.avail);
    const booksl = await Library.find({ avail: req.query.avail });
    res.status(200).json(booksl);
  }
});
//desc: returns all details for the book matching id, 404 if not found
//route: GET /books/:id
const getBookById = asyncHandler(async (req, res) => {
  // first we want to check if ID exists (search in data base)
  const book = await Library.findOne({ id: req.params.id });
  // if ID does not exist, throw error  (not found in DB)
  if (!book) {
    res.status(404); // not found
    throw new Error('Book not found');
  }
  res.status(200).json(book); // respond with updated book
});
// desc: adds a book to our library
//route: POST /books
const postBook = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error('Please dont forget to add book data you want to add');
  }
  const newBook = await Library.create({
    id: req.body.id,
    title: req.body.title,
    author: req.body.author,
    publisher: req.body.publisher,
    isbn: req.body.isbn,
    avail: req.body.avail,
    who: req.body.who,
    due: req.body.due,
  });
  res.status(201).json(newBook);
});
// desc: for matching id, update book properties present in request body (json)
//route: PUT /books/:id
const updateBook = asyncHandler(async (req, res) => {
  const book = await Library.findOne({ id: req.params.id });
  if (!book) {
    res.status(404); // not found
    throw new Error('Book not found');
  }
  const updatedBook = await Library.findOneAndUpdate(
    { id: req.params.id },
    req.body,
    {
      new: true, // parameters
    }
  );
  res.status(200).json(updatedBook); // respond with updated book
});
// desc: for matching id, delete book
//route: DELETE /books/:id
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Library.findOne({ id: req.params.id }); // find id we want to delete
  if (!book) {
    res.status(204); // not found
    throw new Error('No content');
  }
  await book.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getBooks,
  getBookById,
  postBook,
  updateBook,
  deleteBook,
};
