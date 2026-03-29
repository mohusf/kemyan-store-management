# ============================================================
# Stage 1 - Build
# ============================================================
FROM node:20-alpine AS build

WORKDIR /app

# Copy workspace root files needed for npm workspaces
COPY package.json package-lock.json* ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/shared/package.json ./packages/shared/

# Install all dependencies (workspace-aware)
RUN npm ci --workspace=apps/frontend --workspace=packages/shared --include-workspace-root

# Copy shared package source
COPY packages/shared/ ./packages/shared/

# Copy frontend source
COPY apps/frontend/ ./apps/frontend/

# Build the frontend
RUN npm run build -w apps/frontend

# ============================================================
# Stage 2 - Serve with Nginx
# ============================================================
FROM nginx:alpine AS production

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static assets
COPY --from=build /app/apps/frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
