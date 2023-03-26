//V
const { Op, where } = require('sequelize');
const { possible_answer: Answer } = require('../models');

class AnswerDal {

    getAllAnsOfQst = async (qstId) => {
        var answers = await Answer.findAll({
            where: {
                qst:qstId
            }}
        );
        return answers;
    }

    createNewAns = async (content) => {
        const answer = await Answer.create(content);
        return answer;
    }




    //TODO
    possibleAnsSearch = async (req, res) => {
        const { id, qst, content, is_correct } = req.query
        //maybe the content we need to search only according to beginning! or not at all
        const possible_anss = await PossibleAns.findAll({
            //TODO
            // attributes: [''],
            // include:[
            // ],
            // where:{}
        })

        //this is in the controller probably
        if (!possible_anss?.length)
            return res.status(400).json({ message: 'No PAnswers found' })

        res.json(possible_anss)
    }

    deletePossibleAnsbyId = async(id)=>{
        await PossibleAns.destroy({
            where :{
                id:id
            }
        })
    }
  
}

const answerDal = new AnswerDal();
module.exports  = answerDal;




