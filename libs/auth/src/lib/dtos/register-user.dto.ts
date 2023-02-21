import { Register } from '@example/shared-interfaces';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterUser implements Register {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email!: string;

  @IsDefined()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  readonly password!: string;
}
