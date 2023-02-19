import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            process.env['RABBIT_MQ_URL'] ??
              'amqp://user:bitnami@localhost:5672',
          ],
          queue: 'AUTH_QUEUE',
        },
      },
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            process.env['RABBIT_MQ_URL'] ??
              'amqp://user:bitnami@localhost:5672',
          ],
          queue: 'PRODUCT_QUEUE',
        },
      },
      {
        name: 'ORDER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            process.env['RABBIT_MQ_URL'] ??
              'amqp://user:bitnami@localhost:5672',
          ],
          queue: 'ORDER_QUEUE',
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
