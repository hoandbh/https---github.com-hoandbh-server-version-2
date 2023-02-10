const db = require('../models/index')
const Message = db.message //יחיד או רבים???

class MessageController {

    createNewMessage = async (req, res) => {
        const contents = req.body;
        const message = await Message.create(contents)
        if (message)
            return res.status(201).json({ message: 'New message created' })
        else
            return res.status(400)
    }

    //localhost:3600/api/messages
    getAllMessages = async (req, res) => {
        const messages = await Message.findAll({});
        if (!messages?.length)
            return res.status(400).json({ message: 'No messages found' })

        //מורה שולחת ,מורה מקבלת, האם בוצע
        const parameters = req.query;
        if (parameters.from) {
            messages = await Message.findAll({
                where: {
                    from: parameters.from
                }
            });
        }

        if (parameters.to) {

        }

        if (parameters.isCommit) {

        }
        res.json(messages);
    }


    //localhost:3600/api/messages/:1
    getMessageById = async (req, res) => {
        const id = req.params.id;
        const message = await Message.findOne({
            where: {
                id_message: id
            }
        })
        res.json(message);
    }
}

const messageController = new MessageController();


module.exports = messageController;