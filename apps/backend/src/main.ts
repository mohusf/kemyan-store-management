import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Security
  app.use(helmet());
  app.use(compression());

  // CORS
  const corsOrigins = configService.get<string>('app.corsOrigins', '*');
  app.enableCors({
    origin: corsOrigins.split(','),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('api/v1');

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global filters
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('KEMYAN Store Management API')
    .setDescription('API for KEMYAN Chemical Factory Store Management System')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication & Authorization')
    .addTag('materials', 'Material Master Data')
    .addTag('requisitions', 'Purchase Requisitions & Approvals')
    .addTag('procurement', 'Purchase Orders & GRN')
    .addTag('inventory', 'Stock Transactions & Balances')
    .addTag('warehouse', 'Storage Locations & Zones')
    .addTag('suppliers', 'Supplier Management')
    .addTag('quality', 'Quality Control & Inspections')
    .addTag('compliance', 'SDS, Waste & PPE Compliance')
    .addTag('documents', 'Document Management')
    .addTag('reporting', 'Reports & Analytics')
    .addTag('audit', 'Audit Trail')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  // Start server
  const port = configService.get<number>('app.port', 3000);
  await app.listen(port);
  console.log(`KEMYAN Backend running on port ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api/docs`);
}

bootstrap();
