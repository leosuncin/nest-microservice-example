import { Register } from '@example/shared-interfaces';
import { AuthClientService } from '@example/shared-microservice';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

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
}
