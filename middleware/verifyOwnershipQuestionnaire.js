const jwt = require('jsonwebtoken');
const questionnaireController = require('../controllers/questionnaireController');

const verifyOwnership = async (req, res, next) => {
  const userId = req.user.id;

  const ownerId = await questionnaireController.getOwnerId(req, res, next);

  if (!ownerId) {
    return res.status(404).json({ message: 'Resource not found' });
  }

  if (ownerId !== userId) {
    return res.status(403).json({ message: 'Forbidden - You can only access your own resources' });
  }

  next();
};

module.exports = verifyOwnership;
