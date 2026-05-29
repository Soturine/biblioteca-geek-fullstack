const IService = require('../interfaces/IService');
const Reserva = require('../model/Reserva');
const ReservaDAO = require('../dao/ReservaDAO');
const LivroDAO = require('../dao/LivroDAO');
const ErrorResponse = require('../utils/ErrorResponse');

function ehAdminReserva(usuario) {
  const perfil = String(usuario?.perfil || '').toLowerCase();
  return perfil === 'admin';
}

class ReservaService extends IService {
  constructor() {
    super();
    this.reservaDAO = new ReservaDAO();
    this.livroDAO = new LivroDAO();
  }

  async calcularPrevisao(idLivro) {
    const dataBanco = await this.reservaDAO.proximaDevolucaoPrevista(idLivro);

    if (dataBanco) {
      return new Date(dataBanco).toISOString().slice(0, 10);
    }

    const data = new Date();
    data.setDate(data.getDate() + 7);
    return data.toISOString().slice(0, 10);
  }

  async create(dados, usuario) {
    Reserva.validarCriacao(dados);

    const livro = await this.livroDAO.findById(dados.id_livro);
    if (!livro) {
      throw new ErrorResponse('Livro da reserva nao encontrado', 404);
    }

    const duplicada = await this.reservaDAO.findAtivaDuplicada(usuario.id_usuario, dados.id_livro);
    if (duplicada) {
      throw new ErrorResponse('Voce ja possui uma reserva ativa para este livro', 400);
    }

    const disponivel = Number(livro.quantidade) > 0;
    const status = disponivel ? 'liberada' : 'aguardando';
    const dataPrevista = disponivel
      ? new Date().toISOString().slice(0, 10)
      : await this.calcularPrevisao(dados.id_livro);
    const observacao = disponivel
      ? 'Reserva realizada. O livro está disponível e pode ser retirado no balcão da biblioteca.'
      : 'Livro indisponível no momento. Sua reserva foi registrada para a próxima data prevista de devolução.';

    return this.reservaDAO.create({
      id_usuario: usuario.id_usuario,
      id_livro: dados.id_livro,
      data_prevista_retirada: dataPrevista,
      status,
      observacao,
    });
  }

  async findAll(usuario = null) {
    if (ehAdminReserva(usuario)) {
      return this.reservaDAO.findAll();
    }

    return this.reservaDAO.findByUsuario(usuario.id_usuario);
  }

  async minhas(usuario) {
    return this.reservaDAO.findByUsuario(usuario.id_usuario);
  }

  async findById(id) {
    const reserva = await this.reservaDAO.findById(id);
    if (!reserva) {
      throw new ErrorResponse('Reserva nao encontrada', 404);
    }
    return reserva;
  }

  async cancelar(id, usuario) {
    const reserva = await this.findById(id);

    if (!ehAdminReserva(usuario) && Number(reserva.id_usuario) !== Number(usuario.id_usuario)) {
      throw new ErrorResponse('Reserva pertence a outro usuário', 403);
    }

    if (!['liberada', 'aguardando'].includes(reserva.status)) {
      throw new ErrorResponse('Reserva nao pode ser cancelada neste status', 400);
    }

    return this.reservaDAO.cancelar(id);
  }

  async updateStatus(id, status) {
    Reserva.validarStatus(status);
    const reserva = await this.findById(id);
    return this.reservaDAO.update(id, {
      status: String(status).toLowerCase(),
      data_prevista_retirada: reserva.data_prevista_retirada,
      observacao: `Status alterado para ${String(status).toLowerCase()}`,
    });
  }

  async update(id, dados) {
    return this.updateStatus(id, dados.status);
  }

  async delete(id) {
    await this.findById(id);
    return this.reservaDAO.delete(id);
  }
}

module.exports = ReservaService;
