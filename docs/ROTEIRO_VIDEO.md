# Roteiro do Video - Ate 10 Minutos

## 1. Abertura

Apresentar o tema: **Sistema Biblioteca Geek**. Explicar que o sistema gerencia autores, categorias, livros, empréstimos, relatórios e logs.

## 2. Estrutura de pastas

Mostrar a pasta `src` e explicar rapidamente:

- `model`
- `dao`
- `service`
- `controller`
- `router`
- `middleware`
- `interfaces`

## 3. Arquitetura

Explicar o fluxo:

Router recebe a rota, Controller trata requisição/resposta, Service aplica regras de negócio, DAO acessa MySQL ou MongoDB, Model valida dados simples.

## 4. Interfaces

Mostrar:

- `src/interfaces/IDAO.js`
- `src/interfaces/IController.js`
- `src/interfaces/IService.js`

Explicar que sao contratos, ja que JavaScript não tem interface nativa.

## 5. MySQL e DER

Abrir `database/schema.sql` e mostrar as tabelas:

- usuarios
- autores
- categorias
- livros
- emprestimos
- itens_emprestimo

Mostrar `docs/DER.md` ou `docs/DER.png`.

## 6. MongoDB logs

Abrir MongoDB Compass e mostrar:

- banco `biblioteca_geek_logs`
- collection `logs`
- logs de login, rotas, CRUD e erros.

## 7. Login

Acessar `http://localhost:3000`, entrar com:

```text
admin@admin.com
123456
```

## 8. Dashboard

Mostrar:

- cards de totais
- últimos logs
- gráfico Chart.js

## 9. CRUD de livros

Cadastrar um livro, editar, pesquisar pelo titulo e excluir.

## 10. Upload de imagem

Selecionar uma capa PNG/JPG/JPEG/WEBP, mostrar preview e depois a capa na listagem.

## 11. JSON

Exportar autores ou livros. Depois importar um JSON de autores/categorias/livros e mostrar o feedback de importados, duplicados e erros.

## 12. XML

Acessar Logs XML, aplicar filtro opcional e baixar o XML.

## 13. Relatório PDF

Acessar Relatório, filtrar por categoria e gerar PDF.

## 14. Encerramento

Mostrar o repositório GitHub e finalizar explicando que o projeto cumpre MVC, Service Layer, Router, Middleware, MySQL, MongoDB, JWT, JSON, XML, PDF, gráfico e upload.
