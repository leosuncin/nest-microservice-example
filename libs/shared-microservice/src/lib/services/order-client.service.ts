import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import type { Observable } from 'rxjs';

import { orderEvents } from '../constants/order.events';
import { InjectOrderClient } from '../decorators/order.decorator';

@Injectable()
export class OrderClientService {
  constructor(@InjectOrderClient() private readonly client: ClientProxy) {}

  sendGetData(): Observable<{ message: string }> {
    return this.client.send(orderEvents.getData, {});
  }

  emitGetData(): Observable<void> {
    return this.client.emit(orderEvents.getData, {});
  }
}
