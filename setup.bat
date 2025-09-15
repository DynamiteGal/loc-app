@echo off
echo ========================================
echo   Location-Based Notes App Setup
echo ========================================
echo.

echo Starting the application with Docker...
echo.

echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.

echo Starting services...
docker-compose up --build

pause
