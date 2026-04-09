#!/bin/sh
set -e

echo "=== KEMYAN Backend Starting ==="

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL..."
until pg_isready -h "${DB_HOST:-postgres}" -p "${DB_PORT:-5432}" -U "${DB_USERNAME:-kemyan}" -q 2>/dev/null; do
  sleep 1
done
echo "PostgreSQL is ready."

# Run migrations
echo "Running database migrations..."
PGPASSWORD="${DB_PASSWORD:-kemyan_dev_password}" psql \
  -h "${DB_HOST:-postgres}" \
  -p "${DB_PORT:-5432}" \
  -U "${DB_USERNAME:-kemyan}" \
  -d "${DB_DATABASE:-kemyan_store}" \
  -v ON_ERROR_STOP=1 \
  -f /app/migrations/001_create_extensions.sql 2>/dev/null || true

for migration in /app/migrations/*.sql; do
  echo "  Running $(basename $migration)..."
  PGPASSWORD="${DB_PASSWORD:-kemyan_dev_password}" psql \
    -h "${DB_HOST:-postgres}" \
    -p "${DB_PORT:-5432}" \
    -U "${DB_USERNAME:-kemyan}" \
    -d "${DB_DATABASE:-kemyan_store}" \
    -v ON_ERROR_STOP=0 \
    -f "$migration" 2>/dev/null || echo "  (already applied or skipped)"
done
echo "Migrations complete."

# Run seed files
echo "Running seed data..."
for seed in /app/seeds/*.sql; do
  echo "  Seeding $(basename $seed)..."
  PGPASSWORD="${DB_PASSWORD:-kemyan_dev_password}" psql \
    -h "${DB_HOST:-postgres}" \
    -p "${DB_PORT:-5432}" \
    -U "${DB_USERNAME:-kemyan}" \
    -d "${DB_DATABASE:-kemyan_store}" \
    -v ON_ERROR_STOP=0 \
    -f "$seed" 2>/dev/null || echo "  (already seeded or skipped)"
done
echo "Seeds complete."

echo "=== Starting NestJS server ==="
exec node dist/main.js
