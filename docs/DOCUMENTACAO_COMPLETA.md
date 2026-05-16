# Documentacao Completa - Biblioteca Geek Fullstack

## Tema escolhido e objetivo

O tema escolhido foi **Sistema Biblioteca Geek**. O objetivo e controlar uma biblioteca com autores, categorias, livros, capas, emprestimos e itens, usando uma arquitetura organizada no estilo MVC com Service Layer, Router e Middleware.

## Regras de negocio principais

- Usuario deve fazer login com JWT.
- Senha deve ter no minimo 6 caracteres.
- Email de usuario nao pode duplicar.
- Autor deve ter nome com pelo menos 3 caracteres.
- Categoria nao pode ser duplicada.
- Livro precisa ter titulo, ano, quantidade, autor e categoria.
- Emprestimo precisa ter nome do leitor e pelo menos um item.
- A quantidade emprestada nao pode ser maior que o estoque.
- Ao criar emprestimo, o estoque do livro diminui.
- Ao excluir emprestimo, o estoque e devolvido.
- Upload aceita apenas PNG, JPG, JPEG e WEBP ate 2 MB.

## Estrutura MVC implementada

O backend usa Node.js com Express e CommonJS. O fluxo principal e:

1. Router define URL e middleware.
2. Controller recebe a requisicao e retorna JSON.
3. Service aplica regra de negocio.
4. DAO acessa MySQL ou MongoDB.
5. Model faz validacoes simples.

## Interfaces IDAO, IController e IService

Como JavaScript nao tem interface nativa, foram criadas classes de contrato:

- `IDAO`: `create`, `findAll`, `findById`, `update`, `delete`.
- `IController`: `index`, `show`, `store`, `update`, `destroy`.
- `IService`: `create`, `findAll`, `findById`, `update`, `delete`.

## Classes que implementam cada interface

DAOs:

- `UsuarioDAO`
- `AutorDAO`
- `CategoriaDAO`
- `LivroDAO`
- `EmprestimoDAO`
- `LogDAO`

Controllers:

- `AuthController`
- `AutorController`
- `CategoriaController`
- `LivroController`
- `EmprestimoController`
- `JsonController`
- `LogController`
- `RelatorioController`
- `GraficoController`

Services:

- `AuthService`
- `UsuarioService`
- `AutorService`
- `CategoriaService`
- `LivroService`
- `EmprestimoService`
- `LogService`
- `JsonService`
- `RelatorioService`

## Explicacao dos Services

- `AuthService`: autentica usuario, compara senha com bcrypt e gera JWT.
- `UsuarioService`: cria usuarios e evita email duplicado.
- `AutorService`: valida autor e chama DAO.
- `CategoriaService`: evita categoria duplicada.
- `LivroService`: valida livro e existencia de autor/categoria.
- `EmprestimoService`: valida itens e estoque.
- `LogService`: salva logs no MongoDB e exporta XML.
- `JsonService`: importa/exporta JSON e trata duplicidades.
- `RelatorioService`: gera dados para relatorio e grafico.

## Banco MySQL

Banco principal: `biblioteca_geek`.

Tabelas:

- `usuarios`
- `autores`
- `categorias`
- `livros`
- `emprestimos`
- `itens_emprestimo`

## Tabelas e relacionamentos

- Usuario 1:N Emprestimos.
- Autor 1:N Livros.
- Categoria 1:N Livros.
- Emprestimo N:N Livros por `itens_emprestimo`.
- `itens_emprestimo` e a tabela intermediaria que guarda quantidade por livro.

## MongoDB e estrutura dos logs

Banco: `biblioteca_geek_logs`.

Collection: `logs`.

Campos:

```json
{
  "timestamp": "Date",
  "usuario": "admin@admin.com",
  "acao": "LOGIN",
  "tabela": "usuarios",
  "registro_id": 1,
  "detalhes": "Login realizado",
  "ip": "::1",
  "user_agent": "browser",
  "endpoint": "/api/v1/auth/login",
  "metodo": "POST",
  "status_code": 200,
  "tempo_resposta": 10
}
```

## Exportacao XML

O endpoint `/api/v1/logs/exportar/xml` busca logs no MongoDB e gera:

```xml
<logs>
  <evento id="1">
    <usuario>admin@admin.com</usuario>
    <acao>LOGIN</acao>
    <descricao>Login realizado</descricao>
    <data_hora>2026-05-15T10:00:00.000Z</data_hora>
    <tipo_evento>LOGIN</tipo_evento>
    <ip_origem>::1</ip_origem>
    <dados_vinculados>
      <tabela>usuarios</tabela>
      <registro_id>1</registro_id>
    </dados_vinculados>
  </evento>
</logs>
```

## Relatorio PDF

O backend retorna dados em JSON por `/api/v1/relatorios/livros`. O frontend gera o PDF com jsPDF e AutoTable, contendo:

- titulo
- data/hora
- usuario logado
- filtro por categoria
- tabela organizada
- total de livros
- total de exemplares
- rodape do sistema

## Grafico

O Dashboard usa Chart.js e consome `/api/v1/graficos/livros-por-categoria`, que consulta o MySQL e agrupa livros por categoria.

## Como executar

1. Iniciar MySQL no XAMPP.
2. Importar `database/schema.sql`.
3. Importar `database/inserts.sql`.
4. Iniciar MongoDB.
5. Criar `.env` baseado em `.env.example`.
6. Rodar:

```powershell
npm install
npm start
```

7. Acessar `http://localhost:3000`.

## Endpoints principais

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `POST /api/v1/auth/register`
- `GET /api/v1/autores`
- `POST /api/v1/autores`
- `GET /api/v1/categorias`
- `POST /api/v1/categorias`
- `GET /api/v1/livros`
- `GET /api/v1/livros?busca=texto`
- `POST /api/v1/livros`
- `POST /api/v1/livros/:id/imagem`
- `GET /api/v1/emprestimos`
- `POST /api/v1/emprestimos`
- `GET /api/v1/json/exportar/:entidade`
- `POST /api/v1/json/importar/:entidade`
- `GET /api/v1/logs/exportar/xml`
- `GET /api/v1/relatorios/livros`
- `GET /api/v1/graficos/livros-por-categoria`
