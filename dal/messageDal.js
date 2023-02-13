const { Op } = require('sequelize');

const db = require('../models/index')
const Message = db.message 

class MessageDal {

    getAllMessages = async (parameters) => {
        var messages = await Message.findAll();
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

    deleteMassage = async (id) => { 
        await Message.destroy({
            where: {
                id_message: id
            }
        });
    }

    search = async (where_) => { 
        var messages = await Message.findAll({
            where:{
                where_
            }
        })
        return messages;
    }
}

const messageDal = new MessageDal();
module.exports  = messageDal;