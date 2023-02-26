import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { JWT_GUARD, LOCAL_GUARD } from '../constants/guards';
import { RegisterUser } from '../dtos/register-user.dto';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { UserService } from '../services/user.service';

const validationPipe = new ValidationPipe({
  whitelist: true,
  transform: true,
  forbidNonWhitelisted: true,
});

@Controller('auth')
@UseInterceptors(TokenInterceptor)
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

  @Get('me')
  @UseGuards(AuthGuard(JWT_GUARD))
  getUser(@Request() request: Express.Request) {
    return this.userService.getById(
      (request.user as Record<'sub', string>).sub
    );
  }
}
