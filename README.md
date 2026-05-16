# Biblioteca Geek Fullstack

![Node.js](https://img.shields.io/badge/Node.js-Express-339933)
![MySQL](https://img.shields.io/badge/MySQL-Relacional-4479A1)
![MongoDB](https://img.shields.io/badge/MongoDB-Logs-47A248)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3)

Sistema web full stack academico para gestao de uma Biblioteca Geek, desenvolvido para a disciplina de Programacao para Internet. O projeto usa Node.js + Express no backend, HTML5/CSS3/JavaScript puro com Bootstrap 5 no frontend, MySQL como banco relacional principal e MongoDB apenas para logs do sistema.

## Tema e objetivo

O tema escolhido foi **Sistema Biblioteca Geek**. A aplicacao permite autenticar usuarios, cadastrar autores, categorias, livros com capa, emprestimos com itens, pesquisar livros, importar/exportar JSON, registrar logs no MongoDB, exportar logs em XML, gerar relatorio PDF no frontend e visualizar grafico com Chart.js.

## Tecnologias

- Node.js + Express
- CommonJS com `require` e `module.exports`
- MySQL com `mysql2/promise`
- MongoDB com driver oficial `mongodb`
- JWT com `jsonwebtoken`
- Senhas com `bcryptjs`
- Upload com `multer`
- HTML5, CSS3, JavaScript puro e Bootstrap 5 via CDN
- Chart.js
- jsPDF + jsPDF AutoTable via CDN
- Prettier para formatacao

## Estrutura de pastas

```text
biblioteca-geek-fullstack/
  src/
    app.js
    server.js
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
    schema.sql
    inserts.sql
    der.md
  docs/
  scripts/
```

## Pre-requisitos

- Node.js instalado.
- XAMPP instalado para usar MySQL.
- MongoDB instalado separadamente, pois MongoDB nao vem no XAMPP.
- Git instalado.

## Configurar `.env`

Crie o arquivo `.env` a partir do exemplo:

```powershell
Copy-Item .env.example .env
```

Configuracao padrao para XAMPP MySQL:

```env
PORT=3000
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=biblioteca_geek
MONGO_URI=mongodb://127.0.0.1:27017
MONGO_DATABASE=biblioteca_geek_logs
JWT_SECRET=troque_este_segredo_biblioteca_geek
JWT_EXPIRES_IN=2h
UPLOAD_DIR=public/uploads
```

## Rodar MySQL com XAMPP

1. Abra o XAMPP Control Panel.
2. Clique em **Start** no MySQL.
3. Confirme que a porta e `3306`.
4. Acesse `http://localhost/phpmyadmin` para conferir o MySQL.

## Importar banco pelo terminal

Na pasta do projeto:

```powershell
mysql -u root -p < database/schema.sql
mysql -u root -p biblioteca_geek < database/inserts.sql
```

Se o root estiver sem senha no XAMPP, pressione Enter quando pedir a senha.

## Importar banco pelo phpMyAdmin

1. Acesse `http://localhost/phpmyadmin`.
2. Clique em **Importar**.
3. Escolha `database/schema.sql` e execute.
4. Selecione o banco `biblioteca_geek`.
5. Clique em **Importar** novamente.
6. Escolha `database/inserts.sql` e execute.

## Rodar MongoDB

MongoDB deve estar ligado durante a apresentacao, porque os logs sao requisito obrigatorio.

Opcoes no Windows:

- Pelo **Windows Services**, procure `MongoDB Server` e clique em iniciar.
- Pelo terminal, se o comando estiver no PATH:

```powershell
mongod
```

O banco `biblioteca_geek_logs` e a collection `logs` aparecem quando o primeiro log for salvo. Para conferir, abra o MongoDB Compass e conecte em:

```text
mongodb://127.0.0.1:27017
```

## Instalar e iniciar o projeto

```powershell
npm install
npm run format
npm run check:js
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

## Como testar as principais funcoes

- Login: entre em `login.html` com o usuario admin.
- Dashboard: veja cards de totais, ultimos logs e grafico.
- CRUD de livros: acesse **Livros**, cadastre, edite, pesquise e exclua.
- Upload de imagem: no formulario de livro, selecione PNG/JPG/JPEG/WEBP ate 2 MB.
- Exportar JSON: acesse **JSON**, escolha entidade e clique em exportar.
- Importar JSON: acesse **JSON**, escolha autores/categorias/livros e envie arquivo `.json`.
- Exportar XML: acesse **Logs XML**, filtre se quiser e baixe o arquivo.
- Relatorio PDF: acesse **Relatorio**, filtre por categoria e clique em gerar PDF.
- Grafico: acesse **Dashboard** para ver dados do endpoint `/api/v1/graficos/livros-por-categoria`.

## Exemplos de JSON para importacao

Autores:

```json
[{ "nome": "Neil Gaiman", "nacionalidade": "Britanica" }]
```

Categorias:

```json
[{ "nome": "Cyberpunk" }]
```

Livros:

```json
[
  {
    "titulo": "Neuromancer",
    "ano": 1984,
    "quantidade": 2,
    "id_autor": 1,
    "id_categoria": 2
  }
]
```

## Erros comuns e solucoes

- **Erro de conexao MySQL**: confira se o XAMPP MySQL esta iniciado na porta 3306 e se o `.env` usa `root` sem senha.
- **Login nao funciona**: importe `schema.sql` e depois `inserts.sql`.
- **Dashboard sem logs**: ligue o MongoDB antes de apresentar.
- **Upload recusado**: use apenas PNG, JPG, JPEG ou WEBP ate 2 MB.
- **Porta 3000 ocupada**: altere `PORT` no `.env`.

## Documentacao

- Checklist completo: `docs/CHECKLIST.md`
- Endpoints: `docs/ENDPOINTS.md`
- Testes API: `docs/TESTES_API.md`
- Roteiro do video: `docs/ROTEIRO_VIDEO.md`
- Guia XAMPP + MongoDB: `docs/COMO_RODAR_XAMPP_MONGODB.md`
- DER: `docs/DER.md`
- Documentacao completa: `docs/DOCUMENTACAO_COMPLETA.md` e `docs/DOCUMENTACAO_COMPLETA.pdf`

## DER em imagem

O arquivo `docs/DER.png` foi gerado como imagem simples do relacionamento. O arquivo `docs/DER.md` possui Mermaid. Se quiser exportar uma imagem mais bonita, abra o Mermaid em um visualizador compativel e exporte para PNG.

## GitHub e video

- GitHub: https://github.com/Soturine/biblioteca-geek-fullstack
- Link futuro do video: adicionar aqui.

## Checklist resumido

- Login JWT: implementado.
- CRUD: autores, categorias, livros e emprestimos.
- Pesquisa: livros por titulo.
- MySQL: 6 tabelas relacionadas.
- MongoDB: logs do sistema.
- JSON: importacao/exportacao.
- XML: exportacao de logs.
- PDF: relatorio de livros no frontend.
- Grafico: Chart.js no dashboard.
- Upload: capa dos livros.
- Documentacao e scripts SQL: incluidos.
