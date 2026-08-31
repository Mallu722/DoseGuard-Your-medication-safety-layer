@echo off
echo Starting DoseGuard...
echo =====================

REM Check if MongoDB is running
tasklist /fi "IMAGENAME eq mongod.exe" | find /i "mongod.exe" >nul
if %errorlevel% neq 0 (
    echo [WARNING] MongoDB is not running. Please start MongoDB first.
    echo    On Windows: Start MongoDB from Services or run 'mongod'
    echo    Or install MongoDB from https://www.mongodb.com/try/download/community
    echo.
)

echo [OK] Checking dependencies...

REM Install backend dependencies if needed
if not exist "backend\node_modules" (
    echo [INSTALL] Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

REM Install frontend dependencies if needed
if not exist "frontend\node_modules" (
    echo [INSTALL] Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

echo [START] Starting DoseGuard servers...
echo.
echo [INFO] Backend API: http://localhost:5000
echo [INFO] Frontend App: http://localhost:3000
echo.
echo [INFO] Press Ctrl+C to stop all servers
echo.

call npm run dev