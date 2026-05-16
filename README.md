# Biblioteca Geek Fullstack

![Node.js](https://img.shields.io/badge/Node.js-Express-339933)
![MySQL](https://img.shields.io/badge/MySQL-Relacional-4479A1)
![MongoDB](https://img.shields.io/badge/MongoDB-Logs-47A248)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3)
![JWT](https://img.shields.io/badge/JWT-Autenticação-000000)
![Chart.js](https://img.shields.io/badge/Chart.js-Gráficos-FF6384)
![jsPDF](https://img.shields.io/badge/jsPDF-Relatórios-red)

Sistema web full stack acadêmico para gestão de uma **Biblioteca Geek**, desenvolvido para a disciplina de **Programação para Internet**.

O projeto utiliza **Node.js + Express** no backend, **HTML5, CSS3, JavaScript puro e Bootstrap 5** no frontend, **MySQL** como banco relacional principal e **MongoDB** para registro de logs do sistema.

---

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Arquitetura do sistema](#arquitetura-do-sistema)
- [Screenshots](#screenshots)
- [DER](#der)
- [Pré-requisitos](#pré-requisitos)
- [Configuração do ambiente](#configuração-do-ambiente)
- [Como rodar do jeito fácil](#como-rodar-do-jeito-fácil)
- [Como rodar manualmente](#como-rodar-manualmente)
- [Login de teste](#login-de-teste)
- [MySQL com XAMPP](#mysql-com-xampp)
- [MongoDB e logs](#mongodb-e-logs)
- [JSON](#json)
- [Relatório PDF](#relatório-pdf)
- [Upload de imagens](#upload-de-imagens)
- [Erros comuns](#erros-comuns)
- [Documentação](#documentação)
- [GitHub Pages](#github-pages)
- [Checklist resumido](#checklist-resumido)
- [GitHub e vídeo](#github-e-vídeo)

---

## Sobre o projeto

O tema escolhido foi **Sistema Biblioteca Geek**.

A aplicação permite autenticar usuários, cadastrar autores, categorias, livros com capa, empréstimos com itens, pesquisar livros, importar e exportar dados em JSON, registrar logs no MongoDB, exportar logs em XML, gerar relatório PDF no frontend e visualizar gráficos com Chart.js.

O sistema foi desenvolvido seguindo a organização trabalhada em aula:

```text
View → Router → Middleware → Controller → Service → DAO → Model → Banco de Dados
```

---

## Funcionalidades

- Login com autenticação JWT.
- CRUD de autores.
- CRUD de categorias.
- CRUD de livros.
- Cadastro de empréstimos com itens.
- Pesquisa de livros por título.
- Upload de imagem da capa dos livros.
- Dashboard com cards e gráfico.
- Registro de logs no MongoDB.
- Exportação de logs em XML.
- Importação e exportação de dados em JSON.
- Relatório PDF gerado no frontend.
- Documentação do projeto.
- DER do banco de dados.
- Scripts SQL para criação e povoamento do banco.

---

## Tecnologias utilizadas

- Node.js
- Express
- CommonJS com `require` e `module.exports`
- MySQL
- `mysql2/promise`
- MongoDB
- Driver oficial `mongodb`
- JWT com `jsonwebtoken`
- Senhas com `bcryptjs`
- Upload com `multer`
- HTML5
- CSS3
- JavaScript puro
- Bootstrap 5 via CDN
- Chart.js
- jsPDF
- jsPDF AutoTable
- Prettier

---

## Arquitetura do sistema

O projeto segue a separação em camadas vista nas aulas:

| Camada | Função |
|---|---|
| View | Telas HTML, CSS e JavaScript que o usuário utiliza |
| Router | Define as rotas da API e direciona para os controllers |
| Middleware | Faz autenticação, validação, logs, upload e tratamento de erros |
| Controller | Recebe a requisição e chama os services |
| Service | Concentra as regras de negócio |
| DAO | Faz o acesso ao banco de dados |
| Model | Representa as entidades do sistema |
| Banco de Dados | MySQL para dados principais e MongoDB para logs |

Estrutura principal:

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

---

## Screenshots

> Os prints abaixo estão na pasta `docs/assets/screenshots/estado-atual/`.

### Dashboard

![Dashboard](docs/assets/screenshots/estado-atual/01-dashboard-atual.png)

### Livros

![Tela de livros](docs/assets/screenshots/estado-atual/02-livros-atual.png)

### Empréstimos

![Tela de empréstimos](docs/assets/screenshots/estado-atual/03-emprestimos-atual.png)

### Importação e exportação JSON

![Tela de importação e exportação JSON](docs/assets/screenshots/estado-atual/04-json-atual.png)

### Logs XML

![Tela de exportação de logs XML](docs/assets/screenshots/estado-atual/05-logs-xml-atual.png)

### Relatório

![Tela de relatório](docs/assets/screenshots/estado-atual/06-relatorio-atual.png)

### MongoDB Compass

![MongoDB Compass com logs](docs/assets/screenshots/estado-atual/07-mongodb-compass-atual.png)

### XML exportado

![XML exportado](docs/assets/screenshots/estado-atual/08-xml-baixado-atual.png)

### PDF exportado

![PDF exportado](docs/assets/screenshots/estado-atual/09-pdf-baixado-atual.png)

---

## DER

O projeto possui um banco relacional em MySQL com tabelas relacionadas.

![DER do sistema](docs/DER.png)

Também é possível visualizar a versão em Markdown/Mermaid:

[Ver DER em Markdown](docs/DER.md)

Relacionamentos principais:

- Usuário 1:N Empréstimos.
- Autor 1:N Livros.
- Categoria 1:N Livros.
- Empréstimos N:N Livros por meio da tabela `itens_emprestimo`.

---

## Pré-requisitos

- Node.js instalado.
- XAMPP instalado para utilizar o MySQL.
- MongoDB instalado separadamente.
- MongoDB Compass instalado para visualizar os logs.
- Git instalado.

Importante: o **MongoDB não vem no XAMPP**. O XAMPP será usado apenas para o MySQL.

---

## Configuração do ambiente

Crie o arquivo `.env` a partir do exemplo:

```powershell
Copy-Item .env.example .env
```

Configuração padrão para XAMPP + MySQL:

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

---

## Como rodar do jeito fácil

1. Abra o **XAMPP Control Panel**.
2. Clique em **Start** no MySQL.
3. Execute o arquivo:

```text
scripts/windows/iniciar_tudo.bat
```

4. Aguarde o MongoDB iniciar.
5. Aguarde o sistema Node.js iniciar.
6. O navegador deverá abrir automaticamente em:

```text
http://localhost:3000
```

7. Faça login com:

```text
email: admin@admin.com
senha: 123456
```

---

## Como rodar manualmente

### 1. Iniciar o MySQL

Abra o XAMPP e clique em **Start** no MySQL.

### 2. Iniciar o MongoDB

No terminal, rode:

```powershell
"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath C:\data\db
```

Deixe essa janela aberta durante a execução do sistema.

### 3. Instalar dependências

Na pasta do projeto:

```powershell
npm install
```

### 4. Rodar o sistema

```powershell
npm start
```

Acesse:

```text
http://localhost:3000
```

---

## MySQL com XAMPP

### Rodar MySQL

1. Abra o XAMPP Control Panel.
2. Clique em **Start** no MySQL.
3. Confirme que a porta é `3306`.
4. Acesse:

```text
http://localhost/phpmyadmin
```

---

## Importar banco pelo terminal

Na pasta do projeto:

```powershell
mysql -u root -p < database/schema.sql
mysql -u root -p biblioteca_geek < database/inserts.sql
```

Se o usuário `root` estiver sem senha no XAMPP, pressione Enter quando pedir a senha.

---

## Importar banco pelo phpMyAdmin

1. Acesse:

```text
http://localhost/phpmyadmin
```

2. Clique em **Importar**.
3. Escolha o arquivo:

```text
database/schema.sql
```

4. Execute.
5. Selecione o banco:

```text
biblioteca_geek
```

6. Clique novamente em **Importar**.
7. Escolha o arquivo:

```text
database/inserts.sql
```

8. Execute.

---

## MongoDB e logs

O MongoDB é usado para armazenar logs do sistema.

Banco utilizado:

```text
biblioteca_geek_logs
```

Collection utilizada:

```text
logs
```

Conexão no MongoDB Compass:

```text
mongodb://127.0.0.1:27017
```

Eventos registrados:

- Login com sucesso.
- Tentativa de login com erro.
- Acesso a rotas.
- Cadastro de registros.
- Alteração de registros.
- Exclusão de registros.
- Erros do sistema.

Para testar a conexão com MongoDB:

```powershell
npm run check:mongo
```

---

## Login de teste

```text
email: admin@admin.com
senha: 123456
```

---

## JSON

A tela **JSON** permite exportar e importar dados.

Entidades disponíveis:

- Autores
- Categorias
- Livros
- Empréstimos

### Exemplo de JSON para autores

```json
[
  {
    "nome": "Neil Gaiman",
    "nacionalidade": "Britânica"
  }
]
```

### Exemplo de JSON para categorias

```json
[
  {
    "nome": "Cyberpunk"
  }
]
```

### Exemplo de JSON para livros

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

---

## Relatório PDF

A tela **Relatório** permite gerar um PDF com os livros cadastrados.

O relatório é gerado no frontend utilizando:

- jsPDF
- jsPDF AutoTable

O PDF contém:

- Título.
- Data e hora de geração.
- Usuário logado.
- Filtro aplicado.
- Tabela de livros.
- Total de livros cadastrados.
- Rodapé do sistema.

---

## Upload de imagens

Na tela de livros, é possível enviar uma imagem de capa.

Formatos aceitos:

```text
PNG, JPG, JPEG e WEBP
```

Tamanho máximo:

```text
2 MB
```

---

## Erros comuns

### Porta 3000 ocupada

Se aparecer erro de porta ocupada, o sistema provavelmente já está rodando.

Para verificar:

```powershell
netstat -ano | findstr :3000
```

Para encerrar o processo:

```powershell
taskkill /PID NUMERO_DO_PID /F
```

Também é possível usar:

```text
scripts/windows/parar_porta_3000.bat
```

### MongoDB desligado

Se o dashboard não mostrar logs ou a exportação XML falhar, verifique se o MongoDB está rodando.

Rode:

```powershell
npm run check:mongo
```

### MySQL desligado

Se o login não funcionar ou o sistema não carregar dados, confira se o MySQL está iniciado no XAMPP.

### Banco não importado

Se o login falhar, importe novamente:

```text
database/schema.sql
database/inserts.sql
```

### Upload recusado

Use apenas arquivos:

```text
PNG, JPG, JPEG ou WEBP até 2 MB
```

---

## Documentação

- Checklist completo: [docs/CHECKLIST.md](docs/CHECKLIST.md)
- Endpoints: [docs/ENDPOINTS.md](docs/ENDPOINTS.md)
- Testes API: [docs/TESTES_API.md](docs/TESTES_API.md)
- Roteiro do vídeo: [docs/ROTEIRO_VIDEO.md](docs/ROTEIRO_VIDEO.md)
- Guia XAMPP + MongoDB: [docs/COMO_RODAR_XAMPP_MONGODB.md](docs/COMO_RODAR_XAMPP_MONGODB.md)
- DER: [docs/DER.md](docs/DER.md)
- Documentação completa: [docs/DOCUMENTACAO_COMPLETA.md](docs/DOCUMENTACAO_COMPLETA.md)
- PDF da documentação: [docs/DOCUMENTACAO_COMPLETA.pdf](docs/DOCUMENTACAO_COMPLETA.pdf)

---

## GitHub Pages

O GitHub Pages pode ser usado como página estática de apresentação do projeto.

Importante: o GitHub Pages **não roda Node.js, Express, MySQL ou MongoDB**. Ele serve apenas para mostrar uma apresentação visual do projeto.

Para ativar:

```text
Settings > Pages > Deploy from a branch > main > /docs
```

URL esperada:

```text
https://soturine.github.io/biblioteca-geek-fullstack/
```

---

## Checklist resumido

| Requisito | Status |
|---|---|
| Login com JWT | Implementado |
| Rotas públicas e privadas | Implementado |
| Middleware de autenticação | Implementado |
| Middleware de logs | Implementado |
| Middleware de erro | Implementado |
| Middleware de validação | Implementado |
| MVC + Service Layer | Implementado |
| Router separado por recurso | Implementado |
| Controller separado | Implementado |
| Service com regra de negócio | Implementado |
| DAO com acesso ao banco | Implementado |
| Model com validações | Implementado |
| MySQL com tabelas relacionadas | Implementado |
| Relacionamento 1:N | Implementado |
| Relacionamento N:N | Implementado |
| MongoDB para logs | Implementado |
| Exportação XML | Implementado |
| Importação/exportação JSON | Implementado |
| Relatório PDF | Implementado |
| Gráfico com Chart.js | Implementado |
| Upload de imagens | Implementado |
| Documentação | Implementado |
| DER | Implementado |
| Scripts SQL | Implementado |
| Screenshots no README | Implementado |

---

## GitHub e vídeo

Repositório:

```text
https://github.com/Soturine/biblioteca-geek-fullstack
```

Link futuro do vídeo:

```text
Adicionar aqui.
```

---

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
