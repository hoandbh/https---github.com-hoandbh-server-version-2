//V
const scoreDal = require("../dal/scoreDal");

class ScoreController {

  getAllScores = async (req, res, next) => {
    try{
    const scores = await scoreDal.getAllScores();
    if (!scores?.length)
      return res.status(400).json({ score: 'No scores found' });
    res.json(scores);
   } catch (error) {
      throw new Error(error);
      next(error);
    }
  } 

  createNewScore = async (req, res, next) => {
    try{
    const {student_id, questionnaire_id, score_} = req.body;
    if(!student_id || !questionnaire_id)
      return res.status(400).json({ message: 'All fields are required' });
    if  ( !score_)
      {}//calc score
    const score = await scoreDal.createNewScore({student_id, questionnaire_id, score_});
    if (score)
      return res.status(201).json(score);
    return res.status(500).json({ score: 'Failed to create new score' });
   } catch (error) {
      throw new Error(error);
      next(error);
    }
  } 

  getScoreById = async (req, res, next) => {
    try{
    const id = req.params.id;
    var score = await scoreDal.getScoreById(id);
    if (score)
      res.json(score);
    else
      res.status(204).send();
   } catch (error) {
      throw new Error(error);
      next(error);
    }
  } 

  deleteScore = async (req, res, next) => {
    try{
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ score: 'Score ID required' });
    }
    const result = await scoreDal.deleteScore(id);
    if (result === 0) {
      return res.status(404).json({ score: 'Score not found' });
    }
    res.json(`Score ID ${id} deleted`);
   } catch (error) {
      throw new Error(error);
      next(error);
    }
  } 

  search = async (req, res, next) => {
    try{
    const {student_id, questionnaire_id} = req.query;
    const where = {};
    if (student_id) where.student_id = student_id;
    if (questionnaire_id) where.questionnaire_id = questionnaire_id;
    const scores = await scoreDal.search(where);
    if (!scores?.length) {
      return res.status(204).send();
    }
    res.json(scores);
   } catch (error) {
      throw new Error(error);
      next(error);
    }
  } 
  
}
  
module.exports = new ScoreController(); 
