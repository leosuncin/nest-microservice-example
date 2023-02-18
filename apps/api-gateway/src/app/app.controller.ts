import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('/auth')
  getAuthData() {
    return this.appService.getAuthData();
  }

  @Get('/product')
  getProductData() {
    return this.appService.getProductData();
  }

  @Get('/order')
  getOrderData() {
    return this.appService.getOrderData();
  }
}
