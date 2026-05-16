# Endpoints

Prefixo base: `/api/v1`

## Auth

| Metodo | Rota             | Descricao                       |
| ------ | ---------------- | ------------------------------- |
| POST   | `/auth/login`    | Autentica usuario e retorna JWT |
| POST   | `/auth/logout`   | Registra logout                 |
| POST   | `/auth/register` | Cadastra usuario                |

## Autores

| Metodo | Rota           |
| ------ | -------------- |
| GET    | `/autores`     |
| GET    | `/autores/:id` |
| POST   | `/autores`     |
| PUT    | `/autores/:id` |
| DELETE | `/autores/:id` |

## Categorias

| Metodo | Rota              |
| ------ | ----------------- |
| GET    | `/categorias`     |
| GET    | `/categorias/:id` |
| POST   | `/categorias`     |
| PUT    | `/categorias/:id` |
| DELETE | `/categorias/:id` |

## Livros

| Metodo | Rota                  | Descricao                        |
| ------ | --------------------- | -------------------------------- |
| GET    | `/livros`             | Lista livros                     |
| GET    | `/livros?busca=texto` | Pesquisa por titulo              |
| GET    | `/livros/:id`         | Busca por id                     |
| POST   | `/livros`             | Cria livro                       |
| PUT    | `/livros/:id`         | Atualiza livro                   |
| DELETE | `/livros/:id`         | Exclui livro                     |
| POST   | `/livros/:id/imagem`  | Envia capa usando campo `imagem` |

## Emprestimos

| Metodo | Rota               |
| ------ | ------------------ |
| GET    | `/emprestimos`     |
| GET    | `/emprestimos/:id` |
| POST   | `/emprestimos`     |
| PUT    | `/emprestimos/:id` |
| DELETE | `/emprestimos/:id` |

## JSON, Logs, Relatorios e Graficos

| Metodo | Rota                                                          | Descricao                                          |
| ------ | ------------------------------------------------------------- | -------------------------------------------------- |
| GET    | `/json/exportar/:entidade`                                    | Exporta autores, categorias, livros ou emprestimos |
| POST   | `/json/importar/:entidade`                                    | Importa autores, categorias ou livros              |
| GET    | `/logs`                                                       | Lista ultimos logs para o dashboard                |
| GET    | `/logs/exportar/xml`                                          | Exporta logs em XML                                |
| GET    | `/logs/exportar/xml?usuario=admin`                            | Filtra por usuario                                 |
| GET    | `/logs/exportar/xml?dataInicio=2026-01-01&dataFim=2026-12-31` | Filtra por periodo                                 |
| GET    | `/relatorios/livros`                                          | Dados do relatorio de livros                       |
| GET    | `/relatorios/livros?categoria=1`                              | Relatorio filtrado                                 |
| GET    | `/graficos/livros-por-categoria`                              | Dados para Chart.js                                |
