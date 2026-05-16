const IDAO = require('../interfaces/IDAO');
const pool = require('../config/mysql_database');
const ErrorResponse = require('../utils/ErrorResponse');

class EmprestimoDAO extends IDAO {
  async create(emprestimo) {
    const conn = await pool.getConnection();

    try {
      await conn.beginTransaction();

      const [result] = await conn.execute(
        `INSERT INTO emprestimos
           (id_usuario, nome_leitor, data_emprestimo, data_devolucao, status)
         VALUES (?, ?, COALESCE(?, CURRENT_DATE), ?, ?)`,
        [
          Number(emprestimo.id_usuario),
          emprestimo.nome_leitor,
          emprestimo.data_emprestimo || null,
          emprestimo.data_devolucao || null,
          emprestimo.status || 'aberto',
        ],
      );

      const idEmprestimo = result.insertId;
      await this.inserirItens(conn, idEmprestimo, emprestimo.itens);
      await conn.commit();
      return this.findById(idEmprestimo);
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  async inserirItens(conn, idEmprestimo, itens) {
    for (const item of itens) {
      const idLivro = Number(item.id_livro);
      const quantidade = Number(item.quantidade);

      const [livros] = await conn.execute(
        'SELECT id_livro, quantidade FROM livros WHERE id_livro = ? FOR UPDATE',
        [idLivro],
      );

      if (!livros[0]) {
        throw new ErrorResponse(`Livro ${idLivro} nao encontrado`, 404);
      }

      if (Number(livros[0].quantidade) < quantidade) {
        throw new ErrorResponse(`Quantidade indisponivel para o livro ${idLivro}`, 400);
      }

      await conn.execute('UPDATE livros SET quantidade = quantidade - ? WHERE id_livro = ?', [
        quantidade,
        idLivro,
      ]);

      await conn.execute(
        `INSERT INTO itens_emprestimo (id_emprestimo, id_livro, quantidade)
         VALUES (?, ?, ?)`,
        [idEmprestimo, idLivro, quantidade],
      );
    }
  }

  async devolverItens(conn, idEmprestimo) {
    const [itens] = await conn.execute(
      'SELECT id_livro, quantidade FROM itens_emprestimo WHERE id_emprestimo = ?',
      [idEmprestimo],
    );

    for (const item of itens) {
      await conn.execute('UPDATE livros SET quantidade = quantidade + ? WHERE id_livro = ?', [
        Number(item.quantidade),
        Number(item.id_livro),
      ]);
    }

    return itens;
  }

  async findAll() {
    const [rows] = await pool.execute(
      `SELECT e.*, u.nome AS usuario_nome, COUNT(i.id_item) AS total_itens
       FROM emprestimos e
       INNER JOIN usuarios u ON u.id_usuario = e.id_usuario
       LEFT JOIN itens_emprestimo i ON i.id_emprestimo = e.id_emprestimo
       GROUP BY e.id_emprestimo, u.nome
       ORDER BY e.id_emprestimo DESC`,
    );

    return rows;
  }

  async findById(id) {
    const [emprestimos] = await pool.execute(
      `SELECT e.*, u.nome AS usuario_nome
       FROM emprestimos e
       INNER JOIN usuarios u ON u.id_usuario = e.id_usuario
       WHERE e.id_emprestimo = ?`,
      [id],
    );

    if (!emprestimos[0]) {
      return null;
    }

    const [itens] = await pool.execute(
      `SELECT i.*, l.titulo AS livro_titulo
       FROM itens_emprestimo i
       INNER JOIN livros l ON l.id_livro = i.id_livro
       WHERE i.id_emprestimo = ?
       ORDER BY i.id_item`,
      [id],
    );

    return {
      ...emprestimos[0],
      itens,
    };
  }

  async update(id, emprestimo) {
    const conn = await pool.getConnection();

    try {
      await conn.beginTransaction();

      const [existentes] = await conn.execute(
        'SELECT id_emprestimo FROM emprestimos WHERE id_emprestimo = ? FOR UPDATE',
        [id],
      );

      if (!existentes[0]) {
        throw new ErrorResponse('Emprestimo nao encontrado', 404);
      }

      await this.devolverItens(conn, id);
      await conn.execute('DELETE FROM itens_emprestimo WHERE id_emprestimo = ?', [id]);
      await conn.execute(
        `UPDATE emprestimos
         SET nome_leitor = ?, data_devolucao = ?, status = ?
         WHERE id_emprestimo = ?`,
        [
          emprestimo.nome_leitor,
          emprestimo.data_devolucao || null,
          emprestimo.status || 'aberto',
          id,
        ],
      );

      await this.inserirItens(conn, id, emprestimo.itens);
      await conn.commit();
      return this.findById(id);
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  async delete(id) {
    const conn = await pool.getConnection();

    try {
      await conn.beginTransaction();

      const [existentes] = await conn.execute(
        'SELECT id_emprestimo FROM emprestimos WHERE id_emprestimo = ? FOR UPDATE',
        [id],
      );

      if (!existentes[0]) {
        await conn.rollback();
        return false;
      }

      await this.devolverItens(conn, id);
      await conn.execute('DELETE FROM emprestimos WHERE id_emprestimo = ?', [id]);
      await conn.commit();
      return true;
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }
}

module.exports = EmprestimoDAO;
