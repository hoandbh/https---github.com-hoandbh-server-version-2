const db = require('../models/index')
const PDFDocument = require('pdfkit');
const fs = require('fs');
// const { version } = require('os');

const Questionnaire = db.questionnaire;
const Part_In_Questionnaire = db.part_in_questionnaire;
const Qst_from_questionnaire = db.qst_in_questionnaire;
const Possible_Answer = db.possible_answer;
const Version = db.version;
const Qst_in_version = db.qst_in_version;
const Ans_in_version = db.ans_in_version;
const Courses = db.course;
const Owners = db.user;
const getQuestionnaireCourse = async (ownerId) => {

    const owner = await Owners.findOne(
        {
            where: { id: ownerId },
            include: [{
                model: Courses,
                as: 'teachers_in_course'
            }]
        }
    )
    const o = owner.get({ plain: true });
    return o.teachers_in_course.name;

}
const getFullQuestionnaireOfVersion = async (versionId) => {
    const versionDetails = await Version.findByPk(versionId);
    const questionnaireId = versionDetails.questionnaire_id;
    const fullQuestionnaire = await Questionnaire.findOne(
        {
            where: { id: questionnaireId },
            include: [{
                model: Part_In_Questionnaire,
                as: 'parts_in_questionnaire',
                include: [{
                    model: Qst_from_questionnaire,
                    as: 'questions_in_part',
                    include: [{
                        model: Possible_Answer,
                        as: 'answers'
                    }]
                }]

            }]

        }
    )
    const a = fullQuestionnaire.get({plain:true});
    // console.log(a.parts_in_questionnaire[0].questions_in_part)
    // console.log("here \n\n\n\n\n\n\n\n")
    return fullQuestionnaire.get({ plain: true });
}
const orderPartsByDesc = (questionnaire) => {
    const questionnaireParts = questionnaire.parts_in_questionnaire
    return questionnaireParts.sort((a, b) => (a.serial_number > b.serial_number) ? 1 : -1);

}
const getSerialNumberOfAnswer = async (answer, versionId) => {
    try {
        const aInVersion = await Ans_in_version.findOne({
            where: {
                version_id: versionId,
                answer_id: answer.id
            }
        });
        return aInVersion.get({ plain: true }).serial_number;

    } catch (error) {
        console.log(`Caught Error - no matching answer in version: \n ${error}`);
        const message = `missing answer in version: \n answer: ${answer}, version: ${versionId}`;
        try {
            fs.appendFile('../logs/mqiv.txt', message);

        } catch (error) {
            console.log("didn't write to file");
            console.log(message);

        }

    }
}
const orderAnswersForVersion = async (question, versionId) => {
    for (let i in question.answers) {
        const serialNumberOfAns = await getSerialNumberOfAnswer(question.answers[i], versionId);
        question.answers[i].serial_number = serialNumberOfAns;
        // console.log(question.answers[i]);
    }

    return question.answers.sort((a, b) => (a.serial_number > b.serial_number) ? 1 : -1);
}
const getSerialNumberOfQuestion = async (question, versionId) => {
    try {
        const qInVersion = await Qst_in_version.findOne({
            where: {
                version_id: versionId,
                question_id: question.id
            }
        });
        return qInVersion.get({ plain: true }).serial_number_in_part;


    } catch (error) {
        console.log(`Caught Error - no matching question in versoin: \n ${error}`);
        const message = `missing question in version: \n question: ${question}, version: ${versionId}`;
        try {
            fs.appendFile('../logs/mqiv.txt', message);

        } catch (error) {
            console.log("didn't write to file");
            console.log(message);

        }

    }
}
const getAllQuestionsOfPartInVersionOrder = async (part, versionId) => {
    //returns array of questions to print in order of this version
    const questionsArr = part.questions_in_part;
    for (let i in questionsArr) {
        const serialNumOfQ = await getSerialNumberOfQuestion(questionsArr[i], versionId);
        questionsArr[i]['serial_number'] = serialNumOfQ;
        // console.log(questionsArr[i]);
        questionsArr[i].answers = await orderAnswersForVersion(questionsArr[i], versionId);
    }
    return questionsArr.sort((a, b) => (a.serial_number > b.serial_number) ? 1 : -1);

}
const getAllPartsWithQuestionsInOrder = async (questionnaire, versionId) => {

    for (let i in questionnaire.parts_in_questionnaire) {
        const m = await getAllQuestionsOfPartInVersionOrder(questionnaire.parts_in_questionnaire[i], versionId);
        questionnaire.parts_in_questionnaire[i].questions_in_part = m;
    }
    return questionnaire;
}
const printHeaders = async (detailsDic, doc)=>{
    // doc.image('./files/Header.PNG');
    doc.image('./files/Header.PNG', 100, 30, { fit: [420, 350], align: 'center' }).stroke();

    
    doc.text(`\n\n\n\n\n\n questionnaire in ${detailsDic.courseN}. \n Good Luck!!!`);
    doc.text(`version: ${detailsDic.versionNum}`);
    doc.text(`date: ${detailsDic.date}`);
}
const printParts = async (partsArr, doc) => {

    for (let i in partsArr) {
        doc.text(`\nPart ${partsArr[i].serial_number}, ${partsArr[i].headline}\n`, {underline:true});
        doc.text();
        const qs = partsArr[i].questions_in_part;
        for (let q in qs) {
            doc.text(`\nQuestion ${qs[q].serial_number}`);
            doc.text(qs[q].content);
            // console.log('ANSWERS');
            // console.log(qs[q].answers);
            let as = qs[q].answers;
            console.log(`the question: ${qs[q]}`)
            console.log(`the answers: ${as}`)
            
            for (let a in as) {
                doc.text(`\n ${a.serial_number}: ${a.content}`)
            }
        }
    }
}


class TestPrinter {

    convertVersionToPdf = async (versionId, filePath) => {
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(`./files/${versionId}.pdf`, 'utf8'));

        const fullQuestoinnaire = await getFullQuestionnaireOfVersion(versionId);
        const ownerId = fullQuestoinnaire.owner;
        const courseName = await getQuestionnaireCourse(ownerId);
        orderPartsByDesc(fullQuestoinnaire);
        await getAllPartsWithQuestionsInOrder(fullQuestoinnaire, versionId);
        //כותרות למבחן פה

        let headers = {
            courseN:courseName,
            versionNum:versionId,
            date:fullQuestoinnaire.date.toLocaleDateString()
        }
        await printHeaders(headers,doc);
        
        await printParts(fullQuestoinnaire.parts_in_questionnaire, doc);

        doc.end();
        return fullQuestoinnaire;
    }


}

module.exports = new TestPrinter();