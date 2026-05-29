# Changelog

## v1.1.0 - Melhorias finais e documentação

- Dashboard melhorado com cards, totais, últimos logs e gráfico.
- Routers convertidos para classes.
- Respostas JSON padronizadas com `success`, `message` e `data`.
- Logs especificos para login com sucesso, falha de login, logout, CRUD, erros e acesso a rotas.
- Permissões por perfil `admin` e `leitor`, com bloqueio 403 em rotas administrativas.
- Catálogo do leitor com Top 10, recomendações, filtro por categoria e botão Reservar.
- Sistema de reservas com tela Minhas Reservas e acompanhamento administrativo.
- Logger MongoDB organizado por `REQUEST`, `BUSINESS` e `ERROR`, com sanitização de dados sensíveis.
- Importação JSON melhorada com contagem de importados, duplicados e erros.
- Upload de imagem com validação de extensao, mimetype, tamanho e preview no frontend.
- Relatório PDF melhorado com filtro, totais, usuario e data/hora.
- Documentação expandida, roteiro de vídeo, testes API, guia XAMPP/MongoDB e DER.
- Script de formatacao com Prettier.
- Screenshots finais e GitHub Pages em `docs/index.html`.
- Capas demonstrativas locais para os livros iniciais.

## v1.0.0 - Versão inicial

- Estrutura full stack criada com Node.js, Express, MySQL, MongoDB e Bootstrap.
- CRUD de autores, categorias, livros e empréstimos.
- Autenticação JWT.
- Logs em MongoDB.
- Exportação JSON/XML, relatório PDF e gráfico Chart.js.
