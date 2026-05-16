const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const origem = path.join(__dirname, '..', 'docs', 'DOCUMENTACAO_COMPLETA.md');
const destino = path.join(__dirname, '..', 'docs', 'DOCUMENTACAO_COMPLETA.pdf');

const markdown = fs.readFileSync(origem, 'utf8');
const linhas = markdown.split(/\r?\n/);

const doc = new PDFDocument({
  size: 'A4',
  margin: 48,
  info: {
    Title: 'Documentacao Completa - Biblioteca Geek Fullstack',
    Author: 'Biblioteca Geek',
  },
});

doc.pipe(fs.createWriteStream(destino));

function escreverLinha(linha) {
  if (linha.startsWith('# ')) {
    doc.moveDown(0.8).font('Helvetica-Bold').fontSize(18).text(linha.replace('# ', ''));
    return;
  }

  if (linha.startsWith('## ')) {
    doc.moveDown(0.6).font('Helvetica-Bold').fontSize(13).text(linha.replace('## ', ''));
    return;
  }

  if (linha.startsWith('- ')) {
    doc
      .font('Helvetica')
      .fontSize(10)
      .text(`- ${linha.replace('- ', '')}`, {
        indent: 12,
      });
    return;
  }

  if (linha.trim().startsWith('```')) {
    doc.moveDown(0.2);
    return;
  }

  if (!linha.trim()) {
    doc.moveDown(0.4);
    return;
  }

  doc.font('Helvetica').fontSize(10).text(linha, {
    align: 'left',
  });
}

doc.font('Helvetica-Bold').fontSize(20).text('Biblioteca Geek Fullstack', {
  align: 'center',
});
doc.font('Helvetica').fontSize(10).text('Documentacao completa do projeto academico', {
  align: 'center',
});
doc.moveDown();

linhas.forEach(escreverLinha);

const paginas = doc.bufferedPageRange();
for (let i = paginas.start; i < paginas.start + paginas.count; i += 1) {
  doc.switchToPage(i);
  doc.font('Helvetica').fontSize(8).text('Biblioteca Geek - Programacao para Internet', 48, 805, {
    align: 'center',
  });
}

doc.end();
