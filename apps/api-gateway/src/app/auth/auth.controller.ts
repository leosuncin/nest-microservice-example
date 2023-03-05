import { Register, UpdateUser, User } from '@example/shared-interfaces';
import { AuthClientService } from '@example/shared-microservice';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CurrentUser } from './auth.decorator';

const validationPipe = new ValidationPipe({
  whitelist: true,
  transform: true,
  forbidNonWhitelisted: true,
});

@Controller('auth')
export class AuthController {
  constructor(private readonly authClient: AuthClientService) {}

  @Post('register')
  register(@Body(validationPipe) register: Register) {
    return this.authClient.sendRegister(register);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@CurrentUser() user: User) {
    return user;
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getUser(@CurrentUser() user: User) {
    return user;
  }

  @Put('me')
  @UseGuards(AuthGuard('jwt'))
  updateUser(
    @CurrentUser() user: User,
    @Body(validationPipe) updates: UpdateUser
  ) {
    return this.authClient.sendUpdateUser(user.id, updates);
  }
}
