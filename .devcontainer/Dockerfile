FROM mcr.microsoft.com/devcontainers/javascript-node:18

# Install additional dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    vim \
    postgresql-client \
    redis-tools \
    && rm -rf /var/lib/apt/lists/*

# Install Keeper CLI
RUN curl -sSL https://keepersecurity.com/api/rest/keeper-cli/install.sh | bash

# Install Newman (Postman CLI)
RUN npm install -g newman newman-reporter-htmlextra

# Set up workspace
WORKDIR /workspace

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Expose ports
EXPOSE 3000 8000 5432 6379
