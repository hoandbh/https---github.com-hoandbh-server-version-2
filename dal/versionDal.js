//V
const { Op } = require('sequelize');
const { version: Version } = require('../models');

const where = (id) => ({
  where: {
    id: id
  }
});

class VersionDal {

  getAllVersions = async () => {
    const versions = await Version.findAll({});
    return versions;
  }

  getVersionById = async (id) => {
    // var version = await Version.findOne(where(id));
    var version = await Version.findByPk(id);
    return version;
  }

  createVersions = async (arr) => {
    const versions = await Version.bulkCreate(arr);
    return versions;
  }

  createVersion = async(q_id)=>{
    const version = await Version.create({'questionnaire':1, 'pdf_path':'/localhost/333'});
    return version;
  }

  deleteVersion = async (id) => {
    await Version.destroy(where(id));
  }

  getVersionsByQuestionnaire = async (id) => {
    const version = await Version.findAll({
      where: {
        questionnaire_id: id
      }
    });
    return version;
  }

}

const versionDal = new VersionDal();
module.exports = versionDal;


