# Biblioteca Geek Fullstack

![Node.js](https://img.shields.io/badge/Node.js-Express-339933)
![MySQL](https://img.shields.io/badge/MySQL-XAMPP-4479A1)
![MongoDB](https://img.shields.io/badge/MongoDB-Logs-47A248)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3)
![JWT](https://img.shields.io/badge/JWT-Autenticação-000000)
![Chart.js](https://img.shields.io/badge/Chart.js-Gráficos-FF6384)
![jsPDF](https://img.shields.io/badge/jsPDF-Relatórios-red)
![Licença MIT](https://img.shields.io/badge/Licença-MIT-green)

Sistema web full stack acadêmico para gestão de Biblioteca Geek com Node.js, Express, MySQL, MongoDB, JWT, MVC, Service Layer, Router e Middleware.

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Arquitetura usada](#arquitetura-usada)
- [Demonstração rápida](#demonstração-rápida)
- [Screenshots](#screenshots)
- [DER](#der)
- [Pré-requisitos](#pré-requisitos)
- [Como rodar](#como-rodar)
- [MongoDB e logs](#mongodb-e-logs)
- [Relatório PDF](#relatório-pdf)
- [JSON](#json)
- [Upload de imagens](#upload-de-imagens)
- [Documentação](#documentação)
- [GitHub Pages](#github-pages)
- [Release](#release)
- [Licença](#licença)
- [Checklist resumido](#checklist-resumido)

## Sobre o projeto

O **Sistema Biblioteca Geek** controla livros de uma biblioteca com tema geek/nerd. O sistema separa o perfil **admin**, que gerencia cadastros e relatórios, do perfil **leitor**, que acessa o catálogo, detalhes dos livros, recomendações e reservas próprias.

O projeto também possui pesquisa, importação/exportação JSON, logs em MongoDB, exportação XML, relatório PDF no frontend e gráfico com Chart.js. A tela de livros funciona como catálogo para leitores e como CRUD administrativo para admins.

## Funcionalidades

- Login, cadastro e logout com JWT.
- Rotas públicas, privadas e administrativas com bloqueio por perfil.
- Perfil `admin` com acesso a Dashboard, CRUDs, JSON, Logs XML, Relatório e Reservas.
- Perfil `leitor` com acesso ao Catálogo, Top 10, Recomendações e Minhas Reservas.
- CRUD de autores, categorias, livros e empréstimos.
- Pesquisa de livros por título.
- Filtro de catálogo por categoria.
- Upload e exibição de capa dos livros.
- Modal de detalhes do livro.
- Atalho para cadastrar categoria pela tela de livros.
- Reservas de livros com status `liberada`, `aguardando`, `cancelada`, `retirada` e `expirada`.
- Top 10 de livros mais emprestados e recomendações por histórico do usuário.
- Banco inicial com 30 livros famosos da cultura geek.
- Capas demonstrativas locais em SVG.
- Importação e exportação JSON.
- Logs no MongoDB para requisições, erros e ações de negócio.
- Exportação XML dos logs com filtros por usuário, período e tipo.
- Relatório PDF com jsPDF e AutoTable.
- Dashboard com cards, últimos logs e gráfico Chart.js.
- Documentação, DER, roteiro de vídeo, screenshots, licença MIT e release final.

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
- Prettier e PDFKit para apoio à documentação.

## Arquitetura usada

O projeto segue o fluxo:

```text
View -> Router -> Middleware -> Controller -> Service -> DAO -> Model -> Banco de Dados
```

- **View**: telas HTML em `public/`.
- **Router**: classes em `src/router/`, separadas por recurso.
- **Middleware**: autenticação, logs, validação, upload e erros globais.
- **Autorização por perfil**: bloqueia rotas administrativas para leitores e registra tentativa negada.
- **Controller**: recebe requisição, chama o service e retorna JSON padronizado.
- **Service**: concentra regras de negócio.
- **DAO**: concentra SQL/MySQL ou acesso ao MongoDB.
- **Model**: validações simples dos dados.
- **Interfaces/contratos**: `IDAO`, `IController` e `IService`.

## Demonstração rápida

<img src="docs/assets/gifs/demo-biblioteca-geek.gif" width="760" alt="Demonstração do sistema Biblioteca Geek">

## Screenshots

### Login

<img src="docs/assets/screenshots/01-login.png" width="760" alt="Tela de login">

### Dashboard

<img src="docs/assets/screenshots/02-dashboard.png" width="760" alt="Dashboard">

### Livros

<img src="docs/assets/screenshots/03-livros.png" width="760" alt="Tela de livros">

### Detalhes do livro

<img src="docs/assets/screenshots/04-detalhes-livro.png" width="760" alt="Modal de detalhes do livro">

### Catálogo do leitor

<img src="docs/assets/screenshots/11-catalogo-leitor.png" width="760" alt="Catálogo do leitor com recomendações">

### Minhas reservas

<img src="docs/assets/screenshots/12-minhas-reservas.png" width="760" alt="Reservas do leitor">

### Reservas do administrador

<img src="docs/assets/screenshots/13-reservas-admin.png" width="760" alt="Reservas vistas pelo administrador">

### Autores

<img src="docs/assets/screenshots/05-autores.png" width="760" alt="Tela de autores">

### Categorias

<img src="docs/assets/screenshots/06-categorias.png" width="760" alt="Tela de categorias">

### Empréstimos

<img src="docs/assets/screenshots/07-emprestimos.png" width="760" alt="Tela de empréstimos">

### JSON

<img src="docs/assets/screenshots/08-json.png" width="760" alt="Importação e exportação JSON">

### Logs XML

<img src="docs/assets/screenshots/09-logs-xml.png" width="760" alt="Logs XML">

### Relatório PDF

<img src="docs/assets/screenshots/10-relatorio-pdf.png" width="760" alt="Relatório PDF">

## DER

O DER representa as tabelas principais do MySQL e seus relacionamentos 1:N e N:N.

<img src="docs/DER.png" width="900" alt="DER do sistema Biblioteca Geek">

[Ver DER em Markdown](docs/DER.md)

Relacionamentos principais:

- Usuário 1:N Empréstimos.
- Autor 1:N Livros.
- Categoria 1:N Livros.
- Empréstimos N:N Livros por `itens_emprestimo`.
- Usuário 1:N Reservas.
- Livro 1:N Reservas.

## Pré-requisitos

- Node.js instalado.
- XAMPP com MySQL na porta `3306`.
- MongoDB Community Server instalado.
- Navegador atualizado.
- Git, se quiser versionar ou publicar o projeto.

## Como rodar

1. Abra o XAMPP Control Panel.
2. Inicie o MySQL.
3. Inicie o MongoDB em outra janela:

```text
"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath C:\data\db
```

4. Crie o arquivo `.env` a partir de `.env.example`.
5. Importe o banco pelo terminal ou pelo phpMyAdmin:

```text
mysql -u root -p < database/schema.sql
mysql -u root -p biblioteca_geek < database/inserts.sql
```

Se o banco já existia antes desta versão, aplique também as migrations em `database/migrations/`.

6. Instale as dependências e inicie o sistema:

```text
npm install
npm start
```

7. Acesse:

```text
http://localhost:3000
```

Login de teste:

```text
email: admin@admin.com
senha: 123456
```

Para testar o perfil leitor, use a aba **Cadastro** na tela de login. Novos usuários são criados como `leitor`.

## MongoDB e logs

O XAMPP só liga o MySQL. O MongoDB não vem no XAMPP e precisa ficar aberto durante a apresentação.

- URI: `mongodb://127.0.0.1:27017`
- Banco: `biblioteca_geek_logs`
- Collection: `logs`

Para conferir pelo terminal:

```text
npm run check:mongo
```

Para conferir no MongoDB Compass, conecte em `mongodb://127.0.0.1:27017` e abra `biblioteca_geek_logs.logs`.

O logger registra documentos do tipo `REQUEST`, `BUSINESS` e `ERROR`. A exportação XML fica na tela **Logs XML** e aceita filtros por usuário, período e tipo.

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

## GitHub Pages

Página estática de apresentação:

```text
https://soturine.github.io/biblioteca-geek-fullstack/
```

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

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE).

## Checklist resumido

- Login JWT: implementado.
- CRUD: autores, categorias, livros e empréstimos.
- Pesquisa: livros por título.
- MySQL: 7 tabelas relacionadas, incluindo `reservas`.
- Perfis: admin e leitor com permissões diferentes.
- Catálogo: Top 10, recomendações e reserva para leitor.
- MongoDB: logs do sistema por requisição, erro e ação de negócio.
- JSON: importação/exportação.
- XML: exportação de logs.
- PDF: relatório de livros no frontend.
- Gráfico: Chart.js no dashboard.
- Upload: capa dos livros.
- Modal de detalhes: implementado na tela de livros.
- Reservas: criadas e canceladas pelo leitor, acompanhadas pelo admin.
- DER: imagem PNG atualizada.
- Licença MIT: incluída.
- GitHub Pages: página estática em `docs/index.html`.
