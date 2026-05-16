@echo off
title Biblioteca Geek - MongoDB
echo ==========================================
echo Biblioteca Geek - Iniciar MongoDB
echo ==========================================
echo.
echo Esta janela deve ficar aberta durante a apresentacao.
echo O XAMPP nao inicia o MongoDB. Ele precisa rodar separado.
echo.

if not exist "C:\data\db" (
  echo Criando pasta C:\data\db ...
  mkdir "C:\data\db"
)

set "MONGOD=C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe"

if not exist "%MONGOD%" (
  echo ERRO: MongoDB nao encontrado em:
  echo %MONGOD%
  echo.
  echo Instale o MongoDB Community Server 8.0 ou ajuste este .bat.
  echo.
  pause
  exit /b 1
)

echo Iniciando MongoDB em mongodb://127.0.0.1:27017 ...
echo Banco de dados em C:\data\db
echo.
"%MONGOD%" --dbpath C:\data\db

echo.
echo O MongoDB foi encerrado.
pause
