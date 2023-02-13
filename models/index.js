const {Sequelize} = require('sequelize');
const {sequelize} = require('./sequelize');
const { applyExtraSetup } = require('./extra_setup');

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize


//////start bringing tables
db.course = require('./course')
db.message = require('./message')
 db.qst_in_questionnaire = require('./qst_in_questionnaire')
//////////end bringing tables


applyExtraSetup();
db.sequelize.sync({ force:false })//change to alter:true
  .then(() => {
    console.log('yes re-sync done!')
  })

module.exports = db
