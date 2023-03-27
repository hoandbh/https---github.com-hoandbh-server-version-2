const { version } = require(".");
const Qst_in_questionnaire = require("./qst_in_questionnaire");
const { sequelize } = require("./sequelize");

const applyExtraSetup = () => {

    const {versions, courses, messages, qst_in_questionnaires, ans_in_versions, possible_answers,
           qst_in_versions,questionnaire,scores, users, ans_selected_in_test,part_in_questionnaire} = sequelize.models;
              
        users.hasMany(questionnaire,{foreignKey:"owner", as:"user_of_qst", onDelete:'cascade'})
        questionnaire.belongsTo(users,{foreignKey:"owner", as: "questionnaire_of_user", onDelete:'cascade'});

        courses.hasMany(users,{foreignKey:"course_id", as: "course_id", onDelete:'cascade'});
        users.belongsTo(courses,{foreignKey:"course_id", as: "teachers_in_course", onDelete:'cascade'});
   
        qst_in_questionnaires.belongsTo(part_in_questionnaire, {foreignKey: "part_id", as: "questionnaire_part_id", onDelete:'cascade'});
        part_in_questionnaire.hasMany(qst_in_questionnaires,{foreignKey:"part_id", as: "questions_in_part", onDelete:'cascade'});
 
        possible_answers.belongsTo(qst_in_questionnaires,{foreignKey:"question_id", as: "question", onDelete:'cascade'});
        qst_in_questionnaires.hasMany(possible_answers,{foreignKey:"question_id", as: "answers" , onDelete:'cascade'});
    
        qst_in_versions.belongsTo(qst_in_questionnaires,{foreignKey:"question_id", as: "question_version", onDelete:'cascade'});
        qst_in_questionnaires.hasMany(qst_in_versions,{foreignKey:"question_id", as: "version_quetion" , onDelete:'cascade'});

        qst_in_versions.belongsTo(versions,{foreignKey:"version_id", as: "version_questions", onDelete:'cascade'});
        versions.hasMany(qst_in_versions,{foreignKey:"version_id", as: "questions_in_version", onDelete:'cascade'});

        versions.belongsTo(questionnaire, {foreignKey:"questionnaire_id", as: "questionnaire_versions", onDelete:'cascade'});
        questionnaire.hasMany(versions, {foreignKey:"questionnaire_id", as: "versions_questionnaire", onDelete:'cascade'});

        scores.belongsTo(questionnaire, {foreignKey:"questionnaire_id", as:"questionnaire_scores", onDelete:'cascade'});
        questionnaire.hasMany(scores, {foreignKey:"questionnaire_id", as:"scores_questionnaire", onDelete:'cascade'});

        messages.belongsTo(users, {foreignKey:"from", as: "message_from", onDelete:'cascade'});
        users.hasMany(messages, {foreignKey:"from", as: "messages sent", onDelete:'cascade'});

        messages.belongsTo(users, {foreignKey:"to", as: "message_to", onDelete:'cascade'});
        users.hasMany(messages, {foreignKey:"to", as: "messages recieved", onDelete:'cascade'});

        ans_selected_in_test.belongsTo(qst_in_questionnaires, {foreignKey:"question_id", as: "qst_in_questionnaire_id1", onDelete:'cascade'});
        qst_in_questionnaires.hasMany(ans_selected_in_test, {foreignKey:"question_id", as: "answers_selected", onDelete:'cascade'});

        ans_selected_in_test.belongsTo(possible_answers, {foreignKey:"answer_id", as: "question_in_questionnaire", onDelete:'cascade'});
        possible_answers.hasMany(ans_selected_in_test, {foreignKey:"answer_id", as: "answers_from_tests_that_selected_this", onDelete: 'cascade'})

        part_in_questionnaire.belongsTo(questionnaire, {foreignKey:"questionnaire_id", as: "questionnaire_part", onDelete:'cascade'});
        questionnaire.hasMany(part_in_questionnaire,{foreignKey:"questionnaire_id", as: "parts_in_questionnaire", onDelete:'cascade'} );
        
        ans_in_versions.belongsTo(qst_in_versions, {foreignKey:"qst_in_questionnaire", as: "qst_in_questionnaire_id", onDelete:'cascade'});
        qst_in_versions.hasMany(ans_in_versions,{foreignKey:"qst_in_questionnaire", as: "answers_in_versions", onDelete:'cascade'});

}
   
module.exports = { applyExtraSetup };

