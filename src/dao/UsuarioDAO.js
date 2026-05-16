const IDAO = require('../interfaces/IDAO');
const pool = require('../config/mysql_database');

class UsuarioDAO extends IDAO {
  async create(usuario) {
    const [result] = await pool.execute(
      'INSERT INTO usuarios (nome, email, senha_hash, perfil) VALUES (?, ?, ?, ?)',
      [usuario.nome, usuario.email, usuario.senha_hash, usuario.perfil || 'usuario']
    );

    return this.findById(result.insertId);
  }

  async findAll() {
    const [rows] = await pool.execute(
      'SELECT id_usuario, nome, email, perfil, criado_em FROM usuarios ORDER BY nome'
    );
    return rows;
  }

  async findById(id) {
    const [rows] = await pool.execute(
      'SELECT id_usuario, nome, email, perfil, criado_em FROM usuarios WHERE id_usuario = ?',
      [id]
    );
    return rows[0] || null;
  }

  async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT id_usuario, nome, email, senha_hash, perfil, criado_em FROM usuarios WHERE email = ?',
      [email]
    );
    return rows[0] || null;
  }

  async update(id, usuario) {
    await pool.execute(
      'UPDATE usuarios SET nome = ?, email = ?, perfil = ? WHERE id_usuario = ?',
      [usuario.nome, usuario.email, usuario.perfil || 'usuario', id]
    );
    return this.findById(id);
  }

  async delete(id) {
    const [result] = await pool.execute('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = UsuarioDAO;
