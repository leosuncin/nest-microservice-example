/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, NestApplicationOptions } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

const globalPrefix = 'api';

export async function bootstrap(options?: NestApplicationOptions) {
  const app = await NestFactory.create(AppModule, options);

  app.setGlobalPrefix(globalPrefix).enableShutdownHooks();

  return app;
}

if (require.main === module) {
  (async () => {
    const app = await bootstrap();
    const port = app.get(ConfigService).get<number>('port');

    await app.listen(port);

    Logger.log(
      `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
    );
  })();
}
