const errorHandler = (err, req, res, next) => {

  console.error('error!');
  console.error(err);
  console.error('error!');
  res.status(500).json({ error: 'Internal Server Error' });

}

module.exports = errorHandler;