USE biblioteca_geek;

INSERT INTO usuarios (nome, email, senha_hash, perfil) VALUES
('Administrador', 'admin@admin.com', '$2a$10$tJ0khRnmoowhw/ISDWBBRujD6BkE3FqEH7oJmyvwD3SD9L43QJcSq', 'admin');

INSERT INTO autores (nome, nacionalidade) VALUES
('Arthur C. Clarke', 'Britânica'),
('Anthony Burgess', 'Britânica'),
('Richard Matheson', 'Americana'),
('George Orwell', 'Britânica'),
('H. G. Wells', 'Britânica'),
('Daniel Keyes', 'Americana'),
('Frank Herbert', 'Americana'),
('Isaac Asimov', 'Russa-Americana'),
('William Gibson', 'Canadense-Americana'),
('Douglas Adams', 'Britânica'),
('Philip K. Dick', 'Americana'),
('Ursula K. Le Guin', 'Americana'),
('J. R. R. Tolkien', 'Britânica'),
('Alan Moore', 'Britânica'),
('Neil Gaiman', 'Britânica'),
('Neal Stephenson', 'Americana'),
('Ernest Cline', 'Americana');

INSERT INTO categorias (nome) VALUES
('Ficção Científica'),
('Distopia'),
('Fantasia'),
('Cyberpunk'),
('HQ e Graphic Novel'),
('Terror Geek');

INSERT INTO livros (
  titulo, ano, quantidade, imagem, paginas, sinopse, editora, isbn, id_autor, id_categoria
) VALUES
('2001: Uma Odisseia no Espaço', 1968, 4, '/uploads/capas-demo/2001-uma-odisseia-no-espaco.svg', 288, 'Uma missão espacial encontra sinais de uma inteligência antiga e transforma a relação humana com o cosmos. A narrativa mistura mistério, tecnologia e evolução.', 'Editora Monólito', '978-85-100-0001-4', 1, 1),
('Laranja Mecânica', 1962, 3, '/uploads/capas-demo/laranja-mecanica.svg', 224, 'Alex vive em uma sociedade violenta onde liberdade, punição e controle se confundem. A obra usa distopia e linguagem própria para discutir escolha e condicionamento.', 'Editora Korova', '978-85-100-0002-1', 2, 2),
('Eu Sou a Lenda', 1954, 3, '/uploads/capas-demo/eu-sou-a-lenda.svg', 288, 'Um homem tenta sobreviver em uma cidade tomada por criaturas noturnas e pela solidão. A história combina horror, ciência e a pergunta sobre quem realmente se tornou o monstro.', 'Editora Último Refúgio', '978-85-100-0003-8', 3, 6),
('1984', 1949, 4, '/uploads/capas-demo/1984.svg', 336, 'Winston Smith vive sob vigilância permanente em um regime que controla memória, linguagem e verdade. É uma distopia sobre poder, medo e resistência íntima.', 'Editora Grande Irmão', '978-85-100-0004-5', 4, 2),
('O Fim da Infância', 1953, 3, '/uploads/capas-demo/o-fim-da-infancia.svg', 256, 'A chegada de seres superiores encerra conflitos humanos, mas cobra um preço estranho para o futuro da espécie. A obra une maravilhamento cósmico e melancolia.', 'Editora Overlord', '978-85-100-0005-2', 1, 1),
('A Máquina do Tempo', 1895, 3, '/uploads/capas-demo/a-maquina-do-tempo.svg', 176, 'Um viajante atravessa eras futuras e encontra versões inquietantes da humanidade. O livro usa aventura científica para observar classe, evolução e decadência.', 'Editora Cronos', '978-85-100-0006-9', 5, 1),
('Flores para Algernon', 1966, 3, '/uploads/capas-demo/flores-para-algernon.svg', 288, 'Charlie passa por um experimento que amplia sua inteligência e muda sua forma de ver o mundo. A ficção científica aparece de modo sensível, humano e doloroso.', 'Editora Algernon', '978-85-100-0007-6', 6, 1),
('Duna', 1965, 5, '/uploads/capas-demo/duna.svg', 688, 'Em um planeta desértico, política, religião e ecologia se cruzam em torno de uma substância valiosa. Paul Atreides precisa sobreviver a traições e profecias.', 'Editora Arrakis', '978-85-100-0008-3', 7, 1),
('Fundação', 1951, 4, '/uploads/capas-demo/fundacao.svg', 255, 'Um cientista prevê a queda de um império galáctico e cria um plano para reduzir séculos de caos. A narrativa combina política, ciência e estratégia histórica.', 'Editora Psico-História', '978-85-100-0009-0', 8, 1),
('Eu, Robô', 1950, 3, '/uploads/capas-demo/eu-robo.svg', 320, 'Robôs e humanos testam limites éticos em histórias conectadas por tecnologia e responsabilidade. As três leis aparecem como ponto de partida para dilemas complexos.', 'Editora Positrônica', '978-85-100-0010-6', 8, 1),
('Neuromancer', 1984, 3, '/uploads/capas-demo/neuromancer.svg', 336, 'Um hacker decadente recebe uma última chance em um mundo de redes, corporações e inteligências artificiais. A história tem clima urbano, tecnologia e paranoia.', 'Editora Matrix', '978-85-100-0011-3', 9, 4),
('O Guia do Mochileiro das Galáxias', 1979, 4, '/uploads/capas-demo/o-guia-do-mochileiro-das-galaxias.svg', 208, 'Arthur Dent é levado para o espaço pouco antes de a Terra ser destruída. A aventura usa humor para transformar o universo em uma confusão divertida.', 'Editora Babel Peixe', '978-85-100-0012-0', 10, 1),
('Androides Sonham com Ovelhas Elétricas?', 1968, 3, '/uploads/capas-demo/androides-sonham-com-ovelhas-eletricas.svg', 288, 'Em um futuro desgastado, caçadores de androides questionam o que torna alguém humano. A obra mistura ficção científica, empatia e identidade.', 'Editora Nexus', '978-85-100-0013-7', 11, 1),
('A Mão Esquerda da Escuridão', 1969, 2, '/uploads/capas-demo/mao-esquerda-escuridao.svg', 304, 'Um emissário visita um planeta gelado e precisa compreender uma sociedade muito diferente da sua. O livro fala de cultura, confiança e alteridade.', 'Editora Gethen', '978-85-100-0014-4', 12, 1),
('O Hobbit', 1937, 3, '/uploads/capas-demo/o-hobbit.svg', 310, 'Bilbo Bolseiro sai do conforto do Condado para uma jornada com anões, tesouros e dragões. A aventura mistura humor, coragem e descoberta.', 'Editora Condado', '978-85-100-0015-1', 13, 3),
('O Senhor dos Anéis', 1954, 3, '/uploads/capas-demo/o-senhor-dos-aneis.svg', 1216, 'A Terra-média enfrenta uma sombra antiga enquanto pequenos heróis carregam uma missão enorme. É uma fantasia sobre amizade, poder e resistência.', 'Editora Terra Média', '978-85-100-0016-8', 13, 3),
('Watchmen', 1986, 2, '/uploads/capas-demo/watchmen.svg', 416, 'Heróis aposentados investigam uma conspiração em um mundo politicamente tenso. A obra questiona poder, vigilância e moralidade.', 'Editora Nona Arte', '978-85-100-0017-5', 14, 5),
('Sandman: Prelúdios e Noturnos', 1989, 3, '/uploads/capas-demo/sandman-preludios-e-noturnos.svg', 240, 'Sonho retorna ao mundo depois de décadas preso e tenta recuperar seus artefatos. A fantasia sombria mistura mitologia, horror e poesia visual.', 'Editora Sonhar', '978-85-100-0018-2', 15, 5),
('Snow Crash', 1992, 3, '/uploads/capas-demo/snow-crash.svg', 480, 'Um entregador e hacker atravessa ruas caóticas e ambientes virtuais para investigar uma ameaça linguística. O livro mistura ação, metaverso e sátira tecnológica.', 'Editora Metaverso', '978-85-100-0019-9', 16, 4),
('Jogador Número 1', 2011, 4, '/uploads/capas-demo/jogador-numero-1.svg', 464, 'Em um futuro difícil, jovens competem dentro de um mundo virtual cheio de referências pop. A aventura celebra jogos, cultura geek e busca por identidade.', 'Editora Oasis', '978-85-100-0020-5', 17, 1);

INSERT INTO emprestimos (id_usuario, nome_leitor, data_emprestimo, data_devolucao, status) VALUES
(1, 'Peter Parker', '2026-05-01', '2026-05-15', 'aberto'),
(1, 'Diana Prince', '2026-05-03', NULL, 'aberto');

INSERT INTO itens_emprestimo (id_emprestimo, id_livro, quantidade) VALUES
(1, 1, 1),
(1, 8, 1),
(2, 14, 1);
