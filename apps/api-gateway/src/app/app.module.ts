import { SharedMicroserviceModule } from '@example/shared-microservice';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [SharedMicroserviceModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
