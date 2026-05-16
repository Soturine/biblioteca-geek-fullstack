USE biblioteca_geek;

INSERT INTO usuarios (nome, email, senha_hash, perfil) VALUES
('Administrador', 'admin@admin.com', '$2a$10$tJ0khRnmoowhw/ISDWBBRujD6BkE3FqEH7oJmyvwD3SD9L43QJcSq', 'admin');

INSERT INTO autores (nome, nacionalidade) VALUES
('J. R. R. Tolkien', 'Britânica'),
('Isaac Asimov', 'Russa-Americana'),
('Ursula K. Le Guin', 'Americana'),
('Frank Herbert', 'Americana'),
('William Gibson', 'Canadense-Americana'),
('Philip K. Dick', 'Americana'),
('Douglas Adams', 'Britânica'),
('J. K. Rowling', 'Britânica'),
('Rick Riordan', 'Americana'),
('Alan Moore', 'Britânica'),
('Frank Miller', 'Americana'),
('Art Spiegelman', 'Americana'),
('Neil Gaiman', 'Britânica');

INSERT INTO categorias (nome) VALUES
('Fantasia'),
('Ficção Científica'),
('HQ e Graphic Novel'),
('Cyberpunk');

INSERT INTO livros (
  titulo, ano, quantidade, imagem, paginas, sinopse, editora, isbn, id_autor, id_categoria
) VALUES
('O Hobbit', 1937, 3, '/uploads/capas-demo/o-hobbit.svg', 310, 'Bilbo Bolseiro sai do conforto do Condado para uma jornada com anões, tesouros e dragões. A aventura mistura humor, coragem e descoberta.', 'Editora Condado', '978-85-000-0001-1', 1, 1),
('O Senhor dos Anéis', 1954, 3, '/uploads/capas-demo/o-senhor-dos-aneis.svg', 1216, 'A Terra-média enfrenta uma sombra antiga enquanto pequenos heróis carregam uma missão enorme. É uma fantasia sobre amizade, poder e resistência.', 'Editora Terra Média', '978-85-000-0002-8', 1, 1),
('A Sociedade do Anel', 1954, 4, '/uploads/capas-demo/a-sociedade-do-anel.svg', 576, 'Frodo deixa o Condado com um anel perigoso e encontra aliados improváveis pelo caminho. A jornada começa com esperança e perigo crescendo a cada passo.', 'Editora Terra Média', '978-85-000-0003-5', 1, 1),
('As Duas Torres', 1954, 4, '/uploads/capas-demo/as-duas-torres.svg', 464, 'A sociedade se divide e cada grupo enfrenta escolhas difíceis em meio à guerra. A história acompanha coragem, estratégia e lealdade sob pressão.', 'Editora Terra Média', '978-85-000-0004-2', 1, 1),
('O Retorno do Rei', 1955, 4, '/uploads/capas-demo/o-retorno-do-rei.svg', 528, 'A batalha final pela Terra-média se aproxima enquanto a missão do anel chega ao limite. O livro fecha a saga com sacrifício e esperança.', 'Editora Terra Média', '978-85-000-0005-9', 1, 1),
('Fundação', 1951, 4, '/uploads/capas-demo/fundacao.svg', 255, 'Um cientista prevê a queda de um império galáctico e cria um plano para reduzir séculos de caos. A narrativa combina política, ciência e estratégia histórica.', 'Editora Psico-História', '978-85-000-0006-6', 2, 2),
('Eu, Robô', 1950, 2, '/uploads/capas-demo/eu-robo.svg', 320, 'Robôs e humanos testam limites éticos em histórias conectadas por tecnologia e responsabilidade. As três leis aparecem como ponto de partida para dilemas complexos.', 'Editora Positrônica', '978-85-000-0007-3', 2, 2),
('O Fim da Eternidade', 1955, 3, '/uploads/capas-demo/o-fim-da-eternidade.svg', 256, 'Guardas do tempo alteram pequenos eventos para proteger a humanidade, mas uma escolha pessoal ameaça todo o sistema. É uma viagem sobre destino e controle.', 'Editora Temporal', '978-85-000-0008-0', 2, 2),
('Duna', 1965, 5, '/uploads/capas-demo/duna.svg', 688, 'Em um planeta desértico, política, religião e ecologia se cruzam em torno de uma substância valiosa. Paul Atreides precisa sobreviver a traições e profecias.', 'Editora Arrakis', '978-85-000-0009-7', 4, 2),
('Neuromancer', 1984, 3, '/uploads/capas-demo/neuromancer.svg', 336, 'Um hacker decadente recebe uma última chance em um mundo de redes, corporações e inteligências artificiais. A história tem clima urbano, tecnologia e paranoia.', 'Editora Matrix', '978-85-000-0010-3', 5, 4),
('Androides Sonham com Ovelhas Elétricas?', 1968, 3, '/uploads/capas-demo/androides-sonham-com-ovelhas-eletricas.svg', 288, 'Em um futuro desgastado, caçadores de androides questionam o que torna alguém humano. A obra mistura ficção científica, empatia e identidade.', 'Editora Nexus', '978-85-000-0011-0', 6, 2),
('O Guia do Mochileiro das Galáxias', 1979, 4, '/uploads/capas-demo/o-guia-do-mochileiro-das-galaxias.svg', 208, 'Arthur Dent é levado para o espaço pouco antes de a Terra ser destruída. A aventura usa humor para transformar o universo em uma confusão divertida.', 'Editora Babel Peixe', '978-85-000-0012-7', 7, 2),
('A Mão Esquerda da Escuridão', 1969, 2, '/uploads/capas-demo/mao-esquerda-escuridao.svg', 304, 'Um emissário visita um planeta gelado e precisa compreender uma sociedade muito diferente da sua. O livro fala de cultura, confiança e alteridade.', 'Editora Gethen', '978-85-000-0013-4', 3, 2),
('O Feiticeiro de Terramar', 1968, 3, '/uploads/capas-demo/o-feiticeiro-de-terramar.svg', 240, 'Ged descobre o poder da magia e também o peso dos próprios erros. A jornada acompanha amadurecimento, equilíbrio e responsabilidade.', 'Editora Arquipélago', '978-85-000-0014-1', 3, 1),
('Harry Potter e a Pedra Filosofal', 1997, 5, '/uploads/capas-demo/harry-potter-e-a-pedra-filosofal.svg', 264, 'Um garoto descobre uma escola de magia e um passado que ainda o alcança. A história apresenta amizade, mistério e encanto em um mundo secreto.', 'Editora Coruja', '978-85-000-0015-8', 8, 1),
('Percy Jackson e o Ladrão de Raios', 2005, 4, '/uploads/capas-demo/percy-jackson-e-o-ladrao-de-raios.svg', 400, 'Percy descobre que mitos gregos caminham pelo mundo moderno e que ele está no centro de uma acusação divina. A aventura mistura humor, ação e heróis improváveis.', 'Editora Olimpo', '978-85-000-0016-5', 9, 1),
('Watchmen', 1986, 2, '/uploads/capas-demo/watchmen.svg', 416, 'Heróis aposentados investigam uma conspiração em um mundo politicamente tenso. A obra questiona poder, vigilância e moralidade.', 'Editora Nona Arte', '978-85-000-0017-2', 10, 3),
('Batman: Ano Um', 1987, 3, '/uploads/capas-demo/batman-ano-um.svg', 144, 'Bruce Wayne e Jim Gordon chegam a Gotham tentando enfrentar corrupção e medo. A história mostra o início urbano e humano do vigilante.', 'Editora Gotham', '978-85-000-0018-9', 11, 3),
('Maus', 1986, 2, '/uploads/capas-demo/maus.svg', 296, 'Um filho registra memórias familiares marcadas por guerra, sobrevivência e trauma. A linguagem de quadrinhos torna o relato direto e sensível.', 'Editora Memória Gráfica', '978-85-000-0019-6', 12, 3),
('Sandman: Prelúdios e Noturnos', 1989, 3, '/uploads/capas-demo/sandman-preludios-e-noturnos.svg', 240, 'Sonho retorna ao mundo depois de décadas preso e tenta recuperar seus artefatos. A fantasia sombria mistura mitologia, horror e poesia visual.', 'Editora Sonhar', '978-85-000-0020-2', 13, 3);

INSERT INTO emprestimos (id_usuario, nome_leitor, data_emprestimo, data_devolucao, status) VALUES
(1, 'Peter Parker', '2026-05-01', '2026-05-15', 'aberto'),
(1, 'Diana Prince', '2026-05-03', NULL, 'aberto');

INSERT INTO itens_emprestimo (id_emprestimo, id_livro, quantidade) VALUES
(1, 1, 1),
(1, 6, 1),
(2, 13, 1);
