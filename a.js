const fs = require('fs');
const PDFDocument = require('pdfkit');

const regularFont = 'fonts/DavidLibre-Regular.ttf';
const boldFont = 'fonts/DavidLibre-Bold.ttf';
      
const margins = {
  top: 50,
  bottom: 50,
  left: 72,
  right: 72
}

const print = () => {
  const doc = new PDFDocument({
    bufferPages: true
  });
  doc.font('fonts/Alef-Regular.ttf').fontSize(16);
  const filePath = `../hadas.pdf`;
  doc.pipe(fs.createWriteStream(filePath));

  const pageWidth = doc.page.width;
  const widthOfLine = doc.widthOfString('ראשון שני שלישי');
  const aWidth = doc.widthOfString(" ראשון");
  const bWidth = doc.widthOfString(" שני");
  const cWidth = doc.widthOfString("שלישי");
  const spaceWidth = (pageWidth - widthOfLine) / 2;
  const startA = spaceWidth + widthOfLine - aWidth;
  const startB = startA - bWidth;
  const startC = startB - cWidth;

  console.log('startA');
  console.log(startA);
  console.log('widthOfLine');
  console.log(widthOfLine);
  console.log('doc.page.width');
  console.log(doc.page.width);

  doc.fillColor('gray')
    .font(regularFont)
    .text(" ראשון", startA, 50, { features: ['rtla'] })
    .font(boldFont)
    .text(" שני", startB, 50, { features: ['rtla'] })
    .font(regularFont)
    .text("שלישי", startC, 50, { features: ['rtla'] });

  doc.end();

}

print();



