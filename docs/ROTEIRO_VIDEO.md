# Roteiro do Vídeo - Até 10 Minutos

## 1. Abertura

Apresentar o tema: **Sistema Biblioteca Geek**. Explicar que o sistema gerencia autores, categorias, livros, empréstimos, reservas, relatórios e logs, separando perfil `admin` e perfil `leitor`.

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

Explicar que são contratos, já que JavaScript não tem interface nativa.

## 5. MySQL e DER

Abrir `database/schema.sql` e mostrar as tabelas:

- usuários
- autores
- categorias
- livros, incluindo páginas, sinopse, editora e ISBN
- empréstimos
- itens de empréstimo
- reservas

Mostrar `docs/DER.md` e a imagem `docs/DER.png` exibida no README.

## 6. MongoDB logs

Abrir MongoDB Compass e mostrar:

- banco `biblioteca_geek_logs`
- collection `logs`
- logs de requisições, ações de negócio, acesso negado, reservas e erros.

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

Mostrar a listagem com capas, abrir o modal **Detalhes** com sinopse em destaque, cadastrar uma categoria pelo botão **Nova categoria**, cadastrar um livro, editar, pesquisar pelo título e excluir.

## 10. Perfil leitor e catálogo

Criar ou entrar com um usuário leitor. Mostrar que ele não vê Dashboard, Autores, Categorias, JSON, Logs XML ou Relatório. Abrir o Catálogo, mostrar Top 10, Recomendações, filtro por categoria e botão **Reservar**.

## 11. Reservas

Criar uma reserva de livro disponível, abrir **Minhas Reservas**, mostrar status, previsão e botão Cancelar. Depois voltar como admin e mostrar a tela **Reservas** com todas as reservas e alteração de status.

## 12. Upload de imagem

Selecionar uma capa PNG/JPG/JPEG/WEBP, mostrar preview e depois a capa na listagem.

## 13. JSON

Exportar autores ou livros. Depois importar um JSON de autores/categorias/livros e mostrar o feedback de importados, duplicados e erros.

## 14. XML

Acessar Logs XML, aplicar filtro por usuário, período ou tipo e baixar o XML.

## 15. Relatório PDF

Acessar Relatório, filtrar por categoria e gerar PDF.

## 16. Encerramento

Mostrar o repositório GitHub, a licença MIT e finalizar explicando que o projeto cumpre MVC, Service Layer, Router, Middleware, MySQL, MongoDB, JWT, perfis, reservas, JSON, XML, PDF, gráfico e upload.
