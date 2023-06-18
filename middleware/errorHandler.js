const errorHandler = (err, req, res, next) => {
  // console.error('err'); // Log the error
  // console.error(err); // Log the error
  // console.error('err'); // Log the error

  // res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
  throw new Error(err);


}

module.exports = errorHandler;