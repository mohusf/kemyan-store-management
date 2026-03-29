import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  corsOrigins: process.env.CORS_ORIGINS || 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET || 'kemyan-jwt-secret-change-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '8h',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  redisHost: process.env.REDIS_HOST || 'localhost',
  redisPort: parseInt(process.env.REDIS_PORT, 10) || 6379,
  redisPassword: process.env.REDIS_PASSWORD || '',
  uploadDir: process.env.UPLOAD_DIR || './uploads',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 10 * 1024 * 1024, // 10MB
  defaultLanguage: process.env.DEFAULT_LANGUAGE || 'ar',
  timezone: process.env.TZ || 'Asia/Riyadh',
}));
