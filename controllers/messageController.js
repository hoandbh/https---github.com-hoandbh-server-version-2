//V
const messageDal = require("../dal/messageDal");

class MessageController {

  getAllMessages = async (req, res, next) => {
    const messages = await messageDal.getAllMessages();
    if (!messages?.length)
      return res.status(400).json({ message: 'No messages found' });
    res.json(messages);
  }

  createNewMessage = async (req, res, next) => {
    const { content, from, to, date, isCommited } = req.body;
    if (!content || !from || !to || !date)//  ||(isCommit === undefined || isCommit === null)
      return res.status(400).json({ message: 'All fields are required' });
    const message = await messageDal.createNewMessage({ content, from, to, date, isCommited });
    if (message)
      return res.status(201).json(message);
    return res.status(500).json({ message: 'Failed to create new message' });
  }


  getMessageById = async (req, res, next) => {
    const id = req.params.id;
    var message = await messageDal.getMessageById(id);
    if (message?.length)
      res.json(message);
    else
      res.status(204).send();
  }

  deleteMessage = async (req, res, next) => {
    const {id} = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Message ID required' });
    }
    const result = await messageDal.deleteMessage(id);
    if (result === 0) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(`Message ID ${id} deleted`);
  }
  
  search = async (req, res, next) => {
    const { from, to, isCommit, content } = req.query;
    const where = {};
    if (from) where.from = parseInt(from);
    if (to) where.to = parseInt(to);
    if (isCommit) where.isCommit = isCommit;
    if (content) where.content = { [Op.like]: `%${content}%` };
    const messages = await messageDal.search(where);
    if (!messages?.length) {
      return res.status(204).send();
    }
    res.json(messages);
  }

}
 
module.exports = new MessageController(); 