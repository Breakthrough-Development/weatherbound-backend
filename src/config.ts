import { IsNotEmpty, IsUrl, IsString, IsInt, Min, Max } from 'class-validator';

export class AppConfig {
  @IsNotEmpty()
  @IsString()
  GOOGLE_CLIENT_ID: string;

  @IsNotEmpty()
  @IsString()
  GOOGLE_CLIENT_SECRET: string;

  // this can break because it coming in as a string
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(65535)
  PORT: number;

  @IsNotEmpty()
  @IsUrl()
  DOMAIN: string;

  @IsNotEmpty()
  @IsUrl()
  WEB_REDIRECT_URL: string;

  @IsNotEmpty()
  @IsString()
  JWT_SECRET: string;

  @IsNotEmpty()
  @IsUrl()
  DEVELOPMENT_URL: string;

  @IsNotEmpty()
  @IsUrl()
  PRODUCTION_URL: string;
}
