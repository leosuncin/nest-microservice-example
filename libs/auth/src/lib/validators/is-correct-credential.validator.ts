import { Injectable } from '@nestjs/common';
import {
  isEmail,
  isString,
  maxLength,
  minLength,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UserService } from '../services/user.service';

@Injectable()
@ValidatorConstraint({ name: 'credential', async: true })
export class IsCorrectCredentialConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly userService: UserService) {}

  validate(_: unknown, { object, property }: ValidationArguments) {
    if (!this.hasCredentials(object)) return true;

    return this.userService.verifyCredentials(object, property);
  }

  defaultMessage(): string {
    return '$property is incorrect';
  }

  private hasCredentials(object: object): object is {
    email: string;
    password: string;
    [key: string]: unknown;
  } {
    const { password, email } = object as Record<string, unknown>;
    const isValidPassword =
      isString(password) && minLength(password, 8) && maxLength(password, 30);
    const isValidEmail = isString(email) && isEmail(email);

    if (isValidPassword && isValidEmail) return true;

    return false;
  }
}

export function IsCorrectCredential(options: ValidationOptions = {}) {
  return function (object: object, propertyName: 'email' | 'password') {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      validator: IsCorrectCredentialConstraint,
    });
  };
}
