// const db = require('../models/qst_in_questionnaire')
// const Qst = db.qst_in_questionnaire //יחיד או רבים???

// class QstInQuestionnaireController {

//     createNewQst = async (req, res) => {
//         const contents = req.body;
//         const qst = await Qst.create(contents)
//         if (qst)
//             return res.status(201).json({ message: 'New question created' })
//         return res.status(400)
//     }

//     //localhost:3600/api/messages
//     getAllQst = async (req, res) => {
//         var messages = await Message.findAll({});
//         if (!messages?.length)
//             return res.status(204).json({ message: 'No messages found' });//למה לא שולח את ההודעה?

//         //מורה שולחת ,מורה מקבלת, האם בוצע
//         const parameters = req.query;
//         if (parameters.from) {
//             messages = await Message.findAll({
//                 where: {
//                     from: parameters.from
//                 }
//             });
//         }

//         if (parameters.to) {// != null
//             messages = await Message.findAll({
//                 where: {
//                     to: parameters.to
//                 }
//             });
//         }

//         // if (parameters.isCommit) {
//         //     messages = await Message.findAll({
//         //         where: {
//         //             isCommit: parameters.isCommit
//         //         }
//         //     });
//         // }

//         if (!messages.length)
//             return res.status(204).json({ message: 'No messages found' });

//         res.json(messages);
//     }


//     //localhost:3600/api/messages/:1
//     getMessageById = async (req, res) => {
//         const id = req.params.id;
//         const message = await Message.findOne({
//             where: {
//                 id_message: id
//             }
//         });

//         if (!message)
//             return res.status(204).json({ message: `Message ID ${id} not found` });

//         res.json(message);
//     }

//     deleteQst = async (req, res) => { 
//         const id = req.params.id;
//         if (!id) {
//             return res.status(400).json({ message: 'question ID required' });
//         }
//         await Message.destroy({
//             where: {
//                 id_message: id
//             }
//         });

//         res.json(`Message ID ${id} deleted`);
//     }

// }

// const qstInQuestionnaireController = new QstInQuestionnaireController();


// module.exports = qstInQuestionnaireController;