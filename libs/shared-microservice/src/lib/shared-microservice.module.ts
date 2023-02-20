import { Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { getClientModuleOptions } from './config/get-client-module-options';
import { AuthClientService } from './services/auth-client.service';
import { OrderClientService } from './services/order-client.service';
import { ProductClientService } from './services/product-client.service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      getClientModuleOptions('auth'),
      getClientModuleOptions('product'),
      getClientModuleOptions('order'),
    ]),
  ],
  providers: [AuthClientService, ProductClientService, OrderClientService],
  exports: [
    ClientsModule,
    AuthClientService,
    ProductClientService,
    OrderClientService,
  ],
})
export class SharedMicroserviceModule {}
