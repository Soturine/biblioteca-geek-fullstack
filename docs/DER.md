# DER - Biblioteca Geek

O DER representa o banco MySQL principal do sistema. Os logs ficam separados no MongoDB, na collection `logs`.

```mermaid
erDiagram
    USUARIOS ||--o{ EMPRESTIMOS : realiza
    AUTORES ||--o{ LIVROS : escreve
    CATEGORIAS ||--o{ LIVROS : classifica
    EMPRESTIMOS ||--o{ ITENS_EMPRESTIMO : possui
    LIVROS ||--o{ ITENS_EMPRESTIMO : aparece_em
    USUARIOS ||--o{ RESERVAS : faz
    LIVROS ||--o{ RESERVAS : reservado_em

    USUARIOS {
        int id_usuario PK
        string nome
        string email UK
        string senha_hash
        string perfil
        datetime criado_em
    }

    AUTORES {
        int id_autor PK
        string nome
        string nacionalidade
    }

    CATEGORIAS {
        int id_categoria PK
        string nome UK
    }

    LIVROS {
        int id_livro PK
        string titulo
        int ano
        int quantidade
        string imagem
        int paginas
        text sinopse
        string editora
        string isbn
        int id_autor FK
        int id_categoria FK
    }

    EMPRESTIMOS {
        int id_emprestimo PK
        int id_usuario FK
        string nome_leitor
        date data_emprestimo
        date data_devolucao
        string status
    }

    ITENS_EMPRESTIMO {
        int id_item PK
        int id_emprestimo FK
        int id_livro FK
        int quantidade
    }

    RESERVAS {
        int id_reserva PK
        int id_usuario FK
        int id_livro FK
        datetime data_reserva
        date data_prevista_retirada
        string status
        string observacao
    }
```

## Relacionamentos

| Relacionamento              | Tipo | Campo                                   |
| --------------------------- | ---- | --------------------------------------- |
| Usuário realiza empréstimos | 1:N  | `emprestimos.id_usuario`                |
| Autor escreve livros        | 1:N  | `livros.id_autor`                       |
| Categoria classifica livros | 1:N  | `livros.id_categoria`                   |
| Empréstimo possui itens     | 1:N  | `itens_emprestimo.id_emprestimo`        |
| Livro aparece em itens      | 1:N  | `itens_emprestimo.id_livro`             |
| Empréstimos e livros        | N:N  | tabela intermediária `itens_emprestimo` |
| Usuário faz reservas        | 1:N  | `reservas.id_usuario`                   |
| Livro aparece em reservas   | 1:N  | `reservas.id_livro`                     |
