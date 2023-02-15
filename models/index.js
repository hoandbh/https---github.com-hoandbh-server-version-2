const { Sequelize } = require('sequelize');
const { sequelize } = require('./sequelize');
const { applyExtraSetup } = require('./extra_setup');

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize


//////start bringing tables
db.course = require('./course')
db.message = require('./message')
db.qst_in_questionnaire = require('./qst_in_questionnaire')
db.ans_in_version = require('./ans_in_version')
db.possible_answer = require('./possible_answer')
db.qst_in_version = require('./qst_in_version')
db.questionnaire = require('./questionnaire')
db.score = require('./score')
db.test = require('./test')
db.user = require('./user')
db.version = require('./version')

//////////end bringing tables


applyExtraSetup();
db.sequelize.sync({ alter:true })//change to alter:true
  .then(() => {
    console.log('yes re-sync done!')
  })

module.exports = db
