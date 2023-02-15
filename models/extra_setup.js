const { sequelize } = require("./sequelize");

const applyExtraSetup = () => {

    const {course, message, qst_in_questionnaire, ans_in_version, possible_answer,
         qst_in_version,questionnaire,score, test, user, version} = sequelize.models;
        //  book.belongsTo(category, { foreignKey: "cateogry_id", as: "category" });
        //  book.belongsTo(author, { foreignKey: "author_id", as: "author" });
        //  author.hasMany(book, { foreignKey: "author_id", as: "books" });
        //  category.hasMany(book, { foreignKey: "cateogry_id", as: "books" });
//         Tutorial.hasMany(Comment, { as: "comments" });
        // Comment.belongsTo(Tutorial, {
        //   foreignKey: "tutorialId",
        //   as: "tutorial",
        // });
        // message.belongsTo(user)
        // user.hasMany(message)
         
        qst_in_questionnaire.belongsTo(questionnaire, {foreignKey: "questionnaire", as: "questionnaire"});
        questionnaire.hasMany(qst_in_questionnaire,{foreignKey:"questionnaire", as: "questions"});


        possible_answer.belongsTo(qst_in_questionnaire,{foreignKey:"qst", as: "question"});
        qst_in_questionnaire.hasMany(possible_answer,{foreignKey:"qst", as: "answers" });

        


}

module.exports = { applyExtraSetup };

