// handles errors and exceptions during request response
const errorHandler = (err, req, res, next) => {
  // will overwrtie default express error handler
  // if its set befroe error thrown we want that, if not we want the error to be 500(server error)
  const statusCode = res.statusCode ? res.statusCode : 500; // change codes later
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
