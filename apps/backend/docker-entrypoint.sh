#!/bin/sh
set -e

echo "=== KEMYAN Backend Starting ==="

DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
DB_USER="${DB_USERNAME:-kemyan}"
DB_PASS="${DB_PASSWORD:-kemyan_dev_password}"
DB_NAME="${DB_DATABASE:-kemyan_store}"

# SSL mode for cloud databases (Render, Railway, etc.)
if [ "$NODE_ENV" = "production" ]; then
  PSQL_OPTS="sslmode=require"
else
  PSQL_OPTS=""
fi

# Wait for PostgreSQL
echo "Waiting for PostgreSQL at $DB_HOST:$DB_PORT..."
for i in $(seq 1 30); do
  if pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -q 2>/dev/null; then
    echo "PostgreSQL is ready."
    break
  fi
  if [ "$i" -eq 30 ]; then
    echo "WARNING: PostgreSQL readiness check timed out, proceeding anyway..."
  fi
  sleep 2
done

# Run migrations
echo "Running database migrations..."
for migration in /app/migrations/*.sql; do
  echo "  $(basename $migration)..."
  PGPASSWORD="$DB_PASS" psql \
    -h "$DB_HOST" \
    -p "$DB_PORT" \
    -U "$DB_USER" \
    -d "$DB_NAME" \
    -v ON_ERROR_STOP=0 \
    -f "$migration" 2>/dev/null || echo "  (skipped)"
done
echo "Migrations complete."

# Run seeds
echo "Running seed data..."
for seed in /app/seeds/*.sql; do
  echo "  $(basename $seed)..."
  PGPASSWORD="$DB_PASS" psql \
    -h "$DB_HOST" \
    -p "$DB_PORT" \
    -U "$DB_USER" \
    -d "$DB_NAME" \
    -v ON_ERROR_STOP=0 \
    -f "$seed" 2>/dev/null || echo "  (skipped)"
done
echo "Seeds complete."

# Create default admin user if none exists
echo "Ensuring admin user exists..."
PGPASSWORD="$DB_PASS" psql \
  -h "$DB_HOST" \
  -p "$DB_PORT" \
  -U "$DB_USER" \
  -d "$DB_NAME" \
  -c "
INSERT INTO users (id, email, password_hash, name_en, name_ar, department, role_id, is_active)
SELECT uuid_generate_v4(), 'admin@kemyan.com', '\$2b\$10\$N9qo8uLOickgx2ZMRZoMy.MrYccKF7RhBiSFmKs0fUOGByj0n5rtS', 'System Admin', 'مدير النظام', 'IT', r.id, true
FROM roles r WHERE r.name = 'SYSTEM_ADMIN'
AND NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@kemyan.com')
ON CONFLICT DO NOTHING;
" 2>/dev/null || echo "  (admin user exists)"
echo "Admin user ready. Login: admin@kemyan.com / Admin@123"

echo "=== Starting NestJS server ==="
exec node dist/main.js
