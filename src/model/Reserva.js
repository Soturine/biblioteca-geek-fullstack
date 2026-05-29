const ErrorResponse = require('../utils/ErrorResponse');

class Reserva {
  constructor({
    id_reserva,
    id_usuario,
    id_livro,
    data_reserva,
    data_prevista_retirada,
    status = 'aguardando',
    observacao,
  }) {
    this.id_reserva = id_reserva;
    this.id_usuario = id_usuario;
    this.id_livro = id_livro;
    this.data_reserva = data_reserva;
    this.data_prevista_retirada = data_prevista_retirada;
    this.status = status;
    this.observacao = observacao;
  }

  static statusValidos() {
    return ['liberada', 'aguardando', 'cancelada', 'retirada', 'expirada'];
  }

  static validarCriacao(dados) {
    if (!dados.id_livro || Number(dados.id_livro) <= 0) {
      throw new ErrorResponse('Livro da reserva deve ser informado', 400);
    }
  }

  static validarStatus(status) {
    if (!this.statusValidos().includes(String(status || '').toLowerCase())) {
      throw new ErrorResponse('Status de reserva invalido', 400);
    }
  }
}

module.exports = Reserva;
