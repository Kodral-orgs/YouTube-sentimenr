#!/bin/bash
set -e

# Create and activate Python virtual environment
python -m venv .venv
source .venv/bin/activate

# Install Python dependencies
pip install --no-cache-dir -r requirements.txt

# Install NLTK data
python -m nltk.downloader punkt vader_lexicon

# Install Node.js dependencies
npm install

# Setup database
if [ -f "./backend/init.sql" ]; then
    PGPASSWORD=postgres psql -h localhost -U postgres -d youtube_analyzer -f ./backend/init.sql
fi

# Add any additional setup steps here