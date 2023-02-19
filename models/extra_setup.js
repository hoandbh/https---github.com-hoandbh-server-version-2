const { version } = require(".");
const { sequelize } = require("./sequelize");

const applyExtraSetup = () => {

    const {versions, course, messages, qst_in_questionnaires, ans_in_versions, possible_answers,
           qst_in_versions,questionnaire,scores, test, users, ans_selected_in_test} = sequelize.models;
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
         
        qst_in_questionnaires.belongsTo(questionnaire, {foreignKey: "questionnaire", as: "questionnaire_id"});
        questionnaire.hasMany(qst_in_questionnaires,{foreignKey:"questionnaire", as: "questions"});

        possible_answers.belongsTo(qst_in_questionnaires,{foreignKey:"qst", as: "question"});
        qst_in_questionnaires.hasMany(possible_answers,{foreignKey:"qst", as: "answers" });

        qst_in_versions.belongsTo(versions,{foreignKey:"version", as: "version_id"});
        versions.hasMany(qst_in_versions,{foreignKey:"version", as: "questions_in_version"});


        versions.belongsTo(questionnaire, {foreignKey:"questionnaire", as: "questionnaire_id"});
        questionnaire.hasMany(versions, {foreignKey:"questionnaire", as: "versions"});

        scores.belongsTo(questionnaire, {foreignKey:"questionnaire", as:"questionnaire_id"});
        questionnaire.hasMany(scores, {foreignKey:"questionnaire", as:"scores"});

        messages.belongsTo(users, {foreignKey:"from", as: "message_from"});
        users.hasMany(messages, {foreignKey:"from", as: "messages sent"});

        messages.belongsTo(users, {foreignKey:"to", as: "message_to"});
        users.hasMany(messages, {foreignKey:"to", as: "messages recieved"});


        ans_selected_in_test.belongsTo(qst_in_questionnaires, {foreignKey:"qst_in_questionnaire", as: "qst_in_questionnaire_id"});
        qst_in_questionnaires.hasMany(ans_selected_in_test, {foreignKey:"qst_in_questionnaire", as: "answers_selected"});

        

}


module.exports = { applyExtraSetup };

