const messageDal = require("../dal/messageDal");

class MessageController {

    //localhost:3600/api/messages
    getAllMessages = async (req, res) => {
        const parameters = req.query;
        const messages = await messageDal.getAllMessages(parameters);
        if(!messages?.length)
            return res.status(400).json({ message: 'No messages found' })
        res.json(messages);
    }

    createNewMessage = async (req, res) => {
        const content = req.body;
        const message = messageDal.createNewMessages(content);
        if (message)
            return res.status(201).json({ message: 'New message created' });
        return res.status(400);
    }

    // //localhost:3600/api/messages/1
    getMessageById = async (req, res) => {
        const id = req.params.id;
        var message = await messageDal.getMessageById(id);
        if(message)
            res.json(message);
        res.status(204).json({ message: `Message ID ${id} not found` });
    }
}

const messageController = new MessageController();


module.exports = messageController;