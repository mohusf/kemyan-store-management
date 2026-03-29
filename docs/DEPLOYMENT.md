# KEMYAN Store Management — Deployment Guide

## Prerequisites

- Node.js 20+ (LTS)
- npm 10+
- Docker & Docker Compose
- PostgreSQL 16+ (or use Docker)
- Redis 7+ (or use Docker)

## Local Development Setup

### 1. Clone and install

```bash
git clone <repository-url>
cd kemyan-store-management
npm install
```

### 2. Start infrastructure

```bash
docker compose up -d postgres redis
```

### 3. Configure environment

```bash
cp .env.example .env
# Edit .env with your local settings
```

### 4. Run database migrations

```bash
# Execute migrations in order
for f in apps/backend/src/database/migrations/*.sql; do
  psql "$DATABASE_URL" -f "$f"
done

# Seed initial data
for f in apps/backend/src/database/seeds/*.sql; do
  psql "$DATABASE_URL" -f "$f"
done
```

### 5. Start development servers

```bash
npm run dev
# Backend: http://localhost:3000
# Frontend: http://localhost:5173
```

## Docker Compose (Full Stack)

```bash
# Build and start all services
docker compose up -d --build

# View logs
docker compose logs -f

# Stop all services
docker compose down
```

Services:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://kemyan:kemyan_dev_password@localhost:5432/kemyan_store` |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379` |
| `JWT_SECRET` | Secret key for JWT signing | (required) |
| `JWT_EXPIRY` | JWT token expiration | `24h` |
| `PORT` | Backend server port | `3000` |
| `CORS_ORIGINS` | Allowed CORS origins | `http://localhost:5173` |
| `NODE_ENV` | Environment | `development` |
| `ZATCA_API_URL` | ZATCA Fatoora Platform URL | (production only) |
| `ZATCA_API_KEY` | ZATCA API key | (production only) |
| `SMTP_HOST` | Email server host | (optional) |
| `SMTP_PORT` | Email server port | `587` |
| `SMTP_USER` | Email username | (optional) |
| `SMTP_PASS` | Email password | (optional) |

## Production Deployment

### Hosting Requirements

- **Region**: STC Cloud or Azure Jeddah (Saudi data residency for PDPL compliance)
- **Compute**: 2+ vCPUs, 4GB+ RAM for backend; 1 vCPU for frontend/nginx
- **Database**: Managed PostgreSQL 16+ with automated backups
- **Cache**: Managed Redis with persistence
- **Storage**: Object storage for documents/SDS files

### SSL/TLS

- Use Let's Encrypt or managed certificates
- Force HTTPS redirect in nginx
- Configure HSTS headers

### Database Backups

- Automated daily backups with 30-day retention
- Point-in-time recovery enabled
- Weekly backup verification tests
- Cross-region backup replication for disaster recovery

### Monitoring

- Application health endpoint: `GET /api/v1/health`
- Database connection pool monitoring
- Redis memory and connection monitoring
- BullMQ queue depth alerts
- Error rate and response time dashboards
