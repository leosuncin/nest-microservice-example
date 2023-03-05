import { SharedMicroserviceModule } from '@example/shared-microservice';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { LocalStrategy } from './auth/local.strategy';

@Module({
  imports: [PassportModule, SharedMicroserviceModule],
  controllers: [AppController, AuthController],
  providers: [AppService, LocalStrategy],
})
export class AppModule {}
