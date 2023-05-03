import {
  IsNotEmpty,
  IsString,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate,
} from 'class-validator';
import validator from 'validator';

@ValidatorConstraint({ name: 'isPortNumberString', async: false })
class IsPortNumberString implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const isNumberString = validator.isNumeric(text, { no_symbols: true });
    if (!isNumberString) return false;

    const number = parseInt(text, 10);
    return number >= 1 && number <= 65535;
  }

  defaultMessage(args: ValidationArguments) {
    return 'PORT must be an integer number between 1 and 65535';
  }
}

@ValidatorConstraint({ name: 'isUrlOrLocalhost', async: false })
class IsUrlOrLocalhost implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const isUrl = validator.isURL(text);
    const isLocalhost =
      text.startsWith('http://localhost') ||
      text.startsWith('https://localhost');
    return isUrl || isLocalhost;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Invalid URL format';
  }
}

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
