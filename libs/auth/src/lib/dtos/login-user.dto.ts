import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { IsCorrectCredential } from '../validators/is-correct-credential.validator';

export class LoginUser {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsCorrectCredential()
  readonly email!: string;

  @IsDefined()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @IsCorrectCredential()
  readonly password!: string;
}
