# Como Rodar com XAMPP MySQL e MongoDB no Windows

## 1. Iniciar o MySQL pelo XAMPP

1. Abra o **XAMPP Control Panel**.
2. Clique em **Start** na linha do **MySQL**.
3. Confira se o MySQL ficou ativo na porta **3306**.
4. Se a porta estiver ocupada, feche outro MySQL aberto ou ajuste o XAMPP.

## 2. Abrir phpMyAdmin

Acesse no navegador:

```text
http://localhost/phpmyadmin
```

## 3. Importar o banco pelo phpMyAdmin

1. Clique em **Importar**.
2. Escolha o arquivo `database/schema.sql`.
3. Execute a importacao.
4. Clique no banco `biblioteca_geek`.
5. Clique em **Importar** novamente.
6. Escolha o arquivo `database/inserts.sql`.
7. Execute a importacao.

## 4. Importar o banco pelo terminal

Na pasta do projeto:

```powershell
mysql -u root -p < database/schema.sql
mysql -u root -p biblioteca_geek < database/inserts.sql
```

No XAMPP normalmente o usuario e `root` e a senha fica vazia.

## 5. MongoDB nao vem no XAMPP

O MongoDB precisa ser instalado separadamente. Ele e usado apenas para logs do sistema.

Para iniciar pelo Windows:

1. Abra **Services**.
2. Procure **MongoDB Server**.
3. Clique em **Start**.

Ou pelo terminal:

```powershell
mongod
```

## 6. Conferir logs no MongoDB Compass

1. Abra o MongoDB Compass.
2. Conecte em:

```text
mongodb://127.0.0.1:27017
```

3. Faca login no sistema para gerar o primeiro log.
4. O banco `biblioteca_geek_logs` e a collection `logs` devem aparecer.

## 7. Valores corretos do `.env`

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

## 8. Rodar a aplicacao

```powershell
npm install
npm start
```

Acesse:

```text
http://localhost:3000
```
