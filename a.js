// const fs = require('fs');
// const PDFDocument = require('pdfkit');

// const regularFont = 'fonts/DavidLibre-Regular.ttf';
// const boldFont = 'fonts/DavidLibre-Bold.ttf';

// const margins = {
//   top: 50,
//   bottom: 50,
//   left: 72,
//   right: 72
// }

// const print = () => {
//   const doc = new PDFDocument({
//     bufferPages: true
//   });
//   doc.font('fonts/Alef-Regular.ttf').fontSize(16);
//   const filePath = `../hadas.pdf`;
//   doc.pipe(fs.createWriteStream(filePath));

//   const pageWidth = doc.page.width;
//   const widthOfLine = doc.widthOfString('ראשון שני שלישי');
//   const aWidth = doc.widthOfString(" ראשון");
//   const bWidth = doc.widthOfString(" שני");
//   const cWidth = doc.widthOfString("שלישי");
//   const spaceWidth = (pageWidth - widthOfLine) / 2;
//   const startA = spaceWidth + widthOfLine - aWidth;
//   const startB = startA - bWidth;
//   const startC = startB - cWidth;

//   console.log('startA');
//   console.log(startA);
//   console.log('widthOfLine');
//   console.log(widthOfLine);
//   console.log('doc.page.width');
//   console.log(doc.page.width);

//   doc.fillColor('gray')
//     .font(regularFont)
//     .text(" ראשון", startA, 50, { features: ['rtla'] })
//     .font(boldFont)
//     .text(" שני", startB, 50, { features: ['rtla'] })
//     .font(regularFont)
//     .text("שלישי", startC, 50, { features: ['rtla'] });

//   doc.end();

// }

// print();



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

function reverseEnglishText(str) {
  // Split the string into an array of words
  let words = str.split(' ');

  // Iterate through each word
  for (let i = 0; i < words.length; i++) {
    // Check if the word contains only English letters
    if (/^[A-Za-z]+$/.test(words[i])) {
      // Reverse the characters of the word
      words[i] = words[i].split('').reverse().join('');
    }
  }

  // Join the words back into a string
  let reversedStr = words.join(' ');

  return reversedStr;
}

// const print = () => {
//   const doc = new PDFDocument({
//     bufferPages: true
//   });
//   doc.font('fonts/Alef-Regular.ttf').fontSize(16);
//   const filePath = `../hadas.pdf`;
//   doc.pipe(fs.createWriteStream(filePath));

//   doc.text('הדס אופק', { features: ['rtla'], align: 'right' })
//   doc.text('א,  hello', { features: ['rtla'], align: 'right', direction: 'rtl' })
//   doc.text('hello', { features: ['rtla'], align: 'right' })

//   doc.end();

// }

// print();

const text = reverseEnglishText("ונדמל.ב react js")


console.log(text)