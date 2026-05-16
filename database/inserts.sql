USE biblioteca_geek;

INSERT INTO usuarios (nome, email, senha_hash, perfil) VALUES
('Administrador', 'admin@admin.com', '$2a$10$tJ0khRnmoowhw/ISDWBBRujD6BkE3FqEH7oJmyvwD3SD9L43QJcSq', 'admin');

INSERT INTO autores (nome, nacionalidade) VALUES
('J. R. R. Tolkien', 'Britanica'),
('Isaac Asimov', 'Russa-Americana'),
('Ursula K. Le Guin', 'Americana');

INSERT INTO categorias (nome) VALUES
('Fantasia'),
('Ficcao Cientifica'),
('HQ e Graphic Novel');

INSERT INTO livros (titulo, ano, quantidade, imagem, id_autor, id_categoria) VALUES
('O Hobbit', 1937, 3, '/uploads/capas-demo/o-hobbit.svg', 1, 1),
('O Senhor dos Aneis', 1954, 3, '/uploads/capas-demo/o-senhor-dos-aneis.svg', 1, 1),
('Fundacao', 1951, 4, '/uploads/capas-demo/fundacao.svg', 2, 2),
('Eu, Robo', 1950, 2, '/uploads/capas-demo/eu-robo.svg', 2, 2),
('A Mao Esquerda da Escuridao', 1969, 2, '/uploads/capas-demo/mao-esquerda-escuridao.svg', 3, 2);

INSERT INTO emprestimos (id_usuario, nome_leitor, data_emprestimo, data_devolucao, status) VALUES
(1, 'Peter Parker', '2026-05-01', '2026-05-15', 'aberto'),
(1, 'Diana Prince', '2026-05-03', NULL, 'aberto');

INSERT INTO itens_emprestimo (id_emprestimo, id_livro, quantidade) VALUES
(1, 1, 1),
(1, 3, 1),
(2, 5, 1);
