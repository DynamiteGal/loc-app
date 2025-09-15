@echo off
echo ========================================
echo   Location-Based Notes API Demo
echo ========================================
echo.

set API_URL=http://localhost:5000
set TOKEN=my-secret-token-123

echo Testing API endpoints...
echo API URL: %API_URL%
echo Token: %TOKEN%
echo.

echo 1. Health Check:
curl -s "%API_URL%/health"
echo.
echo.

echo 2. Get all notes:
curl -s -H "Authorization: Bearer %TOKEN%" "%API_URL%/notes"
echo.
echo.

echo 3. Create a test note:
curl -s -X POST -H "Content-Type: application/json" -H "Authorization: Bearer %TOKEN%" -d "{\"title\":\"Demo Note\",\"content\":\"This is a demo note created via API\",\"latitude\":40.7128,\"longitude\":-74.0060}" "%API_URL%/notes"
echo.
echo.

echo 4. Get all notes again:
curl -s -H "Authorization: Bearer %TOKEN%" "%API_URL%/notes"
echo.
echo.

echo Demo completed! Check the frontend at http://localhost:3000
pause
