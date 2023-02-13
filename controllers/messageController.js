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


    // //localhost:3600/api/messages/1
    // getMessageById = async (req, res) => {
    //     const id = req.params.id;
    //     var message = await Message.findOne({
    //         where: {
    //             id_message: id
    //         }
    //        })
    //     res.send(`one message ${id}`);
    // }
}

const messageController = new MessageController();


module.exports = messageController;