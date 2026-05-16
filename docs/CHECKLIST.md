# Checklist

| Requisito | Status | Onde foi implementado |
|---|---|---|
| Node.js + Express | OK | `src/app.js`, `src/server.js` |
| CommonJS com require/module.exports | OK | Arquivos em `src/` |
| MVC + Router + Service + DAO + Model | OK | `src/controller`, `src/router`, `src/service`, `src/dao`, `src/model` |
| Interfaces IDAO, IController e IService | OK | `src/interfaces` |
| MySQL com mysql2/promise | OK | `src/config/mysql_database.js`, `src/dao` |
| MongoDB para logs | OK | `src/config/mongo_database.js`, `src/dao/LogDAO.js` |
| JWT | OK | `src/service/AuthService.js`, `src/middleware/auth_middleware.js` |
| bcryptjs | OK | `src/service/AuthService.js`, `src/service/UsuarioService.js` |
| Upload com multer | OK | `src/middleware/upload_middleware.js`, `src/router/LivroRouter.js` |
| Status HTTP 200, 201, 204, 400, 401, 404, 500 | OK | Controllers, services e `src/middleware/error_middleware.js` |
| JSON padronizado | OK | `src/utils/response_helper.js`, `src/middleware/error_middleware.js` |
| CRUD autores | OK | `AutorRouter`, `AutorController`, `AutorService`, `AutorDAO`, `public/autores.html` |
| CRUD categorias | OK | `CategoriaRouter`, `CategoriaController`, `CategoriaService`, `CategoriaDAO`, `public/categorias.html` |
| CRUD livros | OK | `LivroRouter`, `LivroController`, `LivroService`, `LivroDAO`, `public/livros.html` |
| Pesquisa de livros | OK | `LivroDAO.findAll`, `public/js/livros.js` |
| CRUD emprestimos e itens | OK | `EmprestimoRouter`, `EmprestimoController`, `EmprestimoService`, `EmprestimoDAO`, `public/emprestimos.html` |
| Regra de estoque ao emprestar/devolver | OK | `src/service/EmprestimoService.js`, `src/dao/EmprestimoDAO.js` |
| Categoria duplicada bloqueada | OK | `src/service/CategoriaService.js` |
| Usuario duplicado bloqueado | OK | `src/service/UsuarioService.js` |
| Senha minima de 6 caracteres | OK | `src/model/Usuario.js` |
| Importacao/exportacao JSON | OK | `src/service/JsonService.js`, `public/import_export.html` |
| Logs de login/logout | OK | `src/controller/AuthController.js` |
| Logs de inclusao, alteracao e exclusao | OK | Controllers de CRUD |
| Logs de acesso a rotas | OK | `src/middleware/log_middleware.js` |
| Logs de erros/excecoes | OK | `src/middleware/error_middleware.js` |
| Exportacao XML dos logs | OK | `src/service/LogService.js`, `src/utils/xml_helper.js`, `public/logs.html` |
| Relatorio JSON no backend | OK | `src/controller/RelatorioController.js` |
| PDF no frontend com jsPDF e AutoTable | OK | `public/relatorio.html`, `public/js/relatorio.js` |
| Grafico Chart.js | OK | `public/dashboard.html`, `public/js/dashboard.js` |
| Frontend Bootstrap 5 via CDN | OK | HTML em `public/` |
| Guardar JWT no localStorage | OK | `public/js/api.js`, `public/js/auth.js` |
| Proteger telas privadas | OK | `protegerPagina()` em `public/js/api.js` |
| Banco schema.sql | OK | `database/schema.sql` |
| Dados de teste inserts.sql | OK | `database/inserts.sql` |
| DER | OK | `database/der.md` |
| README | OK | `README.md` |
| Documentacao | OK | `docs/DOCUMENTACAO.md` |
| Endpoints | OK | `docs/ENDPOINTS.md` |
