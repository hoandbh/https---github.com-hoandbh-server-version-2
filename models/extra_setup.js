const { version } = require(".");
const Qst_in_questionnaire = require("./qst_in_questionnaire");
const { sequelize } = require("./sequelize");

const applyExtraSetup = () => {

    const {versions, courses, messages, qst_in_questionnaires, ans_in_versions, possible_answers,
           qst_in_versions,questionnaire,scores, users, ans_selected_in_test,part_in_questionnaire} = sequelize.models;

  
        courses.hasMany(users,{foreignKey:"course", as: "course_id", onDelete:'cascade'});
        users.belongsTo(courses,{foreignKey:"course", as: "teachers_in_course", onDelete:'cascade'});
   
        qst_in_questionnaires.belongsTo(part_in_questionnaire, {foreignKey: "part_in_questionnaire", as: "questionnaire_part_id", onDelete:'cascade'});
        part_in_questionnaire.hasMany(qst_in_questionnaires,{foreignKey:"part_in_questionnaire", as: "questions_for_this_part", onDelete:'cascade'});
 
        possible_answers.belongsTo(qst_in_questionnaires,{foreignKey:"qst", as: "question", onDelete:'cascade'});
        qst_in_questionnaires.hasMany(possible_answers,{foreignKey:"qst", as: "answers" , onDelete:'cascade'});

        qst_in_versions.belongsTo(versions,{foreignKey:"version", as: "version_id", onDelete:'cascade'});
        versions.hasMany(qst_in_versions,{foreignKey:"version", as: "questions_in_version", onDelete:'cascade'});

        versions.belongsTo(questionnaire, {foreignKey:"questionnaire", as: "questionnaire_id", onDelete:'cascade'});
        questionnaire.hasMany(versions, {foreignKey:"questionnaire", as: "versions", onDelete:'cascade'});

        scores.belongsTo(questionnaire, {foreignKey:"questionnaire", as:"questionnaire_id", onDelete:'cascade'});
        questionnaire.hasMany(scores, {foreignKey:"questionnaire", as:"scores", onDelete:'cascade'});

        messages.belongsTo(users, {foreignKey:"from", as: "message_from", onDelete:'cascade'});
        users.hasMany(messages, {foreignKey:"from", as: "messages sent", onDelete:'cascade'});

        messages.belongsTo(users, {foreignKey:"to", as: "message_to", onDelete:'cascade'});
        users.hasMany(messages, {foreignKey:"to", as: "messages recieved", onDelete:'cascade'});


        ans_selected_in_test.belongsTo(qst_in_questionnaires, {foreignKey:"qst_in_questionnaire", as: "qst_in_questionnaire_id1", onDelete:'cascade'});
        qst_in_questionnaires.hasMany(ans_selected_in_test, {foreignKey:"qst_in_questionnaire", as: "answers_selected", onDelete:'cascade'});

        possible_answers.belongsTo(qst_in_questionnaires, {foreignKey:"qst", as: "qst_in_questionnaire_id", onDelete:'cascade'} );
        qst_in_questionnaires.hasMany(possible_answers, {foreignKey:"qst", as: "possible_answers", onDelete:'cascade'});

        //this is for the python ai program to use!!!! :)
        ans_selected_in_test.belongsTo(qst_in_questionnaires, {foreignKey:"qst_in_questionnaire", as: "qst_in_questionnaire_idd", onDelete:'cascade'})
        qst_in_questionnaires.hasMany(ans_selected_in_test, {foreignKey:"qst_in_questionnaire", as:"answers_answered_for_question", onDelete:'cascade'})

        ans_selected_in_test.belongsTo(possible_answers, {foreignKey:"ans_selected", as: "question_in_questionnaire", onDelete:'cascade'});
        /////!!!!!!!!!!!!!!!!!!!!!
        possible_answers.hasMany(ans_selected_in_test, {foreignKey:"ans_selected", as: "answers_from_tests_that_selected_this", onDelete: 'cascade'})

        part_in_questionnaire.belongsTo(questionnaire, {foreignKey:"questionnaire", as: "questionnaire_id", onDelete:'cascade'});
        questionnaire.hasMany(part_in_questionnaire,{foreignKey:"questionnaire", as: "parts_in_questionnaire", onDelete:'cascade'} );

        Qst_in_questionnaire.belongsTo(part_in_questionnaire, {foreignKey:"part_in_questionnaire",as: "part_in_qstnre", onDelete:'cascade'});
        part_in_questionnaire.hasMany(qst_in_questionnaires, {foreignKey:"part_in_questionnaire",as: "questions_in_part", onDelete:'cascade'});
        
        ans_selected_in_test.belongsTo(qst_in_questionnaires, {foreignKey:"qst_in_questionnaire", as:"qst_in_questionnaire_id", onDelete:'cascade'});
        qst_in_questionnaires.hasMany(ans_selected_in_test,{foreignKey:"qst_in_questionnaire", as: "answers_in_tests_for_question", onDelete:'cascade'});


        ans_in_versions.belongsTo(qst_in_versions, {foreignKey:"qst_in_questionnaire", as: "qst_in_questionnaire_id", onDelete:'cascade'});
        qst_in_versions.hasMany(ans_in_versions,{foreignKey:"qst_in_questionnaire", as: "answers_in_versions", onDelete:'cascade'});

}


module.exports = { applyExtraSetup };

