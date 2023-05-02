//V
const { Op } = require('sequelize');
const { message: Message } = require('../models');

const where = (id) => ({
  where: {
    id: id
  }  
  });

class MessageDal {

  getAllMessages = async () => {
    var messages = await Message.findAll();
    return messages;
  }

  createNewMessage = async (content) => {
    const message = await Message.create(content);
    return message;
  }

  getMessageById = async (id) => {
    // var message = await Message.findOne(where(id));
    var message = await Message.findByPk(id);
    return message;
  }

  deleteMessage = async (id) => { 
    await Message.destroy(where(id));
  }
  

  search = async (where) => { 
    const messages = await Message.findAll({
      where:{
        [Op.and]:where
      }
    });
    return messages;
  }

}

const messageDal = new MessageDal();
module.exports  = messageDal;