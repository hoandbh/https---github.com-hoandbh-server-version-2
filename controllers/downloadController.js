const downloadService = require('../services/downloadService');

const path = require('path')
const archiver = require('archiver');
const fs = require('fs');

class DownloadController {

  downloadFolder = async (req, res) => {

      const { questionnaireId } = req.params;

      const folderName = questionnaireId.toString();  
      const folderPath = `public/files/versions/${folderName}`; 

      const archive = archiver('zip', {
        zlib: { level: 9 } // Compression level (highest)
      });
    
      const zipFileName = 'folder.zip';
    
      archive.on('error', (err) => {
        res.status(500).send({ error: err.message });
      });
    
      // Pipe the archive data to the response
      archive.pipe(res);
      
      // Add the folder and its contents to the archive
      archive.directory(folderPath, false);
    
      // Finalize the archive and trigger the download
      archive.finalize();
    }

}
 
module.exports = new DownloadController(); 
