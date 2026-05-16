# Testes da API

Use a URL base:

```text
http://localhost:3000/api/v1
```

## 1. Health check

```http
GET /health
```

Resposta esperada:

```json
{
  "success": true,
  "message": "API Biblioteca Geek online",
  "data": {
    "status": "online"
  }
}
```

## 2. Login

```http
POST /auth/login
Content-Type: application/json
```

Body:

```json
{
  "email": "admin@admin.com",
  "senha": "123456"
}
```

Resposta esperada:

```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "token": "JWT_AQUI",
    "usuario": {
      "id_usuario": 1,
      "nome": "Administrador",
      "email": "admin@admin.com",
      "perfil": "admin"
    }
  }
}
```

Nas próximas requisições use:

```http
Authorization: Bearer JWT_AQUI
```

## 3. Criar autor

```http
POST /autores
Authorization: Bearer JWT_AQUI
Content-Type: application/json
```

Body:

```json
{
  "nome": "Neil Gaiman",
  "nacionalidade": "Britânica"
}
```

Resposta esperada: status `201`.

## 4. Criar categoria

```http
POST /categorias
Authorization: Bearer JWT_AQUI
Content-Type: application/json
```

Body:

```json
{
  "nome": "Cyberpunk"
}
```

Resposta esperada: status `201`.

## 5. Criar livro

```http
POST /livros
Authorization: Bearer JWT_AQUI
Content-Type: application/json
```

Body:

```json
{
  "titulo": "Neuromancer",
  "ano": 1984,
  "quantidade": 2,
  "paginas": 336,
  "editora": "Editora Matrix",
  "isbn": "978-85-000-0010-3",
  "sinopse": "Um hacker encara redes perigosas em um futuro dominado por tecnologia.",
  "id_autor": 1,
  "id_categoria": 2
}
```

Resposta esperada: status `201`.

## 6. Listar livros

```http
GET /livros
Authorization: Bearer JWT_AQUI
```

Resposta esperada: status `200` e array em `data`.

## 7. Pesquisar livros

```http
GET /livros?busca=Hobbit
Authorization: Bearer JWT_AQUI
```

Resposta esperada: livros com titulo parecido.

## 8. Buscar livro por ID

```http
GET /livros/1
Authorization: Bearer JWT_AQUI
```

Resposta esperada: status `200`.

## 9. Atualizar livro

```http
PUT /livros/1
Authorization: Bearer JWT_AQUI
Content-Type: application/json
```

Body:

```json
{
  "titulo": "O Hobbit - Edição Geek",
  "ano": 1937,
  "quantidade": 3,
  "paginas": 310,
  "editora": "Editora Condado",
  "isbn": "978-85-000-0001-1",
  "sinopse": "Bilbo participa de uma jornada inesperada com anões, mapas e coragem.",
  "id_autor": 1,
  "id_categoria": 1
}
```

Resposta esperada: status `200`.

## 10. Excluir livro

```http
DELETE /livros/1
Authorization: Bearer JWT_AQUI
```

Resposta esperada: status `204`. Se o livro estiver vinculado a empréstimo, o MySQL pode bloquear por integridade referencial.

## 11. Upload de imagem

```http
POST /livros/2/imagem
Authorization: Bearer JWT_AQUI
Content-Type: multipart/form-data
```

Campo do arquivo:

```text
imagem
```

Resposta esperada: status `200` e campo `imagem` preenchido.

## 12. Exportar JSON

```http
GET /json/exportar/livros
Authorization: Bearer JWT_AQUI
```

Resposta esperada: status `200`.

## 13. Importar JSON

```http
POST /json/importar/autores
Authorization: Bearer JWT_AQUI
Content-Type: multipart/form-data
```

Campo do arquivo:

```text
arquivo
```

Conteudo:

```json
[
  {
    "nome": "Frank Herbert",
    "nacionalidade": "Americana"
  }
]
```

Resposta esperada:

```json
{
  "success": true,
  "message": "JSON importado com sucesso",
  "data": {
    "total_processados": 1,
    "importados": 1,
    "ignorados_duplicidade": 0,
    "erros_quantidade": 0,
    "duplicidades": [],
    "erros": []
  }
}
```

## 14. Exportar XML de logs

Este teste exige MongoDB ligado na porta configurada no `.env`.

```http
GET /logs/exportar/xml
Authorization: Bearer JWT_AQUI
```

Com filtros:

```http
GET /logs/exportar/xml?usuario=admin&dataInicio=2026-01-01&dataFim=2026-12-31
```

Resposta esperada: arquivo XML.

## 15. Relatório de livros

```http
GET /relatorios/livros
Authorization: Bearer JWT_AQUI
```

Com filtro:

```http
GET /relatorios/livros?categoria=1
```

Resposta esperada: status `200`, total, páginas e array de livros.

## 16. Dados do gráfico

```http
GET /graficos/livros-por-categoria
Authorization: Bearer JWT_AQUI
```

Resposta esperada: categorias com quantidade de livros.
