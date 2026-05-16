# Biblioteca Geek Fullstack

![Node.js](https://img.shields.io/badge/Node.js-Express-339933)
![MySQL](https://img.shields.io/badge/MySQL-XAMPP-4479A1)
![MongoDB](https://img.shields.io/badge/MongoDB-Logs-47A248)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3)
![JWT](https://img.shields.io/badge/JWT-Autenticação-000000)
![Chart.js](https://img.shields.io/badge/Chart.js-Gráficos-FF6384)
![jsPDF](https://img.shields.io/badge/jsPDF-Relatórios-red)

Sistema web full stack acadêmico para gestão de Biblioteca Geek com Node.js, Express, MySQL, MongoDB, JWT, MVC, Service Layer, Router e Middleware.

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Arquitetura usada](#arquitetura-usada)
- [DER](#der)
- [Screenshots](#screenshots)
- [Pré-requisitos](#pré-requisitos)
- [Configuração do ambiente](#configuração-do-ambiente)
- [Como rodar do jeito fácil](#como-rodar-do-jeito-fácil)
- [Como rodar manualmente](#como-rodar-manualmente)
- [MySQL com XAMPP](#mysql-com-xampp)
- [MongoDB e logs](#mongodb-e-logs)
- [Relatório PDF](#relatório-pdf)
- [JSON](#json)
- [Upload de imagens](#upload-de-imagens)
- [Documentação](#documentação)
- [GitHub Pages](#github-pages)
- [Release](#release)
- [Erros comuns](#erros-comuns)
- [About/Topics do GitHub](#abouttopics-do-github)
- [Checklist resumido](#checklist-resumido)

## Sobre o projeto

O **Sistema Biblioteca Geek** controla livros de uma biblioteca com tema geek/nerd. O usuário autenticado pode cadastrar autores, categorias, livros com imagem de capa, empréstimos e itens de empréstimo. O sistema também possui pesquisa, importação/exportação JSON, logs em MongoDB, exportação XML, relatório PDF no frontend e gráfico com Chart.js.

O projeto foi feito como uma aplicação acadêmica simples, mantendo a organização em camadas conforme o padrão visto em aula.

## Funcionalidades

- Login, cadastro e logout com JWT.
- Rotas públicas e privadas.
- CRUD de autores, categorias, livros e empréstimos.
- Pesquisa de livros por título.
- Upload e exibição de capa dos livros.
- Capas demonstrativas locais para os dados iniciais.
- Importação e exportação JSON.
- Logs no MongoDB para login, erro, acesso a rotas e operações de CRUD.
- Exportação XML dos logs.
- Relatório PDF com jsPDF e AutoTable.
- Dashboard com cards, últimos logs e gráfico Chart.js.
- Documentação, DER, roteiro de vídeo, screenshots e release final.

## Tecnologias utilizadas

- Node.js + Express.
- CommonJS com `require` e `module.exports`.
- MySQL com `mysql2/promise`.
- MongoDB com driver oficial `mongodb`.
- JWT com `jsonwebtoken`.
- Senhas com `bcryptjs`.
- Upload com `multer`.
- HTML5, CSS3, JavaScript puro e Bootstrap 5 via CDN.
- Chart.js.
- jsPDF + jsPDF AutoTable via CDN.
- Prettier, PDFKit e Playwright para apoio à documentação.

## Arquitetura usada

O projeto segue o fluxo:

```text
View → Router → Middleware → Controller → Service → DAO → Model → Banco de Dados
```

- **View**: telas HTML em `public/`.
- **Router**: classes em `src/router/`, separadas por recurso.
- **Middleware**: autenticação, logs, validação, upload e erros globais.
- **Controller**: recebe requisição, chama o service e retorna JSON padronizado.
- **Service**: concentra regras de negócio.
- **DAO**: concentra SQL/MySQL ou acesso ao MongoDB.
- **Model**: validações simples dos dados.
- **Interfaces/contratos**: `IDAO`, `IController` e `IService`.

## DER

![DER do sistema](docs/DER.png)

[Ver DER em Markdown](docs/DER.md)

Relacionamentos principais:

- Usuário 1:N Empréstimos.
- Autor 1:N Livros.
- Categoria 1:N Livros.
- Empréstimos N:N Livros por `itens_emprestimo`.

## Screenshots

### Login

![Tela de login](docs/assets/screenshots/01-login.png)

### Dashboard

![Dashboard com gráfico e logs](docs/assets/screenshots/02-dashboard.png)

### Livros

![Tela de livros](docs/assets/screenshots/03-livros.png)

### Autores

![Tela de autores](docs/assets/screenshots/04-autores.png)

### Categorias

![Tela de categorias](docs/assets/screenshots/05-categorias.png)

### Empréstimos

![Tela de empréstimos](docs/assets/screenshots/06-emprestimos.png)

### Importação e exportação JSON

![Tela de JSON](docs/assets/screenshots/07-importacao-exportacao-json.png)

### Logs XML

![Tela de exportação XML](docs/assets/screenshots/08-logs-xml.png)

### Relatório PDF

![Tela de relatório PDF](docs/assets/screenshots/09-relatorio-pdf.png)

### MongoDB Compass

O print do MongoDB Compass deve ser adicionado manualmente, se necessário, em `docs/assets/screenshots/10-mongodb-compass-logs.png`. Como evidência automatizada, o projeto também possui prints do estado atual em `docs/assets/screenshots/estado-atual/`.

## Pré-requisitos

- Node.js instalado.
- XAMPP com MySQL na porta `3306`.
- MongoDB Community Server instalado.
- Navegador atualizado.
- Git e GitHub CLI, se quiser publicar release pelo terminal.

## Configuração do ambiente

Crie o arquivo `.env` a partir do exemplo:

```powershell
Copy-Item .env.example .env
```

Configuração padrão para XAMPP + MySQL:

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=biblioteca_geek
MONGO_URI=mongodb://127.0.0.1:27017
MONGO_DATABASE=biblioteca_geek_logs
PORT=3000
JWT_SECRET=biblioteca_geek_seguro
JWT_EXPIRES_IN=2h
UPLOAD_DIR=public/uploads
```

## Como rodar do jeito fácil

1. Abra o XAMPP Control Panel.
2. Ligue o **MySQL**.
3. Dê dois cliques em:

```text
scripts/windows/iniciar_tudo.bat
```

4. Aguarde o MongoDB e o sistema Node.js abrirem em janelas separadas.
5. O navegador deve abrir em:

```text
http://localhost:3000
```

Login de teste:

```text
email: admin@admin.com
senha: 123456
```

## Como rodar manualmente

Crie o `.env`:

```powershell
Copy-Item .env.example .env
```

Ligue o MySQL no XAMPP e importe o banco:

```powershell
mysql -u root -p < database/schema.sql
mysql -u root -p biblioteca_geek < database/inserts.sql
```

Ou importe `schema.sql` e `inserts.sql` pelo phpMyAdmin.

Inicie o MongoDB:

```powershell
"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath C:\data\db
```

Instale e rode o sistema:

```powershell
npm install
npm start
```

Acesse:

```text
http://localhost:3000
```

## MySQL com XAMPP

Pelo terminal:

```powershell
mysql -u root -p < database/schema.sql
mysql -u root -p biblioteca_geek < database/inserts.sql
```

Se o usuário `root` estiver sem senha, pressione Enter quando pedir a senha.

Pelo phpMyAdmin:

1. Abra `http://localhost/phpmyadmin`.
2. Clique em **Importar**.
3. Importe `database/schema.sql`.
4. Depois importe `database/inserts.sql`.

## MongoDB e logs

O XAMPP só liga o MySQL. O MongoDB não vem no XAMPP e precisa ficar aberto durante a apresentação.

- URI: `mongodb://127.0.0.1:27017`
- Banco: `biblioteca_geek_logs`
- Collection: `logs`

Para conferir pelo terminal:

```powershell
npm run check:mongo
```

Para conferir no MongoDB Compass:

1. Abra o Compass.
2. Conecte em `mongodb://127.0.0.1:27017`.
3. Abra `biblioteca_geek_logs`.
4. Abra a collection `logs`.

A exportação XML fica na tela **Logs XML**.

## Relatório PDF

O endpoint `/api/v1/relatorios/livros` retorna os dados em JSON. O frontend gera o PDF com **jsPDF** e **jsPDF AutoTable**, incluindo usuário logado, data e hora, filtro por categoria, tabela, totais e rodapé.

## JSON

A tela **JSON** permite:

- Exportar autores, categorias, livros e empréstimos.
- Importar autores, categorias e livros.
- Validar estrutura.
- Ignorar duplicidades.
- Exibir quantidade de importados, duplicados e erros.

## Upload de imagens

O upload de capa aceita:

- PNG.
- JPG.
- JPEG.
- WEBP.
- Tamanho máximo de 2 MB.

Os livros iniciais usam capas demonstrativas locais em `public/uploads/capas-demo/`, sem depender de API externa.

## Documentação

- [Documentação completa em Markdown](docs/DOCUMENTACAO_COMPLETA.md)
- [Documentação completa em PDF](docs/DOCUMENTACAO_COMPLETA.pdf)
- [Checklist do trabalho](docs/CHECKLIST.md)
- [Endpoints da API](docs/ENDPOINTS.md)
- [Testes da API](docs/TESTES_API.md)
- [Como rodar com XAMPP e MongoDB](docs/COMO_RODAR_XAMPP_MONGODB.md)
- [Roteiro do vídeo](docs/ROTEIRO_VIDEO.md)
- [Orientações de screenshots](docs/SCREENSHOTS.md)

## GitHub Pages

Página estática de apresentação:

```text
https://soturine.github.io/biblioteca-geek-fullstack/
```

Para ativar:

1. Acesse o repositório no GitHub.
2. Vá em **Settings > Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Selecione branch `main` e pasta `/docs`.

Aviso: GitHub Pages não roda Node.js, Express, MySQL ou MongoDB. A página em `docs/` é apenas uma apresentação estática.

## Release

Release final:

```text
https://github.com/Soturine/biblioteca-geek-fullstack/releases/tag/v1.0.0
```

ZIP final:

```text
biblioteca-geek-fullstack-final.zip
```

## Erros comuns

- **Porta 3000 ocupada**: use `scripts/windows/parar_porta_3000.bat`.
- **MongoDB desligado**: inicie `scripts/windows/iniciar_mongodb.bat` ou rode o comando `mongod`.
- **MySQL desligado**: abra o XAMPP e clique em **Start** no MySQL.
- **Banco não importado**: importe `database/schema.sql` e depois `database/inserts.sql`.
- **Login falhando**: confirme se `inserts.sql` foi importado e use `admin@admin.com / 123456`.
- **Upload recusado**: use PNG, JPG, JPEG ou WEBP até 2 MB.

## About/Topics do GitHub

Description:

```text
Sistema web full stack acadêmico para gestão de Biblioteca Geek com Node.js, Express, MySQL, MongoDB, JWT, MVC, Service Layer, Router e Middleware.
```

Website:

```text
https://soturine.github.io/biblioteca-geek-fullstack/
```

Topics:

```text
nodejs, express, mysql, mongodb, jwt, bootstrap, chartjs, jspdf, fullstack, mvc, dao, service-layer, academic-project, programacao-para-internet
```

## Checklist resumido

- Login JWT: implementado.
- CRUD: autores, categorias, livros e empréstimos.
- Pesquisa: livros por título.
- MySQL: 6 tabelas relacionadas.
- MongoDB: logs do sistema.
- JSON: importação/exportação.
- XML: exportação de logs.
- PDF: relatório de livros no frontend.
- Gráfico: Chart.js no dashboard.
- Upload: capa dos livros.
- GitHub Pages: página estática em `docs/index.html`.
- Documentação, DER, screenshots, ZIP e release: incluídos.
