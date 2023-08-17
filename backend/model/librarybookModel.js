// this is where we will create our model/schema for our library books
const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  id: { type: String },
  title: { type: String },
  author: { type: String },
  publisher: { type: String },
  isbn: { type: String },
  avail: { type: String }, // true or false , make bool?
  who: { type: String },
  due: { type: String },
});
module.exports = mongoose.model('Library', bookSchema);
