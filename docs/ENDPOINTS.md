# Endpoints

Prefixo base: `/api/v1`

Rotas administrativas exigem token de usuário com perfil `admin`. Leitores recebem `403 Forbidden`.

## Auth

| Método | Rota             | Descrição                       |
| ------ | ---------------- | ------------------------------- |
| POST   | `/auth/login`    | Autentica usuário e retorna JWT |
| POST   | `/auth/logout`   | Registra logout                 |
| POST   | `/auth/register` | Cadastra usuário                |

## Autores

| Método | Rota           |
| ------ | -------------- |
| GET    | `/autores`     |
| GET    | `/autores/:id` |
| POST   | `/autores`     |
| PUT    | `/autores/:id` |
| DELETE | `/autores/:id` |

## Categorias

| Método | Rota              |
| ------ | ----------------- |
| GET    | `/categorias`     |
| GET    | `/categorias/:id` |
| POST   | `/categorias`     |
| PUT    | `/categorias/:id` |
| DELETE | `/categorias/:id` |

## Livros

| Método | Rota                      | Descrição                                                |
| ------ | ------------------------- | -------------------------------------------------------- |
| GET    | `/livros`                 | Lista livros                                             |
| GET    | `/livros?busca=texto`     | Pesquisa por título                                      |
| GET    | `/livros?categoria=1`     | Filtra por categoria                                     |
| GET    | `/livros/top-emprestados` | Top 10 por itens de empréstimo, com fallback para acervo |
| GET    | `/livros/recomendados`    | Recomendações para o usuário logado                      |
| GET    | `/livros/:id`             | Busca por id, incluindo páginas, editora, ISBN e sinopse |
| POST   | `/livros`                 | Cria livro com dados básicos e detalhes                  |
| PUT    | `/livros/:id`             | Atualiza livro e detalhes                                |
| DELETE | `/livros/:id`             | Exclui livro                                             |
| POST   | `/livros/:id/imagem`      | Envia capa usando campo `imagem`                         |

## Empréstimos

| Método | Rota               |
| ------ | ------------------ |
| GET    | `/emprestimos`     |
| GET    | `/emprestimos/:id` |
| POST   | `/emprestimos`     |
| PUT    | `/emprestimos/:id` |
| DELETE | `/emprestimos/:id` |

## Reservas

| Método | Rota                     | Descrição                                    |
| ------ | ------------------------ | -------------------------------------------- |
| GET    | `/reservas`              | Admin lista todas as reservas                |
| GET    | `/reservas/minhas`       | Leitor lista as próprias reservas            |
| POST   | `/reservas`              | Cria reserva informando `id_livro`           |
| PUT    | `/reservas/:id/cancelar` | Cancela reserva própria ou qualquer se admin |
| PUT    | `/reservas/:id/status`   | Admin altera status da reserva               |

## JSON, Logs, Relatórios e Gráficos

| Método | Rota                                                          | Descrição                                          |
| ------ | ------------------------------------------------------------- | -------------------------------------------------- |
| GET    | `/json/exportar/:entidade`                                    | Exporta autores, categorias, livros ou empréstimos |
| POST   | `/json/importar/:entidade`                                    | Importa autores, categorias ou livros              |
| GET    | `/logs`                                                       | Lista últimos logs para o dashboard                |
| GET    | `/logs/exportar/xml`                                          | Exporta logs em XML                                |
| GET    | `/logs/exportar/xml?usuario=admin`                            | Filtra por usuário                                 |
| GET    | `/logs/exportar/xml?dataInicio=2026-01-01&dataFim=2026-12-31` | Filtra por período                                 |
| GET    | `/logs/exportar/xml?tipo=BUSINESS`                            | Filtra por tipo de log                             |
| GET    | `/relatorios/livros`                                          | Dados do relatório de livros, incluindo páginas    |
| GET    | `/relatorios/livros?categoria=1`                              | Relatório filtrado                                 |
| GET    | `/graficos/livros-por-categoria`                              | Dados para Chart.js                                |
