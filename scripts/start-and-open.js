const { spawn } = require('child_process');
const http = require('http');

const url = 'http://localhost:3000';

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function checkServer() {
  return new Promise((resolve) => {
    const req = http.get(`${url}/api/v1/health`, (res) => {
      res.resume();
      resolve(res.statusCode === 200);
    });

    req.on('error', () => resolve(false));
    req.setTimeout(1200, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function openBrowser() {
  const opener = spawn(process.execPath, ['scripts/open-browser.js'], {
    stdio: 'inherit',
    shell: false,
  });

  opener.on('exit', () => {});
}

async function main() {
  if (await checkServer()) {
    console.log('O sistema ja esta rodando em http://localhost:3000.');
    await openBrowser();
    return;
  }

  console.log('Iniciando servidor Node.js...');
  const server = spawn(process.execPath, ['src/server.js'], {
    stdio: 'inherit',
    shell: false,
  });

  for (let i = 0; i < 12; i += 1) {
    await wait(1000);
    if (await checkServer()) {
      await openBrowser();
      return;
    }
  }

  console.log('Servidor iniciado, mas o health check nao respondeu no tempo esperado.');
  console.log('Abra manualmente: http://localhost:3000');

  server.on('exit', (code) => {
    process.exit(code || 0);
  });
}

main();
