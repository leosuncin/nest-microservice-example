import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

type Message = { message: string };

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy,
    @Inject('ORDER_SERVICE') private readonly orderClient: ClientProxy
  ) {}

  getData(): Message {
    return { message: 'Welcome to api-gateway!' };
  }

  async getAuthData() {
    return this.authClient.send<Message>('auth.data', {});
  }

  async getProductData() {
    return this.productClient.send<Message>('product.data', {});
  }

  async getOrderData() {
    return this.orderClient.send<Message>('order.data', {});
  }
}
