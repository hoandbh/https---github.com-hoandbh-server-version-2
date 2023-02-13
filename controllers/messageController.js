const messageDal = require("../dal/messageDal");

class MessageController {

    getAllMessages = async (req, res) => {//איך עושים חיפוש???
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

    getMessageById = async (req, res) => {
        const id = req.params.id;
        var message = await messageDal.getMessageById(id);
        if(message)
            res.json(message);
        else
            res.status(204).send();
    }

    deleteMessage = async (req, res) => { 
        const id = req.params.id;
        if (!id) {//id can't be null??
            return res.status(400).json({ message: 'question ID required' });
        }
        await messageDal.deleteMassage(id);//if not exist???
        res.json(`Message ID ${id} deleted`);
    }
}

const messageController = new MessageController();


module.exports = messageController;