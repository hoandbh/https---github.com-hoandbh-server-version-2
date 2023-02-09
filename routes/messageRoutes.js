const express = require('express');
const messageRouter = express.Router();
const messageController = require('../controllers/messageController');

messageRouter.route('/')
.get(messageController.getAllMessages);

//localhost:3600/message/3
messageRouter.route('/:id')
.get(messageController.getMessageById);

module.exports = messageRouter;