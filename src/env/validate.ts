import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsPortNumberString } from '../validator/is-import-number-string.validator';
import { IsUrlOrLocalhost } from '../validator/is-url-or-localhost.validator';

export class AppConfig {
  @IsNotEmpty()
  @IsString()
  GOOGLE_CLIENT_ID: string;

  @IsNotEmpty()
  @IsString()
  GOOGLE_CLIENT_SECRET: string;

  @IsNotEmpty()
  @Validate(IsPortNumberString)
  PORT: string;

  @IsNotEmpty()
  @Validate(IsUrlOrLocalhost)
  DOMAIN: string;

  @IsNotEmpty()
  @Validate(IsUrlOrLocalhost)
  WEB_REDIRECT_URL: string;

  @IsNotEmpty()
  @IsString()
  JWT_SECRET: string;

  @IsNotEmpty()
  @Validate(IsUrlOrLocalhost)
  DEVELOPMENT_URL: string;

  @IsNotEmpty()
  @Validate(IsUrlOrLocalhost)
  PRODUCTION_URL: string;
}
