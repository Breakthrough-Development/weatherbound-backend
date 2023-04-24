import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

const envFileLoadResult = dotenv.config({ path: '.env' });

const requiredEnvVars = [
  { key: 'GOOGLE_CLIENT_ID', example: 'abc123xyz' },
  { key: 'GOOGLE_CLIENT_SECRET', example: 'secret123' },
  { key: 'PORT', example: '3000' },
];

if (envFileLoadResult.error) {
  console.error(`Error: Could not load environment variables from .env file. ${envFileLoadResult.error}`);
  process.exit(1);
}

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar.key]) {
    console.error(`Error: ${envVar.key} environment variable is not defined. Please set the ${envVar.key} environment variable to a value. For example: ${envVar.example}`);
    process.exit(1);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
}
bootstrap();
