//V
const versionDal = require("../dal/versionDal");

class VersionController {

    getAllVersions = async (req, res) => {
        const versions = await versionDal.getAllVersions();
        if (!versions?.length)
            return res.status(400).json({ version: 'No versions found' });
        res.json(versions);
    }

    createVersions = async (req, res) => {
        const { questionnaire_id, count } = req.body;
        if (!questionnaire_id || !count)
            return res.status(400).json({ version: '{questionnaire_id,count} are required both' });
        var arr = [];
        for (var i = 0; i < count; i++) {
            arr.push({ questionnaire_id: questionnaire_id });
        }
        const versions = await versionDal.createVersions(arr);
        if (versions)
            return res.status(201).json(versions);
        return res.status(500).json({ version: 'Failed to create new version' });
    }

    createOneVersion = async (req, res) => {
        const v = await versionDal.createVersion();
        if (v)
            return res.status(201).json(v);
    }

    getVersionById = async (req, res) => {
        const id = req.params.id;
        var version = await versionDal.getVersionById(id);
        if (version)
            res.json(version);
        else
            res.status(204).send();
    }

    deleteVersion = async (req, res) => {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ version: 'Version ID required' });
        }
        const result = await versionDal.deleteVersion(id);
        if (result === 0) {
            return res.status(404).json({ version: 'Version not found' });
        }
        res.json(`Version ID ${id} deleted`);
    }

    getVersionsByQuestionnaire = async (req, res) => {
        const questionnaire_id = req.params.id;
        const versions = await versionDal.getVersionsByQuestionnaire(questionnaire_id);
        if (!versions?.length) {
            return res.status(204).send();
        }
        res.json(versions);
    }

    getVersionsPDFByQuestionnaire = async (req, res) => {
        const questionnaire_id = req.params.questionnaireId;
        const versions = await versionDal.getVersionsByQuestionnaire(questionnaire_id);
        if (!versions?.length) {
            return res.status(204).send();
        }
        console.log(versions)
        const versionIds = [];
        for (let v in versions) {
            versionIds.push(versions[v].dataValues.pdf_path)
        }
        res.json(versionIds) ;


    }
}

const versionController = new VersionController();
module.exports = versionController;
