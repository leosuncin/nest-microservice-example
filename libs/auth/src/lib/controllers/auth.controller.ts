import { authEvents } from '@example/shared-microservice';
import { Controller, ValidationPipe } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

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

  @EventPattern(authEvents.register)
  register(@Payload(validationPipe) register: RegisterUser) {
    return this.userService.create(register);
  }
}
