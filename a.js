const PDFDocument = require('pdfkit');
const fs = require('fs');

function generateAnswerSheetPDF(x, s, filePath) {
  const doc = new PDFDocument();

  // Set up the PDF document
  doc.pipe(fs.createWriteStream(filePath));

  const frameMargin = 10; // Margin around the content
  const questionHeight = 20; // Height of each question row
  const answerRadius = 5; // Radius of the circle representing an answer

  const frameWidth = doc.page.width - frameMargin * 2; // Width of the frame
  const frameHeight = doc.page.height - frameMargin * 2; // Height of the frame

  // Draw the frame
  doc.rect(frameMargin, frameMargin, frameWidth, frameHeight)
    .lineWidth(3)
    .stroke();

  doc.lineWidth(1)
  
  // Write the version information inside the frame
  doc.fontSize(12)
    .text(`Version: ${s}`, frameMargin + 10, frameMargin + 10);

  // Calculate the available content height within the frame
  const availableHeight = frameHeight - 30;
  const maxQuestions = Math.floor(availableHeight / questionHeight);

  // Draw the questions and optional answers as circles
  for (let i = 0; i < x.length && i < maxQuestions; i++) {
    const numOptions = x[i][0]; // Get the number of options for the current question

    // Calculate the starting position for each question row
    const questionX = frameMargin + 10;
    const questionY = frameMargin + 30 + i * questionHeight;

    // Draw the question number
    doc.fontSize(10)
      .text(`Question ${i + 1}`, questionX, questionY);

    // Draw the optional answers as circles
    for (let j = 0; j < numOptions; j++) {
      const circleX = questionX + 100 + j * 20; // X position of the circle
      const circleY = questionY + 2; // Y position of the circle

      doc.circle(circleX, circleY, answerRadius)
        .stroke();
    }
  }

  // Finalize the PDF document
  doc.end();
}




const array = [
  [4],
  [2],
  [3],
  [4],
  [7],
  [3],
  [5],
  [3],
  [3],
];
const version = "abc123!@#abc";
const filePath = '../answer_sheet.pdf';
generateAnswerSheetPDF(array, version, filePath);
