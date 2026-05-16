@echo off
title Biblioteca Geek - Parar Porta 3000
echo ==========================================
echo Biblioteca Geek - Parar Porta 3000
echo ==========================================
echo.

for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000" ^| findstr "LISTENING"') do (
  set "PID_PORTA=%%a"
)

if "%PID_PORTA%"=="" (
  echo Nenhum processo encontrado usando a porta 3000.
  pause
  exit /b 0
)

echo Processo encontrado na porta 3000: PID %PID_PORTA%
set /p CONFIRMA="Deseja encerrar esse processo? (S/N): "

if /I "%CONFIRMA%"=="S" (
  taskkill /PID %PID_PORTA% /F
  echo Processo encerrado.
) else (
  echo Nenhuma alteracao feita.
)

pause
