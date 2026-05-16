@echo off
title Biblioteca Geek - Iniciar Tudo
echo ==========================================
echo Biblioteca Geek - Apresentacao
echo ==========================================
echo.
echo 1. Confirme que o MySQL esta ligado no XAMPP.
echo 2. Este script abre MongoDB e o sistema Node.js.
echo 3. Mantenha as janelas abertas durante a demonstracao.
echo.

cd /d "%~dp0..\.."

echo Abrindo MongoDB em uma nova janela...
start "Biblioteca Geek - MongoDB" "%~dp0iniciar_mongodb.bat"

echo Aguardando MongoDB iniciar...
timeout /t 5 /nobreak > nul

echo Abrindo sistema Node.js em uma nova janela...
start "Biblioteca Geek - Sistema" "%~dp0iniciar_sistema.bat"

echo Aguardando o sistema responder...
timeout /t 5 /nobreak > nul

echo Abrindo navegador...
start "" "http://localhost:3000"

echo.
echo Pronto. Se o navegador nao carregar de primeira, aguarde alguns segundos e atualize.
pause
