@echo off
title Biblioteca Geek - Sistema Node.js
echo ==========================================
echo Biblioteca Geek - Iniciar Sistema
echo ==========================================
echo.

cd /d "%~dp0..\.."

netstat -ano | findstr ":3000" | findstr "LISTENING" > nul
if %errorlevel%==0 (
  echo A porta 3000 ja esta em uso.
  echo O sistema pode ja estar aberto em http://localhost:3000
  echo Se precisar encerrar a porta, use scripts\windows\parar_porta_3000.bat
  echo.
  start "" "http://localhost:3000"
  pause
  exit /b 0
)

if not exist "node_modules" (
  echo Instalando dependencias com npm install...
  call npm install
  if errorlevel 1 (
    echo Erro ao instalar dependencias.
    pause
    exit /b 1
  )
)

echo Abrindo navegador em http://localhost:3000 ...
start "" "http://localhost:3000"
echo.
echo Iniciando servidor Node.js. Mantenha esta janela aberta.
echo.
call npm start

pause
