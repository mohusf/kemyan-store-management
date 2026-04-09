import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => {
    // Support DATABASE_URL (Neon, Render, Railway) or individual env vars
    const databaseUrl = process.env.DATABASE_URL;

    const baseConfig: TypeOrmModuleOptions = {
      type: 'postgres',
      entities: [__dirname + '/../modules/**/entities/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../migrations/*{.ts,.js}'],
      synchronize: false,
      logging: process.env.DB_LOGGING === 'true',
      ssl:
        process.env.DB_SSL === 'true' || process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : false,
      extra: {
        max: parseInt(process.env.DB_POOL_MAX, 10) || 20,
        idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT, 10) || 30000,
      },
    };

    if (databaseUrl) {
      return {
        ...baseConfig,
        url: databaseUrl,
      };
    }

    return {
      ...baseConfig,
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'kemyan',
      password: process.env.DB_PASSWORD || 'kemyan_secret',
      database: process.env.DB_DATABASE || 'kemyan_store',
      schema: process.env.DB_SCHEMA || 'public',
    };
  },
);
