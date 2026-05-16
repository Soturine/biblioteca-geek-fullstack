# Documentação - Biblioteca Geek

## Tema

O Sistema Biblioteca Geek controla autores, categorias, livros com capa, empréstimos e itens de empréstimo. A proposta é manter um projeto acadêmico simples, mas completo, com backend em Node.js/Express, banco principal MySQL, logs em MongoDB e frontend em HTML, CSS, JavaScript puro e Bootstrap 5.

## Regras de negócio

- Livro não pode ter título vazio.
- Autor precisa ter nome com pelo menos 3 caracteres.
- Categoria não pode ser duplicada.
- Empréstimo precisa ter ao menos um item.
- Quantidade emprestada não pode ser maior que a quantidade disponível.
- Ao criar empréstimo, a quantidade do livro diminui.
- Ao excluir empréstimo, a quantidade dos livros é devolvida.
- Usuário não pode ter e-mail duplicado.
- Senha deve ter no mínimo 6 caracteres.

## Arquitetura

O backend segue MVC com Service Layer:

- Router: define as rotas de cada recurso e chama o Controller.
- Controller: recebe requisição, chama Service, devolve JSON e encaminha erros com `next(error)`.
- Service: concentra regras de negócio e validações de fluxo.
- DAO: concentra acesso ao banco MySQL ou MongoDB.
- Model: possui validações simples e representa os dados principais.
- Middleware: autentica JWT, registra logs, valida dados e trata erros globais.

## Interfaces

Como JavaScript não possui interface nativa, foram criadas classes de contrato:

- `IDAO`: `create`, `findAll`, `findById`, `update`, `delete`.
- `IController`: `index`, `show`, `store`, `update`, `destroy`.
- `IService`: `create`, `findAll`, `findById`, `update`, `delete`.

As classes principais estendem esses contratos, por exemplo `LivroDAO extends IDAO`, `LivroController extends IController` e `LivroService extends IService`.

## Services

- `AuthService`: login, registro, bcrypt e JWT.
- `UsuarioService`: regra de e-mail duplicado e senha mínima.
- `AutorService`: valida autor.
- `CategoriaService`: valida categoria duplicada.
- `LivroService`: valida livro e relacionamentos com autor/categoria.
- `EmprestimoService`: valida itens, usuario e estoque.
- `LogService`: registra logs e exporta XML.
- `JsonService`: importa/exporta dados JSON.
- `RelatorioService`: gera dados de relatório e gráfico.

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
- Usuário 1:N Empréstimos.
- Empréstimos N:N Livros por `itens_emprestimo`.

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

## Relatório PDF

O backend entrega dados em JSON pelo endpoint `/api/v1/relatorios/livros`. O frontend gera o PDF com jsPDF e jsPDF AutoTable, contendo título, data, usuário, tabela, total e rodapé.

## Gráfico

O dashboard usa Chart.js. Os dados chegam de `/api/v1/graficos/livros-por-categoria`, calculados no MySQL por categoria.

## Capas demonstrativas

Os dados iniciais em `database/inserts.sql` apontam para capas SVG autorais em `public/uploads/capas-demo/`. Essas capas são locais, simples e feitas apenas para apresentação acadêmica.

## Screenshots

Os screenshots principais ficam em `docs/assets/screenshots/`. As evidências coletadas antes das melhorias finais estão em `docs/assets/screenshots/estado-atual/`.

## Endpoints

A lista completa esta em `docs/ENDPOINTS.md`.
