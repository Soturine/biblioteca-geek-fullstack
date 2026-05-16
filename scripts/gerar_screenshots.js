const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const baseUrl = process.env.SCREENSHOT_BASE_URL || 'http://localhost:3000';
const outputDir = path.join(__dirname, '..', 'docs', 'assets', 'screenshots');

function browserPath() {
  const candidates = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  ];

  return candidates.find((candidate) => fs.existsSync(candidate));
}

function destino(nome) {
  return path.join(outputDir, nome);
}

async function abrir(page, url, arquivo) {
  await page.goto(`${baseUrl}/${url}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  await page.screenshot({ path: destino(arquivo), fullPage: true });
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });

  const executablePath = browserPath();
  const browser = await chromium.launch({
    executablePath,
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    acceptDownloads: true,
  });

  const page = await context.newPage();

  await page.goto(`${baseUrl}/login.html`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: destino('01-login.png'), fullPage: true });
  await page.fill('#loginEmail', 'admin@admin.com');
  await page.fill('#loginSenha', '123456');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/dashboard.html', { timeout: 10000 });
  await page.waitForLoadState('networkidle');

  await abrir(page, 'dashboard.html', '02-dashboard.png');
  await abrir(page, 'livros.html', '03-livros.png');
  await abrir(page, 'autores.html', '04-autores.png');
  await abrir(page, 'categorias.html', '05-categorias.png');
  await abrir(page, 'emprestimos.html', '06-emprestimos.png');
  await abrir(page, 'import_export.html', '07-importacao-exportacao-json.png');
  await abrir(page, 'logs.html', '08-logs-xml.png');
  await abrir(page, 'relatorio.html', '09-relatorio-pdf.png');

  await browser.close();
  console.log(`Screenshots gerados em ${outputDir}`);
}

main().catch((error) => {
  console.error('Nao foi possivel gerar screenshots automaticamente.');
  console.error(error.message);
  process.exit(1);
});
