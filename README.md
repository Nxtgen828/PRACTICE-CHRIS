# Practice Chris - NXT Gen Evo Environment

A comprehensive practice environment following NXT Gen Evo standards with integrated GitHub and Postman workflows.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker
- GitHub CLI
- Postman (optional, for GUI testing)

### Setup
1. Clone the repository:
```bash
git clone https://github.com/Nxtgen828/PRACTICE-CHRIS.git
cd PRACTICE-CHRIS
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:8000`

## 🐳 DevContainer Setup

This project includes a complete DevContainer configuration for consistent development environments:

1. Open in VS Code
2. Install the "Remote - Containers" extension
3. Click "Reopen in Container" when prompted
4. The container will automatically set up with all required tools

### Included Tools
- Node.js 18
- Docker-in-Docker
- GitHub CLI
- Newman (Postman CLI)
- Keeper CLI
- PostgreSQL client
- Redis tools

## 📡 API Endpoints

### Base URL: `http://localhost:8000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| GET | `/health` | Health check |
| GET | `/api/v1/items` | Get all items |
| GET | `/api/v1/items/:id` | Get item by ID |
| POST | `/api/v1/items` | Create new item |
| PUT | `/api/v1/items/:id` | Update item |
| DELETE | `/api/v1/items/:id` | Delete item |

## 🧪 Testing with Postman

### Collections
- **Practice API Collection**: Complete API test suite located in `postman/collections/`

### Environments
- **Development**: `postman/environments/development.postman_environment.json`
- **Test**: `postman/environments/test.postman_environment.json`

### Running Tests
```bash
# Run all Postman tests
npm run test:postman

# Run with Newman CLI
newman run postman/collections/practice-api.postman_collection.json -e postman/environments/development.postman_environment.json
```

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run test         # Run Jest tests
npm run test:postman # Run Postman tests
npm run lint         # Lint code
npm run format       # Format code with Prettier
```

## 🚀 Deployment

### GitHub Actions
Automated deployment pipeline includes:
- Unit testing
- Postman API testing
- Security scanning with Snyk
- Deployment to Vercel

### Manual Deployment
```bash
npm run build
# Deploy to your preferred platform
```

## 🔒 Security & Monitoring

### Required Environment Variables
```bash
# New Relic Monitoring
NEW_RELIC_LICENSE_KEY=your_license_key
NEW_RELIC_APP_NAME=Practice Chris API

# Deployment
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

### Security Features
- Helmet.js for security headers
- CORS configuration
- Input validation
- Error handling middleware

## 📁 Project Structure

```
PRACTICE-CHRIS/
├── .devcontainer/          # DevContainer configuration
├── .github/workflows/      # GitHub Actions
├── src/
│   ├── routes/            # API routes
│   └── server.js          # Express server
├── postman/
│   ├── collections/       # Postman collections
│   └── environments/      # Postman environments
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Run tests: `npm test && npm run test:postman`
4. Commit: `git commit -m "feat: your feature"`
5. Push: `git push origin feature/your-feature`
6. Create a Pull Request

## 📝 License

MIT License - see LICENSE file for details.

---

**NXT Gen Evo Practice Environment** - Built with ❤️ following industry best practices.
