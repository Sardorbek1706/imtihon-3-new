#!/bin/bash

# Navigate to the project directory
cd "$(dirname "$0")/.."

# Install dependencies
npm install

# Run database migrations
npm run migrate

# Start the application
npm start