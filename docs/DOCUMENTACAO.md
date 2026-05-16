# Documentacao - Biblioteca Geek

## Tema

O Sistema Biblioteca Geek controla autores, categorias, livros com capa, emprestimos e itens de emprestimo. A proposta e manter um projeto academico simples, mas completo, com backend em Node.js/Express, banco principal MySQL, logs em MongoDB e frontend em HTML, CSS, JavaScript puro e Bootstrap 5.

## Regras de negocio

- Livro nao pode ter titulo vazio.
- Autor precisa ter nome com pelo menos 3 caracteres.
- Categoria nao pode ser duplicada.
- Emprestimo precisa ter ao menos um item.
- Quantidade emprestada nao pode ser maior que a quantidade disponivel.
- Ao criar emprestimo, a quantidade do livro diminui.
- Ao excluir emprestimo, a quantidade dos livros e devolvida.
- Usuario nao pode ter email duplicado.
- Senha deve ter no minimo 6 caracteres.

## Arquitetura

O backend segue MVC com Service Layer:

- Router: define as rotas de cada recurso e chama o Controller.
- Controller: recebe requisicao, chama Service, devolve JSON e encaminha erros com `next(error)`.
- Service: concentra regras de negocio e validacoes de fluxo.
- DAO: concentra acesso ao banco MySQL ou MongoDB.
- Model: possui validacoes simples e representa os dados principais.
- Middleware: autentica JWT, registra logs, valida dados e trata erros globais.

## Interfaces

Como JavaScript nao possui interface nativa, foram criadas classes de contrato:

- `IDAO`: `create`, `findAll`, `findById`, `update`, `delete`.
- `IController`: `index`, `show`, `store`, `update`, `destroy`.
- `IService`: `create`, `findAll`, `findById`, `update`, `delete`.

As classes principais estendem esses contratos, por exemplo `LivroDAO extends IDAO`, `LivroController extends IController` e `LivroService extends IService`.

## Services

- `AuthService`: login, registro, bcrypt e JWT.
- `UsuarioService`: regra de email duplicado e senha minima.
- `AutorService`: valida autor.
- `CategoriaService`: valida categoria duplicada.
- `LivroService`: valida livro e relacionamentos com autor/categoria.
- `EmprestimoService`: valida itens, usuario e estoque.
- `LogService`: registra logs e exporta XML.
- `JsonService`: importa/exporta dados JSON.
- `RelatorioService`: gera dados de relatorio e grafico.

## MySQL

Banco: `biblioteca_geek`.

Tabelas:

- `usuarios`
- `autores`
- `categorias`
- `livros`
- `emprestimos`
- `itens_emprestimo`

Relacionamentos:

- Autor 1:N Livros.
- Categoria 1:N Livros.
- Usuario 1:N Emprestimos.
- Emprestimos N:N Livros por `itens_emprestimo`.

Os scripts estao em `database/schema.sql` e `database/inserts.sql`.

## MongoDB

Banco: `biblioteca_geek_logs`.

Collection: `logs`.

Campos principais:

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
  "tempo_resposta": 15
}
```

## XML

O endpoint `/api/v1/logs/exportar/xml` busca logs no MongoDB, aplica filtros opcionais por usuario e periodo, e gera XML seguro usando escape de caracteres especiais.

## Relatorio PDF

O backend entrega dados em JSON pelo endpoint `/api/v1/relatorios/livros`. O frontend gera o PDF com jsPDF e jsPDF AutoTable, contendo titulo, data, usuario, tabela, total e rodape.

## Grafico

O dashboard usa Chart.js. Os dados chegam de `/api/v1/graficos/livros-por-categoria`, calculados no MySQL por categoria.

## Endpoints

A lista completa esta em `docs/ENDPOINTS.md`.
