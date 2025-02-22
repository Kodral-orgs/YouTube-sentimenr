#!/bin/bash
set -e

# Start the development servers
if [ "$CODESPACE_NAME" ]; then
    # Running in GitHub Codespaces
    echo "Starting services in Codespaces environment..."
    
    # Start backend server
    flask run --host=0.0.0.0 --port=5000 &
    
    # Start frontend development server
    cd frontend && npm run dev &
else
    # Running locally
    echo "Starting services in local environment..."
    docker-compose up -d
fi