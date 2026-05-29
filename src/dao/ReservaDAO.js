const IDAO = require('../interfaces/IDAO');
const pool = require('../config/mysql_database');

class ReservaDAO extends IDAO {
  async create(reserva) {
    const [result] = await pool.execute(
      `INSERT INTO reservas
       (id_usuario, id_livro, data_prevista_retirada, status, observacao)
       VALUES (?, ?, ?, ?, ?)`,
      [
        Number(reserva.id_usuario),
        Number(reserva.id_livro),
        reserva.data_prevista_retirada || null,
        reserva.status,
        reserva.observacao || null,
      ],
    );

    return this.findById(result.insertId);
  }

  async findAll() {
    const [rows] = await pool.execute(
      `SELECT r.*, u.nome AS usuario_nome, u.email AS usuario_email,
              l.titulo AS livro_titulo, l.imagem AS livro_imagem,
              a.nome AS autor_nome, c.nome AS categoria_nome
       FROM reservas r
       INNER JOIN usuarios u ON u.id_usuario = r.id_usuario
       INNER JOIN livros l ON l.id_livro = r.id_livro
       INNER JOIN autores a ON a.id_autor = l.id_autor
       INNER JOIN categorias c ON c.id_categoria = l.id_categoria
       ORDER BY r.data_reserva DESC`,
    );

    return rows;
  }

  async findByUsuario(idUsuario) {
    const [rows] = await pool.execute(
      `SELECT r.*, u.nome AS usuario_nome, u.email AS usuario_email,
              l.titulo AS livro_titulo, l.imagem AS livro_imagem,
              a.nome AS autor_nome, c.nome AS categoria_nome
       FROM reservas r
       INNER JOIN usuarios u ON u.id_usuario = r.id_usuario
       INNER JOIN livros l ON l.id_livro = r.id_livro
       INNER JOIN autores a ON a.id_autor = l.id_autor
       INNER JOIN categorias c ON c.id_categoria = l.id_categoria
       WHERE r.id_usuario = ?
       ORDER BY r.data_reserva DESC`,
      [Number(idUsuario)],
    );

    return rows;
  }

  async findById(id) {
    const [rows] = await pool.execute(
      `SELECT r.*, u.nome AS usuario_nome, u.email AS usuario_email,
              l.titulo AS livro_titulo, l.imagem AS livro_imagem,
              a.nome AS autor_nome, c.nome AS categoria_nome
       FROM reservas r
       INNER JOIN usuarios u ON u.id_usuario = r.id_usuario
       INNER JOIN livros l ON l.id_livro = r.id_livro
       INNER JOIN autores a ON a.id_autor = l.id_autor
       INNER JOIN categorias c ON c.id_categoria = l.id_categoria
       WHERE r.id_reserva = ?`,
      [Number(id)],
    );

    return rows[0] || null;
  }

  async findAtivaDuplicada(idUsuario, idLivro) {
    const [rows] = await pool.execute(
      `SELECT *
       FROM reservas
       WHERE id_usuario = ?
         AND id_livro = ?
         AND status IN ('liberada', 'aguardando')`,
      [Number(idUsuario), Number(idLivro)],
    );

    return rows[0] || null;
  }

  async proximaDevolucaoPrevista(idLivro) {
    const [rows] = await pool.execute(
      `SELECT e.data_devolucao
       FROM emprestimos e
       INNER JOIN itens_emprestimo i ON i.id_emprestimo = e.id_emprestimo
       WHERE i.id_livro = ?
         AND e.status = 'aberto'
         AND e.data_devolucao IS NOT NULL
       ORDER BY e.data_devolucao ASC
       LIMIT 1`,
      [Number(idLivro)],
    );

    return rows[0] ? rows[0].data_devolucao : null;
  }

  async update(id, dados) {
    await pool.execute(
      `UPDATE reservas
       SET status = ?, data_prevista_retirada = ?, observacao = ?
       WHERE id_reserva = ?`,
      [dados.status, dados.data_prevista_retirada || null, dados.observacao || null, Number(id)],
    );

    return this.findById(id);
  }

  async cancelar(id) {
    await pool.execute(
      `UPDATE reservas
       SET status = 'cancelada', observacao = 'Reserva cancelada pelo usuário'
       WHERE id_reserva = ?`,
      [Number(id)],
    );

    return this.findById(id);
  }

  async delete(id) {
    const [result] = await pool.execute('DELETE FROM reservas WHERE id_reserva = ?', [Number(id)]);
    return result.affectedRows > 0;
  }
}

module.exports = ReservaDAO;
