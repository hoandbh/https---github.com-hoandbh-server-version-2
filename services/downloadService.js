const archiver = require('archiver');
const fs = require('fs');

class DownloadService {

  downloadFolder = async (folderPath, folderName) => {
    return new Promise((resolve, reject) => {
      const output = fs.createWriteStream(`${folderName}.zip`);
      const archive = archiver('zip', { zlib: { level: 9 } });

      output.on('close', () => {
        resolve();
      });

      archive.on('error', (error) => {
        reject(error);
      });

      archive.pipe(output);

      const files = fs.readdirSync(folderPath);

      files.forEach((file) => {
        const filePath = `${folderPath}/${file}`;

        archive.append(fs.createReadStream(filePath), { name: file });
      });

      archive.finalize();

    })
  }
}

module.exports = new DownloadService();
