import type { Login, Register, User } from '@example/shared-interfaces';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import type { Observable } from 'rxjs';

import { authEvents } from '../constants/auth.events';
import { InjectAuthClient } from '../decorators/auth.decorator';

@Injectable()
export class AuthClientService {
  constructor(@InjectAuthClient() private readonly client: ClientProxy) {}

  sendGetData(): Observable<{ message: string }> {
    return this.client.send(authEvents.getData, {});
  }

  sendRegister(data: Register): Observable<User> {
    return this.client.send(authEvents.register, data);
  }

  sendLogin(data: Login): Observable<User> {
    return this.client.send(authEvents.login, data);
  }
}
