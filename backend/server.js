const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db'); // mongoose connection
const port = process.env.PORT;

const app = express();

connectDB(); // will connect to mongo db

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,PATCH,DELETE,OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  );
  if (req.method === 'OPTIONS') res.sendStatus(200);
  else next();
});
app.use(express.json());

app.use(express.urlencoded({ extended: false })); // middlewar for json
app.use('/books', require('./routes/libraryRoutes'));
app.listen(port, () => console.log(`Server started on ${port}`));
app.use(errorHandler); // overwrites expresses default error handler.
