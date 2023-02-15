const { sequelize } = require("./sequelize");

const applyExtraSetup = () => {

    const {course, messages, qst_in_questionnaires, ans_in_versions, possible_answers,
           qst_in_versions,questionnaire,scores, test, users, versions} = sequelize.models;
        //  book.belongsTo(category, { foreignKey: "cateogry_id", as: "category" });
        //  book.belongsTo(author, { foreignKey: "author_id", as: "author" });
        //  author.hasMany(book, { foreignKey: "author_id", as: "books" });
        //  category.hasMany(book, { foreignKey: "cateogry_id", as: "books" });
        // Tutorial.hasMany(Comment, { as: "comments" });
        // Comment.belongsTo(Tutorial, {
        //   foreignKey: "tutorialId",
        //   as: "tutorial",
        // });
        // message.belongsTo(user)
        // user.hasMany(message)
<<<<<<< HEAD
         
        qst_in_questionnaires.belongsTo(questionnaire, {foreignKey: "questionnaire", as: "questionnaire_id"});
        questionnaire.hasMany(qst_in_questionnaires,{foreignKey:"questionnaire", as: "questions"});


        // possible_answer.belongsTo(qst_in_questionnaire,{foreignKey:"qst", as: "question"});
        // qst_in_questionnaire.hasMany(possible_answer,{foreignKey:"qst", as: "answers" });

=======
        // qst_in_questionnaire.belongsTo(questionnaire, {foreignKey: "questionnaire", as: "questionnaire"});
        // questionnaire.hasMany(qst_in_questionnaire,{foreignKey:"questionnaire", as: "questions"});
        // possible_answer.belongsTo(qst_in_questionnaire,{foreignKey:"qst", as: "question"});
        // qst_in_questionnaire.hasMany(possible_answer,{foreignKey:"qst", as: "answers" });
>>>>>>> d9ddab0bd845e6e904516dc8cb6f291cf223d931
}

module.exports = { applyExtraSetup };

