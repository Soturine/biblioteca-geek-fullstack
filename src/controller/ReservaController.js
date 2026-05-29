const IController = require('../interfaces/IController');
const ReservaService = require('../service/ReservaService');
const LogService = require('../service/LogService');
const { successResponse } = require('../utils/response_helper');

class ReservaController extends IController {
  constructor() {
    super();
    this.reservaService = new ReservaService();
  }

  async index(req, res, next) {
    try {
      const reservas = await this.reservaService.findAll(req.usuario);
      return successResponse(res, 200, 'Reservas listadas com sucesso', reservas);
    } catch (error) {
      next(error);
    }
  }

  async minhas(req, res, next) {
    try {
      const reservas = await this.reservaService.minhas(req.usuario);
      return successResponse(res, 200, 'Minhas reservas listadas com sucesso', reservas);
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const reserva = await this.reservaService.findById(req.params.id);
      return successResponse(res, 200, 'Reserva encontrada com sucesso', reserva);
    } catch (error) {
      next(error);
    }
  }

  async store(req, res, next) {
    try {
      const reserva = await this.reservaService.create(req.body, req.usuario);
      LogService.registrarAcao(req, {
        acao: reserva.status === 'aguardando' ? 'RESERVA_AGUARDANDO' : 'RESERVA_CRIADA',
        tabela: 'reservas',
        registro_id: reserva.id_reserva,
        detalhes: reserva.observacao,
        status_code: 201,
      }).catch(() => {});
      return successResponse(res, 201, reserva.observacao, reserva);
    } catch (error) {
      next(error);
    }
  }

  async cancelar(req, res, next) {
    try {
      const reserva = await this.reservaService.cancelar(req.params.id, req.usuario);
      LogService.registrarAcao(req, {
        acao: 'RESERVA_CANCELADA',
        tabela: 'reservas',
        registro_id: reserva.id_reserva,
        detalhes: `Reserva ${reserva.id_reserva} cancelada`,
      }).catch(() => {});
      return successResponse(res, 200, 'Reserva cancelada com sucesso', reserva);
    } catch (error) {
      next(error);
    }
  }

  async status(req, res, next) {
    try {
      const reserva = await this.reservaService.updateStatus(req.params.id, req.body.status);
      LogService.registrarAcao(req, {
        acao: 'RESERVA_STATUS',
        tabela: 'reservas',
        registro_id: reserva.id_reserva,
        detalhes: `Status alterado para ${reserva.status}`,
      }).catch(() => {});
      return successResponse(res, 200, 'Status da reserva atualizado com sucesso', reserva);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    return this.status(req, res, next);
  }

  async destroy(req, res, next) {
    return this.cancelar(req, res, next);
  }
}

module.exports = ReservaController;
