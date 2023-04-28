import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, forbidNonWhitelisted: true }),
  );
  app.use(cookieParser());
  app.enableCors({
    origin: [
      configService.get<string>('DEVELOPMENT_URL'),
      configService.get<string>('PRODUCTION_URL'),
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });
  const port = configService.get<number>('PORT');
  await app.listen(port);
}

bootstrap();
