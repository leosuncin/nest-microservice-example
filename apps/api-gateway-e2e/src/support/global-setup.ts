import { INestApplication } from '@nestjs/common';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { bootstrap } from '../../../api-gateway/src/main';

/* eslint-disable no-var */
declare global {
  var __BASE_URL__: string;
  var __APP__: INestApplication;
}
/* eslint-enable no-var */

module.exports = async function () {
  // Start services that that the app needs to run (e.g. database, docker-compose, etc.).
  console.log('\nSetting up...\n');
  const app = await bootstrap({ logger: false });

  await app.listen(0, '127.0.0.1');
  // Hint: Use `globalThis` to pass variables to global teardown.
  globalThis.__BASE_URL__ = await app.getUrl();
  globalThis.__APP__ = app;
};
