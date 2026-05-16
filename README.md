# Biblioteca Geek Full Stack

Sistema academico de Programacao para Internet para controlar uma biblioteca geek/nerd com autores, categorias, livros, capas, emprestimos, importacao/exportacao JSON, logs em MongoDB, XML, relatorio PDF e grafico.

## Tecnologias

- Node.js + Express
- CommonJS
- MySQL com `mysql2/promise`
- MongoDB com driver oficial `mongodb`
- JWT com `jsonwebtoken`
- Senhas com `bcryptjs`
- Upload com `multer`
- HTML5, CSS3, JavaScript puro e Bootstrap 5 via CDN
- Chart.js
- jsPDF + jsPDF AutoTable via CDN

## Instalar

```bash
npm install
```

## Configurar ambiente

Copie `.env.example` para `.env` e ajuste usuario/senha do MySQL se necessario.

```bash
cp .env.example .env
```

No Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

## Criar bancos

MySQL:

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/inserts.sql
```

MongoDB:

O banco `biblioteca_geek_logs` e a collection `logs` sao criados automaticamente quando a aplicacao registra o primeiro log.

## Rodar

```bash
npm start
```

Acesse:

```text
http://localhost:3000
```

## Login de teste

```text
email: admin@admin.com
senha: 123456
```

## Video

Link futuro do video: adicionar aqui.

## Git

Comandos usados no projeto:

```bash
git init
git add .
git commit -m "versao inicial biblioteca geek fullstack"
```

Se precisar configurar remoto manualmente:

```bash
git remote add origin URL_DO_REPOSITORIO
git branch -M main
git push -u origin main
```

Se o GitHub CLI estiver autenticado:

```bash
gh repo create biblioteca-geek-fullstack --public --source=. --remote=origin --push
```

## Estrutura

```text
biblioteca-geek-fullstack/
  src/
    config/
    interfaces/
    model/
    dao/
    service/
    controller/
    router/
    middleware/
    utils/
  public/
    css/
    js/
    uploads/
  database/
  docs/
```
