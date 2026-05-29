# Documentação - Biblioteca Geek

## Tema

O Sistema Biblioteca Geek controla autores, categorias, livros com capa, empréstimos, reservas e itens de empréstimo. A proposta é manter um projeto acadêmico simples, mas completo, com backend em Node.js/Express, banco principal MySQL, logs em MongoDB e frontend em HTML, CSS, JavaScript puro e Bootstrap 5.

## Regras de negócio

- Livro não pode ter título vazio.
- Livro pode ter páginas, editora, ISBN e sinopse.
- Páginas deve ser número maior ou igual a zero.
- Sinopse pode ser vazia, mas se preenchida deve ter pelo menos 10 caracteres.
- Autor precisa ter nome com pelo menos 3 caracteres.
- Categoria não pode ser duplicada.
- Empréstimo precisa ter ao menos um item.
- Quantidade emprestada não pode ser maior que a quantidade disponível.
- Ao criar empréstimo, a quantidade do livro diminui.
- Ao excluir empréstimo, a quantidade dos livros é devolvida.
- Usuário não pode ter e-mail duplicado.
- Senha deve ter no mínimo 6 caracteres.
- Perfil `admin` acessa as telas administrativas.
- Perfil `leitor` acessa apenas catálogo, detalhes, recomendações e reservas próprias.
- Reserva de livro disponível fica liberada; sem estoque, fica aguardando previsão.

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
- `ReservaService`: cria, lista e cancela reservas conforme disponibilidade e perfil.
- `LogService`: registra logs e exporta XML.
- `JsonService`: importa/exporta dados JSON.
- `RelatorioService`: gera dados de relatório e gráfico.

## MySQL

Banco: `biblioteca_geek`.

Tabelas:

- `usuarios`
- `autores`
- `categorias`
- `livros`: possui também `paginas`, `sinopse`, `editora` e `isbn`.
- `emprestimos`
- `itens_emprestimo`
- `reservas`

Relacionamentos:

- Autor 1:N Livros.
- Categoria 1:N Livros.
- Usuário 1:N Empréstimos.
- Usuário 1:N Reservas.
- Livro 1:N Reservas.
- Empréstimos N:N Livros por `itens_emprestimo`.

Os scripts estão em `database/schema.sql`, `database/inserts.sql`, `database/migrations/001_add_detalhes_livros.sql` e `database/migrations/002_create_reservas.sql`.

## MongoDB

Banco: `biblioteca_geek_logs`.

Collection: `logs`.

Campos principais:

```json
{
  "timestamp": "Date",
  "tipo": "REQUEST | BUSINESS | ERROR",
  "usuario": "admin@admin.com",
  "perfil": "admin",
  "acao": "LOGIN",
  "tabela": "usuarios",
  "registro_id": 1,
  "detalhes": "Login realizado",
  "ip": "::1",
  "user_agent": "browser",
  "endpoint": "/api/v1/auth/login",
  "metodo": "POST",
  "status_code": 200,
  "tempo_resposta_ms": 15
}
```

## XML

O endpoint `/api/v1/logs/exportar/xml` busca logs no MongoDB, aplica filtros opcionais por usuário, período e tipo, e gera XML seguro usando escape de caracteres especiais.

## Relatório PDF

O backend entrega dados em JSON pelo endpoint `/api/v1/relatorios/livros`. O frontend gera o PDF com jsPDF e jsPDF AutoTable, contendo título, data, usuário, tabela, total de livros, total de exemplares, total de páginas e rodapé.

## Gráfico

O dashboard usa Chart.js. Os dados chegam de `/api/v1/graficos/livros-por-categoria`, calculados no MySQL por categoria.

## Catálogo e reservas

Para administradores, a tela de livros continua com CRUD, upload e atalho de categoria. Para leitores, a mesma tela funciona como catálogo com Top 10, recomendações, filtro por categoria, detalhes e botão Reservar. A tela `reservas.html` mostra todas as reservas para admin e apenas as próprias reservas para leitor.

## Capas demonstrativas

Os dados iniciais em `database/inserts.sql` possuem 30 livros de ficção científica, distopia, fantasia, fantasia sombria, cyberpunk, HQ e terror geek. Eles apontam para capas SVG autorais em `public/uploads/capas-demo/`, criadas localmente para apresentação acadêmica.

## Modal de detalhes

A tela de livros mantém a listagem simples e usa um modal Bootstrap para exibir capa maior, título, sinopse em destaque, autor, categoria, ano, páginas, editora, ISBN e quantidade disponível. A mesma tela possui o atalho **Nova categoria**, que cadastra uma categoria pela API e atualiza o select sem recarregar a página.

## Licença

O projeto usa licença MIT, disponível no arquivo `LICENSE`.

## Screenshots

Os screenshots principais da entrega ficam em `docs/assets/screenshots/`, usando apenas os prints finais exibidos no README.

## Endpoints

A lista completa está em `docs/ENDPOINTS.md`.
