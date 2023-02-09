const db = require('../models/index')
const Message = db.message //יחיד או רבים???

class MessageController {

    //localhost:3600/api/messages
    getAllMessages = async (req, res) => {
        const messages = await Message.findAll({});
        if(!messages?.length)
            return res.status(400).json({ message: 'No messages found' })

        //מורה שולחת ,מורה מקבלת, האם בוצע
        const parameters = req.query;
        if(parameters.from){
            messages = await Message.findAll({
                where: {
                    from: parameters.from
                }
            });
        }

        if(parameters.to){
            
        }

        if(parameters.isCommit){
            
        }
        res.json(messages);
    }


    //localhost:3600/api/messages/1
    getMessageById = async (req, res) => {
        const id = req.params.id;
        // var message = await Message.findOne({
        //     where: {
        //      id: id
        //     }
        //    })
        res.send(`one message ${id}`);
    }
}

const messageController = new MessageController();


module.exports = messageController;