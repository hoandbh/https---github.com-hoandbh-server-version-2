
// const fs = require('fs');
// const PDFDocument = require('pdfkit');
// const bidi = require('bidi-js');

// const regularFont = 'fonts/DavidLibre-Regular.ttf';
// const boldFont = 'fonts/DavidLibre-Bold.ttf';

// const margins = {
//   top: 50,
//   bottom: 50,
//   left: 72,
//   right: 72
// }

// // function reverseEnglishText(str) {
// //   // Split the string into an array of words
// //   let words = str.split(' ');

// //   // Iterate through each word
// //   for (let i = 0; i < words.length; i++) {
// //     // Check if the word contains only English letters
// //     if (/^[A-Za-z]+$/.test(words[i])) {
// //       // Reverse the characters of the word
// //       words[i] = words[i].split('').reverse().join('');
// //     }
// //   }

// //   // Join the words back into a string
// //   let reversedStr = words.join(' ');

// //   return reversedStr;
// // }

// const print = () => {
//   const doc = new PDFDocument({
//     bufferPages: true
//   });
//   doc.font('fonts/Alef-Regular.ttf').fontSize(16);
//   const filePath = `../hadas.pdf`;
//   doc.pipe(fs.createWriteStream(filePath));

//   // doc.text('הדס אופק', { features: ['rtla'], align: 'right' })
//   // doc.text('א,  hello', { features: ['rtla'], align: 'right', direction: 'rtl' })
//   // doc.text('hello', { features: ['rtla'], align: 'right' })


//   const s = "abc 1 שלום לכולם אני";
//   const ss=s.sreverse()
//   doc.text(ss, {align: 'right'})
//   //console.log(s)

//   doc.end();

// }

// print();

const text ="abc"
const ss=text.split("").reverse().join("");


console.log(ss)