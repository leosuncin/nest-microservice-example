import { SharedMicroserviceModule } from '@example/shared-microservice';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [SharedMicroserviceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
