const IDAO = require('../interfaces/IDAO');
const pool = require('../config/mysql_database');

class CategoriaDAO extends IDAO {
  async create(categoria) {
    const [result] = await pool.execute('INSERT INTO categorias (nome) VALUES (?)', [
      categoria.nome,
    ]);

    return this.findById(result.insertId);
  }

  async findAll() {
    const [rows] = await pool.execute('SELECT * FROM categorias ORDER BY nome');
    return rows;
  }

  async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM categorias WHERE id_categoria = ?', [id]);
    return rows[0] || null;
  }

  async findByNome(nome) {
    const [rows] = await pool.execute('SELECT * FROM categorias WHERE LOWER(nome) = LOWER(?)', [
      nome,
    ]);
    return rows[0] || null;
  }

  async update(id, categoria) {
    await pool.execute('UPDATE categorias SET nome = ? WHERE id_categoria = ?', [
      categoria.nome,
      id,
    ]);
    return this.findById(id);
  }

  async delete(id) {
    const [result] = await pool.execute('DELETE FROM categorias WHERE id_categoria = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = CategoriaDAO;
