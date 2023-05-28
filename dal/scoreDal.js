//V
const { Op } = require('sequelize');
const { score: Score } = require('../models');

const where = (id) => ({
  where: {
    id: id
  }
  });

class ScoreDal {

  getAllScores = async () => {
    const scores = await Score.findAll({});
    return scores;
  }

  getScoreById = async (id) => {
    // var score = await Score.findOne(where(id));
    var score = await Score.findByPk(id);
    return score;
  }

  createNewScore = async (content) => { 
    const score = await Score.create(content);
    return score;
  }

  deleteScore =  async (id) => { 
    await Score.destroy(where(id));
  }

  search = async (where) => { 
    const score = await Score.findAll({
      where:{
        [Op.and]:where
      }
    });
    return score;
  }

}

module.exports = new ScoreDal();


