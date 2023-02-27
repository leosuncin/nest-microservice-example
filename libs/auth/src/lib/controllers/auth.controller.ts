import { authEvents } from '@example/shared-microservice';
import { Controller, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { LoginUser } from '../dtos/login-user.dto';
import { RegisterUser } from '../dtos/register-user.dto';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { UserService } from '../services/user.service';

const validationPipe = new ValidationPipe({
  whitelist: true,
  transform: true,
  forbidNonWhitelisted: true,
});

@Controller()
@UseInterceptors(TokenInterceptor)
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(authEvents.register)
  register(@Payload(validationPipe) register: RegisterUser) {
    return this.userService.create(register);
  }

  @MessagePattern(authEvents.login)
  login(@Payload(validationPipe) login: LoginUser) {
    return this.userService.login(login);
  }
}
