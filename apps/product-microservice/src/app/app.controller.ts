import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('product.data')
  getData() {
    return this.appService.getData();
  }
}
