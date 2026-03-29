# ============================================================
# Stage 1 - Build
# ============================================================
FROM node:20-alpine AS build

WORKDIR /app

# Copy workspace root files needed for npm workspaces
COPY package.json package-lock.json* ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/shared/package.json ./packages/shared/

# Install all dependencies (workspace-aware)
RUN npm ci --workspace=apps/backend --workspace=packages/shared --include-workspace-root

# Copy shared package source
COPY packages/shared/ ./packages/shared/

# Copy backend source
COPY apps/backend/ ./apps/backend/

# Build the backend
RUN npm run build -w apps/backend

# ============================================================
# Stage 2 - Production
# ============================================================
FROM node:20-alpine AS production

WORKDIR /app

# Create non-root user
RUN addgroup -S kemyan && adduser -S kemyan -G kemyan

# Copy built artefacts and production dependencies
COPY --from=build /app/apps/backend/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/backend/package.json ./

# Set ownership
RUN chown -R kemyan:kemyan /app

USER kemyan

EXPOSE 3000

CMD ["node", "dist/main.js"]
