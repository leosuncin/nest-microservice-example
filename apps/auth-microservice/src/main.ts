/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

export async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          process.env['RABBIT_MQ_URL'] ?? 'amqp://user:bitnami@localhost:5672',
        ],
        queue: 'AUTH_QUEUE',
        noAck: true,
        persistent: true,
        queueOptions: {
          durable: true,
        },
      },
    }
  );

  app.enableShutdownHooks();

  await app.listen();
}

void bootstrap();
