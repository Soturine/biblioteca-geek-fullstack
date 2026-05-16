USE biblioteca_geek;

-- Migration para projetos MySQL que ainda possuem a tabela livros sem detalhes.
-- Execute apenas uma vez se a sua versão do MySQL não aceitar ADD COLUMN IF NOT EXISTS.
ALTER TABLE livros
  ADD COLUMN paginas INT NOT NULL DEFAULT 0 AFTER imagem,
  ADD COLUMN sinopse TEXT AFTER paginas,
  ADD COLUMN editora VARCHAR(120) AFTER sinopse,
  ADD COLUMN isbn VARCHAR(30) AFTER editora;
