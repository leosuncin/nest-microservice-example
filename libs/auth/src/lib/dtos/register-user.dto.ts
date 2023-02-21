import { Register } from '@example/shared-interfaces';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { IsNotRegister } from '../validators/is-not-register.validator';

export class RegisterUser implements Register {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsNotRegister()
  readonly email!: string;

  @IsDefined()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  readonly password!: string;
}
