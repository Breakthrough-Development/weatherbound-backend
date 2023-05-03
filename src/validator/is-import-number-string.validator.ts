import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import validator from 'validator';

@ValidatorConstraint({ name: 'isPortNumberString', async: false })
export class IsPortNumberString implements ValidatorConstraintInterface {
  validate(text = '', args: ValidationArguments) {
    const isNumberString = validator.isNumeric(text, {
      no_symbols: true,
    });
    if (!isNumberString) return false;

    const number = parseInt(text, 10);
    return number >= 1 && number <= 65535;
  }

  defaultMessage(args: ValidationArguments) {
    return 'PORT must be an integer number between 1 and 65535';
  }
}
