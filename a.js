const fs = require('fs');
const { Document, Packer, Paragraph, TextRun } = require('docx');

const text = [new TextRun("aaaa"),
new TextRun({
    text: "bbbbb",
    bold: true,
}),
new TextRun({
    text: "\tcccc",
    bold: true,
})]

const doc = new Document({
    sections: [
        {
            properties: {},
            children: [
                new Paragraph({
                    children: text,
                }),
            ],
        },
    ],
});

const path = `./files/readyVersions/hadas.docx`;

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(path, buffer);
});
