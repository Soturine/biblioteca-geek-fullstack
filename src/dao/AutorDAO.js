const IDAO = require('../interfaces/IDAO');
const pool = require('../config/mysql_database');

class AutorDAO extends IDAO {
  async create(autor) {
    const [result] = await pool.execute('INSERT INTO autores (nome, nacionalidade) VALUES (?, ?)', [
      autor.nome,
      autor.nacionalidade || null,
    ]);

    return this.findById(result.insertId);
  }

  async findAll() {
    const [rows] = await pool.execute('SELECT * FROM autores ORDER BY nome');
    return rows;
  }

  async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM autores WHERE id_autor = ?', [id]);
    return rows[0] || null;
  }

  async findByNome(nome) {
    const [rows] = await pool.execute('SELECT * FROM autores WHERE LOWER(nome) = LOWER(?)', [nome]);
    return rows[0] || null;
  }

  async update(id, autor) {
    await pool.execute('UPDATE autores SET nome = ?, nacionalidade = ? WHERE id_autor = ?', [
      autor.nome,
      autor.nacionalidade || null,
      id,
    ]);
    return this.findById(id);
  }

  async delete(id) {
    const [result] = await pool.execute('DELETE FROM autores WHERE id_autor = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = AutorDAO;
