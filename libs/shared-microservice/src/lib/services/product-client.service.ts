import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import type { Observable } from 'rxjs';

import { productEvents } from '../constants/product.events';
import { InjectProductClient } from '../decorators/product.decorator';

@Injectable()
export class ProductClientService {
  constructor(@InjectProductClient() private readonly client: ClientProxy) {}

  sendGetData(): Observable<{ message: string }> {
    return this.client.send(productEvents.getData, {});
  }

  emitGetData(): Observable<void> {
    return this.client.emit(productEvents.getData, {});
  }
}
