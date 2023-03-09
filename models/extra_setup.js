const { version } = require(".");
const Qst_in_questionnaire = require("./qst_in_questionnaire");
const { sequelize } = require("./sequelize");

const applyExtraSetup = () => {

    const {versions, courses, messages, qst_in_questionnaires, ans_in_versions, possible_answers,
           qst_in_versions,questionnaire,scores, users, ans_selected_in_test,part_in_questionnaire} = sequelize.models;


        courses.hasMany(users,{foreignKey:"course", as: "course_id"});
        users.belongsTo(courses,{foreignKey:"course", as: "teachers_in_course"});

        qst_in_questionnaires.belongsTo(part_in_questionnaire, {foreignKey: "part_in_questionnaire", as: "questionnaire_part_id"});
        part_in_questionnaire.hasMany(qst_in_questionnaires,{foreignKey:"part_in_questionnaire", as: "questions_for_this_part"});

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


        ans_selected_in_test.belongsTo(qst_in_questionnaires, {foreignKey:"qst_in_questionnaire", as: "qst_in_questionnaire_id1"});
        qst_in_questionnaires.hasMany(ans_selected_in_test, {foreignKey:"qst_in_questionnaire", as: "answers_selected"});

        possible_answers.belongsTo(qst_in_questionnaires, {foreignKey:"qst", as: "qst_in_questionnaire_id"} );
        qst_in_questionnaires.hasMany(possible_answers, {foreignKey:"qst", as: "possible_answers"});

        //this is for the python ai program to use!!!! :)
        ans_selected_in_test.belongsTo(qst_in_questionnaires, {foreignKey:"qst_in_questionnaire", as: "qst_in_questionnaire_idd"})
        qst_in_questionnaires.hasMany(ans_selected_in_test, {foreignKey:"qst_in_questionnaire", as:"answers_answered_for_question"})

        ans_selected_in_test.belongsTo(possible_answers, {foreignKey:"ans_selected", as: "question_in_questionnaire"});
        possible_answers.hasMany(ans_selected_in_test, {foreignKey:"ans_selected", as: "answers_from_tests_that_selected_this"})


        part_in_questionnaire.belongsTo(questionnaire, {foreignKey:"questionnaire", as: "questionnaire_id"});
        questionnaire.hasMany(part_in_questionnaire,{foreignKey:"questionnaire", as: "parts_in_questionnaire"} );

        Qst_in_questionnaire.belongsTo(part_in_questionnaire, {foreignKey:"part_in_questionnaire",as: "part_in_qstnre"});
        part_in_questionnaire.hasMany(qst_in_questionnaires, {foreignKey:"part_in_questionnaire",as: "questions_in_part"});
        
        ans_selected_in_test.belongsTo(qst_in_questionnaires, {foreignKey:"qst_in_questionnaire", as:"qst_in_questionnaire_id"});
        qst_in_questionnaires.hasMany(ans_selected_in_test,{foreignKey:"qst_in_questionnaire", as: "answers_in_tests_for_question"});


        ans_in_versions.belongsTo(qst_in_versions, {foreignKey:"qst_in_questionnaire", as: "qst_in_questionnaire_id"});
        qst_in_versions.hasMany(ans_in_versions,{foreignKey:"qst_in_questionnaire", as: "answers_in_versions"});





}


module.exports = { applyExtraSetup };

