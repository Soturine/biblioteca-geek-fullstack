# Como Rodar com XAMPP MySQL e MongoDB no Windows

Este guia foi escrito para apresentação do projeto em Windows usando XAMPP para MySQL e MongoDB rodando separadamente.

## Importante

- O XAMPP liga apenas o **MySQL**.
- O MongoDB **não vem no XAMPP**.
- O MongoDB precisa ficar aberto durante a apresentação para registrar logs e exportar XML.
- O sistema abre em `http://localhost:3000`.

## Modo fácil

1. Abra o **XAMPP Control Panel**.
2. Clique em **Start** no MySQL.
3. Dê dois cliques em:

```text
scripts/windows/iniciar_tudo.bat
```

Esse script abre uma janela para o MongoDB, outra para o sistema Node.js e depois abre o navegador em `http://localhost:3000`.

## Modo manual

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

```powershell
mysql -u root -p < database/schema.sql
mysql -u root -p biblioteca_geek < database/inserts.sql
```

No XAMPP, normalmente o usuário é `root` e a senha fica vazia.

### 4. Iniciar MongoDB

Crie a pasta de dados, se ela ainda não existir:

```powershell
mkdir C:\data\db
```

Inicie o MongoDB:

```powershell
"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath C:\data\db
```

Ou use:

```text
scripts/windows/iniciar_mongodb.bat
```

### 5. Iniciar o sistema

```powershell
npm install
npm start
```

Ou use:

```text
scripts/windows/iniciar_sistema.bat
```

## Conferir MongoDB e logs

Rode:

```powershell
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
2. Conecte em:

```text
mongodb://127.0.0.1:27017
```

3. Abra o banco `biblioteca_geek_logs`.
4. Abra a collection `logs`.
5. Faça login no sistema e atualize o Compass para ver novos logs.

## Valores corretos do `.env`

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=biblioteca_geek
MONGO_URI=mongodb://127.0.0.1:27017
MONGO_DATABASE=biblioteca_geek_logs
PORT=3000
```
