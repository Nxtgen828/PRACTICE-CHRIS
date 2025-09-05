#!/bin/bash

# NXT Gen Evo Development Workflow Script
# Usage: ./scripts/dev-workflow.sh [command]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  NXT Gen Evo Practice Workflow${NC}"
    echo -e "${BLUE}================================${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if server is running
check_server() {
    if curl -s http://localhost:8000/health > /dev/null 2>&1; then
        print_success "API server is running on port 8000"
        return 0
    else
        print_warning "API server is not running"
        return 1
    fi
}

# Start development server
start_server() {
    print_header
    echo "Starting development server..."
    
    if check_server; then
        print_warning "Server is already running"
        return 0
    fi
    
    echo "Installing dependencies..."
    npm install
    
    echo "Starting server in background..."
    npm start &
    
    # Wait for server to start
    sleep 3
    
    if check_server; then
        print_success "Development server started successfully"
        echo -e "${BLUE}🌐 Web Interface: http://localhost:8000${NC}"
        echo -e "${BLUE}📡 API Endpoints: http://localhost:8000/api/v1${NC}"
    else
        print_error "Failed to start development server"
        exit 1
    fi
}

# Run tests
run_tests() {
    print_header
    echo "Running comprehensive tests..."
    
    if ! check_server; then
        print_error "Server must be running to execute tests"
        exit 1
    fi
    
    echo "Running Jest tests..."
    npm test || true
    
    echo "Running Postman/Newman tests..."
    newman run postman/collections/practice-api.postman_collection.json \
           -e postman/environments/development.postman_environment.json \
           --reporters cli,htmlextra \
           --reporter-htmlextra-export newman-report.html
    
    print_success "All tests completed"
    echo -e "${BLUE}📊 Test Report: newman-report.html${NC}"
}

# Lint and format code
lint_code() {
    print_header
    echo "Linting and formatting code..."
    
    echo "Running ESLint..."
    npm run lint || true
    
    echo "Running Prettier..."
    npm run format
    
    print_success "Code linting and formatting completed"
}

# Deploy to staging
deploy_staging() {
    print_header
    echo "Deploying to staging environment..."
    
    # Run tests first
    run_tests
    
    # Commit changes
    git add .
    git commit -m "feat: staging deployment $(date '+%Y-%m-%d %H:%M:%S')" || true
    
    # Push to staging branch
    git checkout -b staging 2>/dev/null || git checkout staging
    git merge main
    git push origin staging
    
    print_success "Deployed to staging environment"
}

# Full development cycle
full_cycle() {
    print_header
    echo "Running full development cycle..."
    
    start_server
    lint_code
    run_tests
    
    print_success "Full development cycle completed successfully"
    echo -e "${GREEN}🎉 Your Practice environment is ready for development!${NC}"
}

# Show help
show_help() {
    print_header
    echo "Available commands:"
    echo "  start     - Start development server"
    echo "  test      - Run all tests (Jest + Postman)"
    echo "  lint      - Lint and format code"
    echo "  deploy    - Deploy to staging"
    echo "  cycle     - Run full development cycle"
    echo "  help      - Show this help message"
    echo ""
    echo "Usage: ./scripts/dev-workflow.sh [command]"
}

# Main script logic
case "${1:-help}" in
    "start")
        start_server
        ;;
    "test")
        run_tests
        ;;
    "lint")
        lint_code
        ;;
    "deploy")
        deploy_staging
        ;;
    "cycle")
        full_cycle
        ;;
    "help"|*)
        show_help
        ;;
esac
