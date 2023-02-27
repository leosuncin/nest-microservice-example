import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsDefined,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';

import { RegisterUser } from './register-user.dto';

export class UpdateUser extends PartialType(RegisterUser) {
  @IsDefined()
  @IsString()
  @IsMongoId()
  readonly id!: string;

  @IsOptional()
  @IsBoolean()
  readonly isAdmin?: boolean;
}
