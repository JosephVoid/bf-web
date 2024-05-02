#!/bin/bash

# Check if node and npm are installed
if ! command -v node &> /dev/null || ! command -v npm &> /dev/null; then
    echo "Node.js and/or npm are not installed. Installing..."
    # Install node and npm (assuming a Linux environment with apt package manager)
    sudo apt update
    sudo apt install nodejs npm -y
fi

# Function to run commands and log output with date and time stamps
run_and_log() {
    # Check if npm_output.txt exists, create if it doesn't
    if [ ! -e npm_output.txt ]; then
        touch npm_output.txt
    fi
    # Run command and append output with date and time stamps to npm_output.txt
    {
        echo "[$(date +'%Y-%m-%d %H:%M:%S')] Running command: $@"
        "$@"
    } >> npm_output.txt 2>&1
}

# Run npm install
echo "Running npm install..."
run_and_log npm install

# Run npm run build
echo "Running npm run build..."
run_and_log npm run build

# Run npm start in the background
echo "Running npm start in the background..."
run_and_log npm start &

echo "Process started in the background. Check npm_output.txt for logs."
