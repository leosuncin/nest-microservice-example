import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LOCAL_GUARD } from '../constants/guards';
import { RegisterUser } from '../dtos/register-user.dto';
import { UserService } from '../services/user.service';

const validationPipe = new ValidationPipe({
  whitelist: true,
  transform: true,
  forbidNonWhitelisted: true,
});

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body(validationPipe) register: RegisterUser) {
    return this.userService.create(register);
  }

  @Post('login')
  @UseGuards(AuthGuard(LOCAL_GUARD))
  login(@Request() request: Express.Request) {
    return request.user;
  }
}
