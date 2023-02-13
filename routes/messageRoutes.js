const express = require('express');
const messageRouter = express.Router();
const messageController = require('../controllers/messageController');

messageRouter.route('/')
.get(messageController.getAllMessages)
.post(messageController.createNewMessage);

//localhost:3600/message/3
messageRouter.route('/:id')
.get(messageController.getMessageById)
// .delete(messageController.deleteMessage)

module.exports = messageRouter;