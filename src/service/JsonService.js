const IService = require('../interfaces/IService');
const AutorService = require('./AutorService');
const CategoriaService = require('./CategoriaService');
const LivroService = require('./LivroService');
const EmprestimoService = require('./EmprestimoService');
const ErrorResponse = require('../utils/ErrorResponse');

class JsonService extends IService {
  constructor() {
    super();
    this.services = {
      autores: new AutorService(),
      categorias: new CategoriaService(),
      livros: new LivroService(),
      emprestimos: new EmprestimoService()
    };
    this.importaveis = ['autores', 'categorias', 'livros'];
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
      const registros = Array.isArray(json) ? json : json.data;

      if (!Array.isArray(registros)) {
        throw new Error('JSON deve conter um array ou uma propriedade data com array');
      }

      return registros;
    } catch (error) {
      throw new ErrorResponse(`JSON invalido: ${error.message}`, 400);
    }
  }

  async importar(entidade, conteudo) {
    if (!this.importaveis.includes(entidade)) {
      throw new ErrorResponse('Apenas autores, categorias e livros podem ser importados', 400);
    }

    const service = this.getService(entidade);
    const registros = this.parseConteudo(conteudo);
    const resultado = {
      importados: 0,
      erros: []
    };

    for (const [indice, registro] of registros.entries()) {
      try {
        await service.create(registro);
        resultado.importados += 1;
      } catch (error) {
        resultado.erros.push({
          linha: indice + 1,
          mensagem: error.message,
          detalhes: error.errors || null
        });
      }
    }

    if (resultado.importados === 0 && resultado.erros.length > 0) {
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
