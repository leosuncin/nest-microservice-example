import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @EventPattern('product.data')
  getData() {
    return this.appService.getData();
  }
}
