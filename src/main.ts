import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dotEnv } from "./dot-env";

async function bootstrap() {
  dotEnv();
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
}
bootstrap();
