import {
  AuthClientService,
  OrderClientService,
  ProductClientService,
} from '@example/shared-microservice';
import { Injectable } from '@nestjs/common';

type Message = { message: string };

@Injectable()
export class AppService {
  constructor(
    private readonly authClient: AuthClientService,
    private readonly productClient: ProductClientService,
    private readonly orderClient: OrderClientService
  ) {}

  getData(): Message {
    return { message: 'Welcome to api-gateway!' };
  }

  getAuthData() {
    return this.authClient.sendGetData();
  }

  getProductData() {
    return this.productClient.sendGetData();
  }

  getOrderData() {
    return this.orderClient.sendGetData();
  }
}
