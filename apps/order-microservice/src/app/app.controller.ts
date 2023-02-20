import { orderEvents } from '@example/shared-microservice';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(orderEvents.getData)
  getData() {
    return this.appService.getData();
  }
}
