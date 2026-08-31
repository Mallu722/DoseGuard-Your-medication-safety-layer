#!/bin/bash

echo "Starting DoseGuard..."
echo "====================="

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first."
    echo "   On macOS: brew services start mongodb-community"
    echo "   On Ubuntu: sudo systemctl start mongodb"
    echo "   On Windows: Start MongoDB from Services"
    exit 1
fi

echo "✅ MongoDB is running"

# Install backend dependencies if needed
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend
    npm install
    cd ..
fi

# Install frontend dependencies if needed
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
fi

echo "🚀 Starting DoseGuard..."
echo ""
echo "📝 Backend API: http://localhost:5000"
echo "💻 Frontend App: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

npm run dev