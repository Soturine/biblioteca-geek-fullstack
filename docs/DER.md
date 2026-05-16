# DER - Biblioteca Geek

```mermaid
erDiagram
    USUARIOS ||--o{ EMPRESTIMOS : realiza
    AUTORES ||--o{ LIVROS : escreve
    CATEGORIAS ||--o{ LIVROS : classifica
    EMPRESTIMOS ||--o{ ITENS_EMPRESTIMO : possui
    LIVROS ||--o{ ITENS_EMPRESTIMO : aparece_em

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
        string editora
        string isbn
        text sinopse
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
```

## Relacionamentos

| Relacionamento              | Tipo | Implementação                           |
| --------------------------- | ---- | --------------------------------------- |
| Usuário realiza empréstimos | 1:N  | `emprestimos.id_usuario`                |
| Autor escreve livros        | 1:N  | `livros.id_autor`                       |
| Categoria classifica livros | 1:N  | `livros.id_categoria`                   |
| Empréstimo possui itens     | 1:N  | `itens_emprestimo.id_emprestimo`        |
| Livros aparecem em itens    | 1:N  | `itens_emprestimo.id_livro`             |
| Empréstimos e livros        | N:N  | tabela intermediária `itens_emprestimo` |

## Observação

A tabela `livros` possui campos descritivos para melhorar a tela de detalhes e o relatório:
`paginas`, `sinopse`, `editora` e `isbn`.
