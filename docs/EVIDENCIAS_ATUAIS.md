# Evidências do Estado Atual Antes das Melhorias Finais

Data da coleta: 16/05/2026.

Esta pasta registra prints reais do sistema **Biblioteca Geek Fullstack** rodando em `http://localhost:3000` antes das próximas melhorias solicitadas.

## Resultado da verificação

- MySQL funcionou: o sistema autenticou o usuário admin e carregou dados relacionais de livros, autores, categorias, empréstimos, relatório e gráfico.
- MongoDB funcionou: a conexão local `mongodb://127.0.0.1:27017` respondeu e a collection `biblioteca_geek_logs.logs` continha 78 documentos no momento da evidência.
- Dashboard carregou gráfico: o print `01-dashboard-atual.png` mostra a tela atual do dashboard com dados vindos da API.
- Logs apareceram no MongoDB: o print `07-mongodb-consulta-atual.png` mostra consulta real ao banco `biblioteca_geek_logs`, collection `logs`. O MongoDB Compass não estava instalado neste ambiente, então a evidência foi feita por consulta direta ao MongoDB.
- XML foi exportado: o arquivo `logs-atual.xml` foi gerado pelo endpoint de exportação XML, e o print `08-xml-baixado-atual.png` mostra o conteúdo exportado.
- PDF foi gerado: o arquivo `relatorio-atual.pdf` foi baixado pela tela de relatório, e o print `09-pdf-baixado-atual.png` mostra o PDF aberto no navegador.

## Prints salvos

| Arquivo | Evidência |
|---|---|
| `docs/assets/screenshots/estado-atual/00-login-atual.png` | Tela de login atual |
| `docs/assets/screenshots/estado-atual/01-dashboard-atual.png` | Dashboard atual |
| `docs/assets/screenshots/estado-atual/02-livros-atual.png` | Tela de livros atual |
| `docs/assets/screenshots/estado-atual/03-emprestimos-atual.png` | Tela de empréstimos atual |
| `docs/assets/screenshots/estado-atual/04-json-atual.png` | Tela de importação/exportação JSON atual |
| `docs/assets/screenshots/estado-atual/05-logs-xml-atual.png` | Tela de logs XML atual |
| `docs/assets/screenshots/estado-atual/06-relatorio-atual.png` | Tela de relatório atual |
| `docs/assets/screenshots/estado-atual/07-mongodb-consulta-atual.png` | Consulta real ao MongoDB local |
| `docs/assets/screenshots/estado-atual/08-xml-baixado-atual.png` | XML exportado e visualizado |
| `docs/assets/screenshots/estado-atual/09-pdf-baixado-atual.png` | PDF gerado e aberto no navegador |
| `docs/assets/screenshots/estado-atual/logs-atual.xml` | Arquivo XML baixado |
| `docs/assets/screenshots/estado-atual/relatorio-atual.pdf` | Arquivo PDF baixado |
