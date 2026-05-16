const IDAO = require('../interfaces/IDAO');
const pool = require('../config/mysql_database');

class LivroDAO extends IDAO {
  async create(livro) {
    // Prepared statements evitam SQL injection e mantêm o SQL fora dos Services.
    const [result] = await pool.execute(
      `INSERT INTO livros
       (titulo, ano, quantidade, imagem, paginas, sinopse, editora, isbn, id_autor, id_categoria)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        livro.titulo,
        Number(livro.ano),
        Number(livro.quantidade),
        livro.imagem || null,
        Number(livro.paginas || 0),
        livro.sinopse || null,
        livro.editora || null,
        livro.isbn || null,
        Number(livro.id_autor),
        Number(livro.id_categoria),
      ],
    );

    return this.findById(result.insertId);
  }

  async findAll(filtros = {}) {
    const params = [];
    let where = '';

    if (filtros.busca) {
      where = 'WHERE l.titulo LIKE ?';
      params.push(`%${filtros.busca}%`);
    }

    const [rows] = await pool.execute(
      `SELECT l.*, a.nome AS autor_nome, c.nome AS categoria_nome
       FROM livros l
       INNER JOIN autores a ON a.id_autor = l.id_autor
       INNER JOIN categorias c ON c.id_categoria = l.id_categoria
       ${where}
       ORDER BY l.titulo`,
      params,
    );

    return rows;
  }

  async findById(id) {
    const [rows] = await pool.execute(
      `SELECT l.*, a.nome AS autor_nome, c.nome AS categoria_nome
       FROM livros l
       INNER JOIN autores a ON a.id_autor = l.id_autor
       INNER JOIN categorias c ON c.id_categoria = l.id_categoria
       WHERE l.id_livro = ?`,
      [id],
    );

    return rows[0] || null;
  }

  async findDuplicado(titulo, idAutor, idCategoria) {
    const [rows] = await pool.execute(
      `SELECT *
       FROM livros
       WHERE LOWER(titulo) = LOWER(?)
         AND id_autor = ?
         AND id_categoria = ?`,
      [titulo, Number(idAutor), Number(idCategoria)],
    );

    return rows[0] || null;
  }

  async update(id, livro) {
    await pool.execute(
      `UPDATE livros
       SET titulo = ?, ano = ?, quantidade = ?, imagem = COALESCE(?, imagem),
           paginas = ?, sinopse = ?, editora = ?, isbn = ?,
           id_autor = ?, id_categoria = ?
       WHERE id_livro = ?`,
      [
        livro.titulo,
        Number(livro.ano),
        Number(livro.quantidade),
        livro.imagem || null,
        Number(livro.paginas || 0),
        livro.sinopse || null,
        livro.editora || null,
        livro.isbn || null,
        Number(livro.id_autor),
        Number(livro.id_categoria),
        id,
      ],
    );

    return this.findById(id);
  }

  async updateImagem(id, imagem) {
    await pool.execute('UPDATE livros SET imagem = ? WHERE id_livro = ?', [imagem, id]);
    return this.findById(id);
  }

  async delete(id) {
    const [result] = await pool.execute('DELETE FROM livros WHERE id_livro = ?', [id]);
    return result.affectedRows > 0;
  }

  async relatorio(filtros = {}) {
    const params = [];
    let where = '';

    if (filtros.categoria) {
      where = 'WHERE l.id_categoria = ?';
      params.push(Number(filtros.categoria));
    }

    const [rows] = await pool.execute(
      `SELECT l.id_livro, l.titulo, l.ano, l.quantidade, l.paginas, l.editora, l.isbn,
              a.nome AS autor, c.nome AS categoria
       FROM livros l
       INNER JOIN autores a ON a.id_autor = l.id_autor
       INNER JOIN categorias c ON c.id_categoria = l.id_categoria
       ${where}
       ORDER BY c.nome, l.titulo`,
      params,
    );

    return rows;
  }

  async livrosPorCategoria() {
    const [rows] = await pool.execute(
      `SELECT c.id_categoria, c.nome AS categoria,
              COUNT(l.id_livro) AS quantidade_livros,
              COALESCE(SUM(l.quantidade), 0) AS quantidade_exemplares
       FROM categorias c
       LEFT JOIN livros l ON l.id_categoria = c.id_categoria
       GROUP BY c.id_categoria, c.nome
       ORDER BY c.nome`,
    );

    return rows;
  }
}

module.exports = LivroDAO;
