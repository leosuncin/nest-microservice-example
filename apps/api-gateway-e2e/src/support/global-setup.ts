export {};

/* eslint-disable no-var */
declare global {
  var __BASE_URL__: string;
}
/* eslint-enable no-var */

module.exports = async function () {
  // Start services that that the app needs to run (e.g. database, docker-compose, etc.).
  console.log('\nSetting up...\n');

  // Hint: Use `globalThis` to pass variables to global teardown.
  globalThis.__BASE_URL__ = process.env['BASE_URL'] ?? 'http://localhost:3333';
};
