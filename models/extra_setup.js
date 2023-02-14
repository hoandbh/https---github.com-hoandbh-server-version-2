const { sequelize } = require("./sequelize");

const applyExtraSetup = () => {

    const {course, message, qst_in_questionnaire, ans_in_version, possible_answer,
         qst_in_version,questionnaire,score, test, user, version} = sequelize.models;
        //  book.belongsTo(category, { foreignKey: "cateogry_id", as: "category" });
        //  book.belongsTo(author, { foreignKey: "author_id", as: "author" });
        //  author.hasMany(book, { foreignKey: "author_id", as: "books" });
        //  category.hasMany(book, { foreignKey: "cateogry_id", as: "books" });
        message.belongsTo(user)
        user.hasMany(message)     

}

module.exports = { applyExtraSetup };

