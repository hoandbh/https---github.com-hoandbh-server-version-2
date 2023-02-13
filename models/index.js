const dbConfig = require('../config/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
}
)

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize


//////start bringing tables
db.course = require('./course')(sequelize, DataTypes)
db.message = require('./message')(sequelize, DataTypes)
 db.qst_in_questionnaire = require('./qst_in_questionnaire')(sequelize, DataTypes)
//////////end bringing tables

db.sequelize.sync({ force:false })//change to alter:true
  .then(() => {
    console.log('yes re-sync done!')
  })

module.exports = db
