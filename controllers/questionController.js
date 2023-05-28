const QuestionDal = require('../dal/qst_in_questionnaireDal');
const AnswerDal = require('../dal/answerDal');
const fsPromises = require('fs').promises;
const path = require('path');
const { v4: uuid } = require('uuid');

class QuestionController {


  getQstById = async (req, res) => {
    const { id } = req.params;
    const question = await QuestionDal.getQstById(id);
    if (!question) {
      return res.status(204).send();
    }
    res.json(question);
  }

  deleteImage = async (req, res) => {
    // need to implement the delete
    const { id } = req.params;
    await QuestionDal.addImagePath(id, '');
    res.status(200).send();

  }

  
  uploadImage = async (req, res) => {
    const image = req.file;
    const { id } = req.params;
    if (!image) {
      return res.status(400).send("No image provided")
    }

    const folder = path.join(__dirname, "..", "public", "images")  
    const imageName = `${uuid()}_${image.originalname}`
    const imageUrl  =`${folder}/${imageName}`

    try {
      await fsPromises.writeFile(imageUrl, image.buffer);
      await QuestionDal.addImagePath(id, imageName);
      return res.json({location: imageUrl, name:imageName })
    } catch (err) {
      return res.status(500).send("Invalid image data provided")
    }
  }
         

  getAllQstOfPart = async (req, res) => {
    const { partId } = req.params;
    const questions = await QuestionDal.getAllQstOfPart(partId);
    if (!questions?.length) {
      return res.status(204).send();
    }
    res.json(questions);
  }


  updateQst = async (req, res) => {
    const { id } = req.params;
    const { content, correctAnswerContent, incorrectAnswers } = req.body;
    // to delete the image related!!!!
    const question = await QuestionDal.updateQst(id, content);
    await AnswerDal.deleteAnswersOfQuestion(id);
    if (correctAnswerContent) {
      const correctAnswer = {
        content: correctAnswerContent,
        question_id: id,
        is_correct: true
      }
      const answer = await AnswerDal.createNewAns(correctAnswer);
    }
    if (incorrectAnswers) {
      incorrectAnswers.map(inCorrectAnswerContent => {
        AnswerDal.createNewAns({
          content: inCorrectAnswerContent,
          question_id: id,
          is_correct: false
        })
      });
    }
    return question==undefined? res.status(204).send : res.send(question);
  }

  createNewQst = async (req, res) => {
    const { content, part_id } = req.body;
    const qst = await QuestionDal.createNewQst({ content, part_id });
    if (qst)
      return res.status(201).json(qst)
  }

  deleteQst = async (req, res) => {
    const { id } = req.params;
    const deleted = await QuestionDal.deleteQst(id);
    return deleted==0? res.status(204).send() : res.json(`Message ID ${id} deleted`);
  }

}
 
module.exports = new QuestionController();  

  // not in use
  // getAllQst = async (req, res) => {
  //   var questinos = await QuestionDal.getAllQst();
  //   if (!questinos?.length)
  //     return res.status(204).send();
  //   res.json(questinos);
  // }

  // not in use
  // getMessageById = async (req, res) => {
  //   const id = req.params.id;
  //   const question = await QstDal.getMessageById(id);
  //   if (question)
  //     res.json(question);
  //   else
  //     return res.status(204).send();
  // }

  // not in use
  // getAllQstOfPartWithOutAnswers = async (req, res) => {
  //   const {partId} = req.params;
  //   const questinos = await QuestionDal.getAllQstOfPart(partId);
  //   if (!questinos?.length)
  //     return res.status(204).send();
  //   res.json(questinos);
  // }