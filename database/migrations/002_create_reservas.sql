USE biblioteca_geek;

CREATE TABLE IF NOT EXISTS reservas (
  id_reserva INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_livro INT NOT NULL,
  data_reserva DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  data_prevista_retirada DATE NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'aguardando',
  observacao VARCHAR(255),
  CONSTRAINT fk_reservas_usuarios
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
    ON UPDATE RESTRICT
    ON DELETE RESTRICT,
  CONSTRAINT fk_reservas_livros
    FOREIGN KEY (id_livro) REFERENCES livros(id_livro)
    ON UPDATE RESTRICT
    ON DELETE RESTRICT
) ENGINE=InnoDB;
