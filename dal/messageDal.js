const db = require('../models/index')
const Message = db.message 

class MessageDal {

    getAllMessages = async (parameters) => {
        var messages = await Message.findAll({
            where:
            {
                (parameters.from)? from :parameters.from，
               FirstName:["John","Jane"],
               Age:{
                 gt:18
               }
        });
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
        console.log(`hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh${typeof(messages)}${messages}`);
        return messages;
    }

    createNewMessages = async (content) => {
        const message = await Message.create(content);
        return message;
    }
}

const messageDal = new MessageDal();
module.exports  = messageDal;