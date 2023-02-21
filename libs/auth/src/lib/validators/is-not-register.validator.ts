import {
  isEmpty,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UserService } from '../services/user.service';

@ValidatorConstraint({ name: 'isNotRegister', async: true })
export class IsNotRegisterConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(value: string, { property }: ValidationArguments) {
    if (isEmpty(value)) return true;

    const userExist = await this.userService.isRegistered({
      [property]: value,
    });

    return !userExist;
  }

  defaultMessage(): string {
    return '$property «$value» is already registered';
  }
}

export function IsNotRegister(options: ValidationOptions = {}) {
  return function (object: object, propertyName: 'email') {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      validator: IsNotRegisterConstraint,
    });
  };
}
