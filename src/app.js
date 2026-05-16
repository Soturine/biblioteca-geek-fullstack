const path = require('path');
const express = require('express');
const cors = require('cors');
const authMiddleware = require('./middleware/auth_middleware');
const logMiddleware = require('./middleware/log_middleware');
const errorMiddleware = require('./middleware/error_middleware');
const ErrorResponse = require('./utils/ErrorResponse');
const { successResponse } = require('./utils/response_helper');

const AuthRouter = require('./router/AuthRouter');
const AutorRouter = require('./router/AutorRouter');
const CategoriaRouter = require('./router/CategoriaRouter');
const LivroRouter = require('./router/LivroRouter');
const EmprestimoRouter = require('./router/EmprestimoRouter');
const JsonRouter = require('./router/JsonRouter');
const LogRouter = require('./router/LogRouter');
const RelatorioRouter = require('./router/RelatorioRouter');
const GraficoRouter = require('./router/GraficoRouter');

const app = express();

// Configuração principal do Express: JSON, formulário, uploads e telas estáticas.
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(logMiddleware);

app.get('/api/v1/health', (req, res) => {
  return successResponse(res, 200, 'API Biblioteca Geek online', {
    status: 'online',
  });
});

app.use(authMiddleware);

app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/autores', AutorRouter);
app.use('/api/v1/categorias', CategoriaRouter);
app.use('/api/v1/livros', LivroRouter);
app.use('/api/v1/emprestimos', EmprestimoRouter);
app.use('/api/v1/json', JsonRouter);
app.use('/api/v1/logs', LogRouter);
app.use('/api/v1/relatorios', RelatorioRouter);
app.use('/api/v1/graficos', GraficoRouter);

app.use('/api', (req, res, next) => {
  next(new ErrorResponse('Rota nao encontrada', 404));
});

app.use(errorMiddleware);

module.exports = app;
