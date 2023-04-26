//this is a controller to test all services during development
//we can take out components needed after development if necessary
//signed: Bracha

const versionPrinter = require('../services/testPrinter');

class ServicesController {

  versionToPDF = async(req,res)=>{
    const versionId = req.params.id;
    const fullversion = await versionPrinter.convertVersionToPdf(versionId);
    if(fullversion)
      return res.status(201).json(fullversion)

    // const d = await versionPrinter.convertVersionToPdf(versionId,path );
    // if(d)
    //   console.log("pdf created successfuly :)");
    // else
    //   res.status(204).send();
  }

}

module.exports = new ServicesController();