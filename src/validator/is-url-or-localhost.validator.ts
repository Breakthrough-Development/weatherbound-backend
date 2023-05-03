import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import validator from 'validator';

@ValidatorConstraint({ name: 'isUrlOrLocalhost', async: false })
export class IsUrlOrLocalhost implements ValidatorConstraintInterface {
  validate(text = '', args: ValidationArguments) {
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
