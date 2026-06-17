# DER - Biblioteca Geek

O DER representa o banco relacional MySQL principal do sistema **Biblioteca Geek**.
Os logs de requisições, ações de negócio e erros ficam separados no MongoDB, no banco `biblioteca_geek_logs`, collection `logs`.

```mermaid
erDiagram
    USUARIOS ||--o{ EMPRESTIMOS : realiza
    USUARIOS ||--o{ RESERVAS : faz
    AUTORES ||--o{ LIVROS : escreve
    CATEGORIAS ||--o{ LIVROS : classifica
    EMPRESTIMOS ||--o{ ITENS_EMPRESTIMO : possui
    LIVROS ||--o{ ITENS_EMPRESTIMO : aparece_em
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

## Entidades

| Entidade           | Descrição                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| `usuarios`         | Armazena os usuários do sistema, incluindo administradores e leitores.                            |
| `autores`          | Armazena os autores dos livros cadastrados.                                                       |
| `categorias`       | Armazena as categorias usadas para classificar os livros.                                         |
| `livros`           | Armazena os livros do acervo, incluindo capa, quantidade, páginas, editora, ISBN e sinopse.       |
| `emprestimos`      | Armazena os empréstimos realizados no sistema.                                                    |
| `itens_emprestimo` | Liga empréstimos e livros, permitindo que um empréstimo tenha um ou mais livros.                  |
| `reservas`         | Armazena as reservas feitas pelos leitores para livros disponíveis ou aguardando retirada futura. |

## Relacionamentos

| Relacionamento                       | Tipo | Campo usado                          |
| ------------------------------------ | ---- | ------------------------------------ |
| Usuário realiza empréstimos          | 1:N  | `emprestimos.id_usuario`             |
| Usuário faz reservas                 | 1:N  | `reservas.id_usuario`                |
| Autor escreve livros                 | 1:N  | `livros.id_autor`                    |
| Categoria classifica livros          | 1:N  | `livros.id_categoria`                |
| Empréstimo possui itens              | 1:N  | `itens_emprestimo.id_emprestimo`     |
| Livro aparece em itens de empréstimo | 1:N  | `itens_emprestimo.id_livro`          |
| Livro pode ser reservado             | 1:N  | `reservas.id_livro`                  |
| Empréstimos e livros                 | N:N  | relação feita por `itens_emprestimo` |

## Observação sobre MongoDB

O MongoDB não faz parte do DER relacional porque é usado separadamente para registrar logs do sistema.
Ele armazena informações como acessos, ações de negócio, erros, login, reservas, exportação XML e outras requisições importantes para manutenção e auditoria.
