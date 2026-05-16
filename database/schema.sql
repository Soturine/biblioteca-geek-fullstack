CREATE DATABASE IF NOT EXISTS biblioteca_geek
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE biblioteca_geek;

DROP TABLE IF EXISTS itens_emprestimo;
DROP TABLE IF EXISTS emprestimos;
DROP TABLE IF EXISTS livros;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS autores;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  perfil VARCHAR(30) NOT NULL DEFAULT 'usuario',
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE autores (
  id_autor INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  nacionalidade VARCHAR(80)
) ENGINE=InnoDB;

CREATE TABLE categorias (
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(80) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE livros (
  id_livro INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(180) NOT NULL,
  ano INT NOT NULL,
  quantidade INT NOT NULL DEFAULT 0,
  imagem VARCHAR(255),
  id_autor INT NOT NULL,
  id_categoria INT NOT NULL,
  CONSTRAINT fk_livros_autores
    FOREIGN KEY (id_autor) REFERENCES autores(id_autor)
    ON UPDATE RESTRICT
    ON DELETE RESTRICT,
  CONSTRAINT fk_livros_categorias
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
    ON UPDATE RESTRICT
    ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE emprestimos (
  id_emprestimo INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  nome_leitor VARCHAR(120) NOT NULL,
  data_emprestimo DATE NOT NULL DEFAULT (CURRENT_DATE),
  data_devolucao DATE,
  status VARCHAR(30) NOT NULL DEFAULT 'aberto',
  CONSTRAINT fk_emprestimos_usuarios
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
    ON UPDATE RESTRICT
    ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE itens_emprestimo (
  id_item INT AUTO_INCREMENT PRIMARY KEY,
  id_emprestimo INT NOT NULL,
  id_livro INT NOT NULL,
  quantidade INT NOT NULL,
  CONSTRAINT fk_itens_emprestimos
    FOREIGN KEY (id_emprestimo) REFERENCES emprestimos(id_emprestimo)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_itens_livros
    FOREIGN KEY (id_livro) REFERENCES livros(id_livro)
    ON UPDATE RESTRICT
    ON DELETE RESTRICT
) ENGINE=InnoDB;
