# Docker Deployment Guide - NXT Gen Evo Standards

## 🐳 Docker Configuration

### Multi-Stage Build
The Dockerfile uses a multi-stage build for optimized production images:
- **Builder stage**: Installs dependencies and prepares application
- **Production stage**: Creates minimal runtime image with security hardening

### Security Features
- Non-root user execution (nodejs:1001)
- Read-only root filesystem
- Security updates via Alpine packages
- Dumb-init for proper signal handling
- Health checks for container monitoring

## 🚀 Deployment Options

### 1. Local Development with Docker
```bash
# Build image
docker build -t practice-api .

# Run container
docker run -p 8000:8000 --env-file .env practice-api

# View logs
docker logs -f <container_id>
```

### 2. Docker Compose (Recommended)
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up --build -d
```

### 3. Production Kubernetes Deployment
```bash
# Create namespace
kubectl create namespace nxtgen-evo

# Apply secrets (update with actual values first)
kubectl apply -f k8s/secrets.yaml

# Deploy application
kubectl apply -f k8s/

# Check status
kubectl get all -n nxtgen-evo
```

## 📊 Container Registry

### GitHub Container Registry (GHCR)
Images are automatically built and pushed to:
- **Registry**: `ghcr.io/nxtgen828/practice-chris`
- **Authentication**: GitHub token with packages:write permission

### Available Tags
- `latest` - Latest main branch build
- `main` - Main branch builds
- `staging` - Staging branch builds  
- `dev` - Development branch builds
- `<branch>-<sha>` - Specific commit builds

## 🔧 Environment Configuration

### Required Environment Variables
```bash
# Application
NODE_ENV=production
PORT=8000

# Database
DATABASE_URL=postgresql://user:pass@host:5432/db
REDIS_URL=redis://host:6379

# Monitoring
NEW_RELIC_LICENSE_KEY=your_key
NEW_RELIC_APP_NAME=Practice Chris API

# Security
API_KEY=your_api_key
```

### Kubernetes Secrets
Update `k8s/secrets.yaml` with actual values:
```yaml
stringData:
  database-url: "postgresql://postgres:password@postgres-service:5432/practice_db"
  redis-url: "redis://redis-service:6379"
  newrelic-license: "YOUR_ACTUAL_LICENSE_KEY"
  api-key: "YOUR_ACTUAL_API_KEY"
```

## 🏗️ CI/CD Pipeline

### GitHub Actions Workflow
The pipeline automatically:
1. **Test**: Runs Jest and Postman tests
2. **Security**: Scans with Snyk
3. **Build**: Creates Docker image
4. **Push**: Uploads to GitHub Container Registry
5. **Deploy**: Updates Kubernetes deployment

### Branch Strategy
- `main` → Production deployment
- `staging` → Staging environment
- `dev` → Development environment
- Feature branches → Build only (no deployment)

## 📈 Monitoring & Scaling

### Health Checks
- **Liveness Probe**: `/health` endpoint every 10s
- **Readiness Probe**: `/health` endpoint every 5s
- **Startup Probe**: 30s initial delay

### Horizontal Pod Autoscaler
- **Min Replicas**: 3
- **Max Replicas**: 10
- **CPU Target**: 70%
- **Memory Target**: 80%

### Resource Limits
```yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "250m"
  limits:
    memory: "512Mi"
    cpu: "500m"
```

## 🔒 Security Configuration

### Container Security
- Non-root user execution
- Read-only root filesystem
- Dropped capabilities
- Security context constraints

### Network Security
- Ingress with TLS termination
- Rate limiting (100 req/min)
- CORS configuration
- Security headers via Nginx

### Secrets Management
- Kubernetes secrets for sensitive data
- Keeper Secrets Manager integration
- Environment-specific configurations

## 🛠️ Troubleshooting

### Common Issues

**Container won't start:**
```bash
# Check logs
kubectl logs -f deployment/practice-api -n nxtgen-evo

# Check events
kubectl get events -n nxtgen-evo --sort-by='.lastTimestamp'
```

**Health check failures:**
```bash
# Test health endpoint
kubectl port-forward svc/practice-api-service 8080:80 -n nxtgen-evo
curl http://localhost:8080/health
```

**Image pull errors:**
```bash
# Check registry authentication
kubectl get secret -n nxtgen-evo
kubectl describe pod <pod-name> -n nxtgen-evo
```

### Performance Tuning

**Memory optimization:**
```bash
# Monitor memory usage
kubectl top pods -n nxtgen-evo

# Adjust resource limits in deployment.yaml
```

**CPU optimization:**
```bash
# Monitor CPU usage
kubectl top nodes

# Scale replicas if needed
kubectl scale deployment practice-api --replicas=5 -n nxtgen-evo
```

## 📚 Additional Resources

- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [NXT Gen Evo Standards](../README.md)

---

**Production Ready!** 🚀
