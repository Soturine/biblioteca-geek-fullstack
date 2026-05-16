const IService = require('../interfaces/IService');
const Emprestimo = require('../model/Emprestimo');
const EmprestimoDAO = require('../dao/EmprestimoDAO');
const LivroDAO = require('../dao/LivroDAO');
const UsuarioDAO = require('../dao/UsuarioDAO');
const ErrorResponse = require('../utils/ErrorResponse');

class EmprestimoService extends IService {
  constructor() {
    super();
    this.emprestimoDAO = new EmprestimoDAO();
    this.livroDAO = new LivroDAO();
    this.usuarioDAO = new UsuarioDAO();
  }

  normalizar(dados) {
    return {
      id_usuario: Number(dados.id_usuario),
      nome_leitor: dados.nome_leitor.trim(),
      data_emprestimo: dados.data_emprestimo || null,
      data_devolucao: dados.data_devolucao || null,
      status: dados.status || 'aberto',
      itens: dados.itens.map((item) => ({
        id_livro: Number(item.id_livro),
        quantidade: Number(item.quantidade),
      })),
    };
  }

  async validarUsuario(idUsuario) {
    const usuario = await this.usuarioDAO.findById(idUsuario);
    if (!usuario) {
      throw new ErrorResponse('Usuario do emprestimo nao encontrado', 404);
    }
  }

  async validarEstoqueParaCriacao(itens) {
    for (const item of itens) {
      const livro = await this.livroDAO.findById(item.id_livro);

      if (!livro) {
        throw new ErrorResponse(`Livro ${item.id_livro} nao encontrado`, 404);
      }

      if (Number(item.quantidade) > Number(livro.quantidade)) {
        throw new ErrorResponse(
          `Quantidade emprestada maior que disponivel para "${livro.titulo}"`,
          400,
        );
      }
    }
  }

  async create(dados) {
    Emprestimo.validar(dados);
    const emprestimo = this.normalizar(dados);
    await this.validarUsuario(emprestimo.id_usuario);
    await this.validarEstoqueParaCriacao(emprestimo.itens);
    return this.emprestimoDAO.create(emprestimo);
  }

  async findAll() {
    return this.emprestimoDAO.findAll();
  }

  async findById(id) {
    const emprestimo = await this.emprestimoDAO.findById(id);
    if (!emprestimo) {
      throw new ErrorResponse('Emprestimo nao encontrado', 404);
    }
    return emprestimo;
  }

  async update(id, dados) {
    await this.findById(id);
    Emprestimo.validar(dados);
    const emprestimo = this.normalizar(dados);
    await this.validarUsuario(emprestimo.id_usuario);
    return this.emprestimoDAO.update(id, emprestimo);
  }

  async delete(id) {
    await this.findById(id);
    return this.emprestimoDAO.delete(id);
  }
}

module.exports = EmprestimoService;
