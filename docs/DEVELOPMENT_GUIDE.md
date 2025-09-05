# Development Guide - Practice Environment

## 🚀 Quick Start Commands

```bash
# Start development workflow
./scripts/dev-workflow.sh start

# Run full development cycle
./scripts/dev-workflow.sh cycle

# Run tests only
./scripts/dev-workflow.sh test
```

## 🛠️ Development Workflows

### 1. Daily Development Routine

```bash
# Morning setup
git pull origin main
./scripts/dev-workflow.sh start

# Development work
# ... make your changes ...

# Before committing
./scripts/dev-workflow.sh lint
./scripts/dev-workflow.sh test

# Commit and push
git add .
git commit -m "feat: your changes"
git push origin main
```

### 2. API Development Workflow

1. **Create new endpoint** in `src/routes/api.js`
2. **Test manually** via web interface at `http://localhost:8000`
3. **Add Postman tests** in `postman/collections/`
4. **Run automated tests** with `npm run test:postman`
5. **Commit changes** following conventional commits

### 3. Postman Integration Workflow

```bash
# Export collections from Postman app
# Save to: postman/collections/

# Test with Newman CLI
newman run postman/collections/practice-api.postman_collection.json \
       -e postman/environments/development.postman_environment.json

# Generate HTML report
newman run postman/collections/practice-api.postman_collection.json \
       -e postman/environments/development.postman_environment.json \
       --reporters htmlextra \
       --reporter-htmlextra-export reports/api-tests.html
```

## 🐳 DevContainer Usage

### Opening in DevContainer

1. Open VS Code in project directory
2. Install "Remote - Containers" extension
3. Click "Reopen in Container" when prompted
4. Container will auto-setup with all tools

### Container Features

- **Node.js 18** - Latest LTS version
- **Docker-in-Docker** - For containerized deployments
- **GitHub CLI** - For repository management
- **Newman** - Postman CLI for automated testing
- **Keeper CLI** - Secrets management
- **PostgreSQL Client** - Database connectivity
- **Redis Tools** - Cache management

## 📡 API Testing Strategies

### 1. Manual Testing
- Use web interface at `http://localhost:8000`
- Test endpoints interactively
- View real-time responses

### 2. Postman GUI Testing
- Import collections from `postman/collections/`
- Use environments from `postman/environments/`
- Create test suites with assertions

### 3. Automated Testing
```bash
# Jest unit tests
npm test

# Postman integration tests
npm run test:postman

# Combined test suite
./scripts/dev-workflow.sh test
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

Triggered on:
- Push to `main` branch
- Pull requests to `main`
- Manual workflow dispatch

Pipeline stages:
1. **Test** - Jest and Postman tests
2. **Security** - Snyk vulnerability scanning
3. **Deploy** - Vercel deployment (main branch only)

### Environment Variables Required

```bash
# GitHub Secrets needed:
SNYK_TOKEN=your_snyk_token
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

## 🔒 Security Best Practices

### Code Security
- **ESLint** - Code quality and security rules
- **Helmet.js** - Security headers middleware
- **CORS** - Cross-origin request protection
- **Input validation** - Request body validation

### Dependency Security
- **Snyk scanning** - Automated vulnerability detection
- **npm audit** - Regular dependency audits
- **Dependabot** - Automated security updates

### Secrets Management
- **Environment variables** - Never commit secrets
- **Keeper CLI** - Secure secrets storage
- **.env.example** - Template for required variables

## 📊 Monitoring & Observability

### Local Development
- **Morgan logging** - HTTP request logging
- **Health endpoint** - `/health` for status checks
- **Error handling** - Comprehensive error middleware

### Production Monitoring
- **New Relic APM** - Application performance monitoring
- **GitHub Actions logs** - CI/CD pipeline monitoring
- **Vercel analytics** - Deployment and runtime metrics

## 🎯 Common Development Tasks

### Adding New API Endpoint

1. **Define route** in `src/routes/api.js`:
```javascript
router.get('/new-endpoint', (req, res) => {
  res.json({ message: 'New endpoint' });
});
```

2. **Add Postman test**:
```json
{
  "name": "Test New Endpoint",
  "request": {
    "method": "GET",
    "url": "{{base_url}}/api/v1/new-endpoint"
  },
  "event": [{
    "listen": "test",
    "script": {
      "exec": [
        "pm.test('Status code is 200', function () {",
        "    pm.response.to.have.status(200);",
        "});"
      ]
    }
  }]
}
```

3. **Test and commit**:
```bash
./scripts/dev-workflow.sh test
git add .
git commit -m "feat: add new endpoint"
```

### Database Integration

1. **Install database client**:
```bash
npm install pg  # PostgreSQL
# or
npm install redis  # Redis
```

2. **Add connection configuration**:
```javascript
// src/config/database.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

module.exports = pool;
```

3. **Use in routes**:
```javascript
const db = require('../config/database');

router.get('/users', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## 🚀 Deployment Options

### Vercel (Recommended)
- **Automatic** - Via GitHub Actions
- **Manual** - `vercel --prod`
- **Preview** - Automatic on PR creation

### Docker Deployment
```bash
# Build image
docker build -t practice-api .

# Run container
docker run -p 8000:8000 practice-api
```

### Traditional Hosting
```bash
# Build for production
npm run build

# Start production server
NODE_ENV=production npm start
```

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Postman Learning Center](https://learning.postman.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Documentation](https://vercel.com/docs)
- [NXT Gen Evo Standards](../README.md)

---

**Happy Coding!** 🎉
