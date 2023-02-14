const db = require('../models/index');
const PossibleAns = db.possible_answer


class PossibleAnsDal {

    // is this necessary???
    getAllPossibleAns = async() =>{
        const pAnss = await PossibleAns.findAll({});
        return pAnss;

    }
    createPossibleAns = async(content)=>{
        const pAns = await PossibleAns.create(content);
        return pAns;
    }
    deletePossibleAnsbyId = async(id)=>{
        await PossibleAns.destroy({
            where :{
                id_ans:id
            }
        })
    }
    

    //TODO
    possibleAnsSearch = async (req, res) => {
        const { id_ans, qst, content, is_correct } = req.query
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



}


const possibleAnsDal = new PossibleAnsDal();
module.exports = possibleAnsDal;