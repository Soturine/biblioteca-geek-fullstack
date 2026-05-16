const { readdirSync } = require('fs');
const { join } = require('path');
const { spawnSync } = require('child_process');

const raiz = join(__dirname, '..');
const ignorar = new Set(['node_modules', '.git']);
const arquivos = [];

function coletar(diretorio) {
  for (const entrada of readdirSync(diretorio, { withFileTypes: true })) {
    if (ignorar.has(entrada.name)) {
      continue;
    }

    const caminho = join(diretorio, entrada.name);
    if (entrada.isDirectory()) {
      coletar(caminho);
    } else if (entrada.isFile() && caminho.endsWith('.js')) {
      arquivos.push(caminho);
    }
  }
}

coletar(raiz);

for (const arquivo of arquivos) {
  const resultado = spawnSync(process.execPath, ['--check', arquivo], {
    stdio: 'inherit',
  });

  if (resultado.status !== 0) {
    process.exit(resultado.status);
  }
}

console.log(`Sintaxe conferida em ${arquivos.length} arquivos JavaScript.`);
