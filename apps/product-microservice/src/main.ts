/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

const globalPrefix = 'api';
const port = Number.parseInt(process.env.PORT, 10) || 3335;

export async function bootstrap(options?: NestApplicationOptions) {
  const app = await NestFactory.create(AppModule, options);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: port + 10,
    },
  });
  app.setGlobalPrefix(globalPrefix).enableShutdownHooks();

  await app.startAllMicroservices();

  return app;
}

if (require.main === module) {
  (async () => {
    const app = await bootstrap();

    await app.listen(port);

    Logger.log(
      `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
    );
  })();
}
