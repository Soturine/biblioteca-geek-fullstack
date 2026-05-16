const IService = require('../interfaces/IService');
const AutorService = require('./AutorService');
const CategoriaService = require('./CategoriaService');
const LivroService = require('./LivroService');
const EmprestimoService = require('./EmprestimoService');
const ErrorResponse = require('../utils/ErrorResponse');
const AutorDAO = require('../dao/AutorDAO');
const CategoriaDAO = require('../dao/CategoriaDAO');
const LivroDAO = require('../dao/LivroDAO');

class JsonService extends IService {
  constructor() {
    super();
    this.services = {
      autores: new AutorService(),
      categorias: new CategoriaService(),
      livros: new LivroService(),
      emprestimos: new EmprestimoService(),
    };
    this.importaveis = ['autores', 'categorias', 'livros'];
    this.autorDAO = new AutorDAO();
    this.categoriaDAO = new CategoriaDAO();
    this.livroDAO = new LivroDAO();
  }

  getService(entidade) {
    const service = this.services[entidade];
    if (!service) {
      throw new ErrorResponse('Entidade JSON nao suportada', 404);
    }
    return service;
  }

  async exportar(entidade) {
    const service = this.getService(entidade);
    return service.findAll();
  }

  parseConteudo(conteudo) {
    try {
      const json = JSON.parse(conteudo);
      // Aceita tanto um array direto quanto o formato padronizado { data: [...] }.
      const registros = Array.isArray(json) ? json : json.data;

      if (!Array.isArray(registros)) {
        throw new Error('JSON deve conter um array ou uma propriedade data com array');
      }

      return registros;
    } catch (error) {
      throw new ErrorResponse(`JSON invalido: ${error.message}`, 400);
    }
  }

  validarEstrutura(entidade, registro) {
    if (!registro || typeof registro !== 'object' || Array.isArray(registro)) {
      throw new ErrorResponse('Registro deve ser um objeto JSON', 400);
    }

    const campos = {
      autores: ['nome'],
      categorias: ['nome'],
      livros: ['titulo', 'ano', 'quantidade', 'id_autor', 'id_categoria'],
    };

    const faltando = campos[entidade].filter((campo) => {
      const valor = registro[campo];
      return valor === undefined || valor === null || String(valor).trim() === '';
    });

    if (faltando.length) {
      throw new ErrorResponse(`Campos obrigatorios ausentes: ${faltando.join(', ')}`, 400);
    }
  }

  async buscarDuplicado(entidade, registro) {
    if (entidade === 'autores') {
      return this.autorDAO.findByNome(registro.nome);
    }

    if (entidade === 'categorias') {
      return this.categoriaDAO.findByNome(registro.nome);
    }

    if (entidade === 'livros') {
      return this.livroDAO.findDuplicado(registro.titulo, registro.id_autor, registro.id_categoria);
    }

    return null;
  }

  async importar(entidade, conteudo) {
    if (!this.importaveis.includes(entidade)) {
      throw new ErrorResponse('Apenas autores, categorias e livros podem ser importados', 400);
    }

    const service = this.getService(entidade);
    const registros = this.parseConteudo(conteudo);
    const resultado = {
      total_processados: registros.length,
      importados: 0,
      ignorados_duplicidade: 0,
      erros_quantidade: 0,
      duplicidades: [],
      erros: [],
    };

    for (const [indice, registro] of registros.entries()) {
      try {
        this.validarEstrutura(entidade, registro);

        // A importação continua mesmo se uma linha for duplicada ou inválida.
        const duplicado = await this.buscarDuplicado(entidade, registro);
        if (duplicado) {
          resultado.ignorados_duplicidade += 1;
          resultado.duplicidades.push({
            linha: indice + 1,
            mensagem: 'Registro ignorado por duplicidade',
            referencia: registro.nome || registro.titulo,
          });
          continue;
        }

        await service.create(registro);
        resultado.importados += 1;
      } catch (error) {
        resultado.erros_quantidade += 1;
        resultado.erros.push({
          linha: indice + 1,
          mensagem: error.message,
          detalhes: error.errors || null,
        });
      }
    }

    if (
      resultado.importados === 0 &&
      resultado.erros.length > 0 &&
      resultado.ignorados_duplicidade === 0
    ) {
      throw new ErrorResponse('Nenhum registro foi importado', 400, resultado.erros);
    }

    return resultado;
  }

  async create(dados) {
    return dados;
  }

  async findAll() {
    return [];
  }

  async findById() {
    return null;
  }

  async update(id, dados) {
    return dados;
  }

  async delete() {
    return false;
  }
}

module.exports = JsonService;
