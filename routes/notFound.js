const path = require('path')

module.exports = (req, res, next) => {
  res.status(404)
  if (req.accepts('html')) {
    const filePath = path.join(__dirname, '..', 'views', '404.html');
    res.sendFile(filePath) 
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' })
  } else {
    res.type('txt').send('404 Not Found')
  }
}