@echo off
echo Starting React Chatbot and Landing Page...
echo.

echo Starting React development server...
start "React Chatbot" cmd /k "cd chatbot && npm start"

echo.
echo Waiting 5 seconds for React server to start...
timeout /t 5 /nobreak > nul

echo.
echo Starting Landing Page server...
echo Opening landing page in browser...
start "Landing Page" http://localhost:8080

echo.
echo Starting simple HTTP server for landing page...
cd landing
python -m http.server 8080

pause
