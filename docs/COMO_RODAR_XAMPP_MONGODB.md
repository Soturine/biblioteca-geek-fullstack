# Como Rodar com XAMPP MySQL e MongoDB no Windows

Este guia foi escrito para apresentação do projeto em Windows usando XAMPP para MySQL e MongoDB rodando separadamente.

## Importante

- O XAMPP liga apenas o **MySQL**.
- O MongoDB **não vem no XAMPP**.
- O MongoDB precisa ficar aberto durante a apresentação para registrar logs e exportar XML.
- O sistema abre em `http://localhost:3000`.

## Passo a passo

### 1. Iniciar MySQL pelo XAMPP

1. Abra o **XAMPP Control Panel**.
2. Clique em **Start** na linha do **MySQL**.
3. Confira se a porta é **3306**.
4. Abra `http://localhost/phpmyadmin`.

### 2. Importar banco pelo phpMyAdmin

1. Clique em **Importar**.
2. Escolha `database/schema.sql`.
3. Execute a importação.
4. Clique no banco `biblioteca_geek`.
5. Clique em **Importar** novamente.
6. Escolha `database/inserts.sql`.
7. Execute a importação.

### 3. Importar banco pelo terminal

Na pasta do projeto:

```text
mysql -u root -p < database/schema.sql
mysql -u root -p biblioteca_geek < database/inserts.sql
```

No XAMPP, normalmente o usuário é `root` e a senha fica vazia.

### 4. Iniciar MongoDB

Crie a pasta de dados, se ela ainda não existir:

```text
mkdir C:\data\db
```

Inicie o MongoDB:

```text
"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath C:\data\db
```

### 5. Configurar `.env`

Use os valores padrão:

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=biblioteca_geek
MONGO_URI=mongodb://127.0.0.1:27017
MONGO_DATABASE=biblioteca_geek_logs
PORT=3000
JWT_SECRET=biblioteca_geek_seguro
JWT_EXPIRES_IN=2h
UPLOAD_DIR=public/uploads
```

### 6. Iniciar o sistema

```text
npm install
npm start
```

Acesse `http://localhost:3000` e faça login com `admin@admin.com` / `123456`.

## Conferir MongoDB e logs

Rode:

```text
npm run check:mongo
```

Saída esperada:

```text
MongoDB conectado com sucesso.
Banco usado: biblioteca_geek_logs
Collection: logs
Quantidade de logs: ...
```

## Conferir no MongoDB Compass

1. Abra o MongoDB Compass.
2. Conecte em `mongodb://127.0.0.1:27017`.
3. Abra o banco `biblioteca_geek_logs`.
4. Abra a collection `logs`.
5. Faça login no sistema e atualize o Compass para ver novos logs.
