const { exec } = require('child_process');

const url = process.argv[2] || 'http://localhost:3000';
const platform = process.platform;

let command;

if (platform === 'win32') {
  command = `start "" "${url}"`;
} else if (platform === 'darwin') {
  command = `open "${url}"`;
} else {
  command = `xdg-open "${url}"`;
}

exec(command, (error) => {
  if (error) {
    console.error(`Nao foi possivel abrir o navegador automaticamente: ${error.message}`);
    console.log(`Abra manualmente: ${url}`);
    process.exit(1);
  }

  console.log(`Navegador aberto em ${url}`);
});
