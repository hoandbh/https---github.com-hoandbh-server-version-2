const db = require('../models/index')
const Message = db.message 

class MessageDal {

    getAllMessages = async (parameters) => {
        var messages = await Message.findAll();
        //מורה שולחת ,מורה מקבלת, האם בוצע      
        // if(parameters.from){
        //     messages = await messages.findAll({
        //         where: {
        //             from: parameters.from
        //         }
        //     });
        // }

        // if(parameters.to){
            
        // }

        // if(parameters.isCommit){
            
        // }

        return messages;
    }

    createNewMessages = async (content) => {
        const message = await Message.create(content);
        return message;
    }

    getMessageById = async (id) => {
        var message = await Message.findOne({
            where: {
                id_message: id
            }
           })
        return message;
    }

}

const messageDal = new MessageDal();
module.exports  = messageDal;