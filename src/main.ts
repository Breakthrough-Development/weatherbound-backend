import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dotEnv } from "./dot-env";
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  dotEnv();
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(process.env.PORT);
}
bootstrap();
