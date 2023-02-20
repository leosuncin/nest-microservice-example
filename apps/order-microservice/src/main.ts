/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { getMicroServiceOptions } from '@example/shared-microservice';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

export async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    getMicroServiceOptions('order')
  );

  app.enableShutdownHooks();

  await app.listen();
}

void bootstrap();
