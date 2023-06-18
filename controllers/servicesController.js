//this is a controller to test all services during development
//we can take out components needed after development if necessary
//signed: Bracha

const VersionToPdfConverter = require('../services/versionToPdfConverter');

class ServicesController {

  versionToPDF = async (req, res, next) => {
    try {
      const versionId = req.params.id;
      const fullversion = await VersionToPdfConverter.convertVersionToPdf(versionId);
      if (fullversion)
        return res.status(201).json(fullversion)
    } catch (error) {
      throw new Error(error);
      next(error);
    }
  }

}

module.exports = new ServicesController();