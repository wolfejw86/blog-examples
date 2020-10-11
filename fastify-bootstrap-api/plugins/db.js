const fp = require('fastify-plugin');
const pgp = require('pg-promise')();
const DbMigrate = require('db-migrate')
const appConfig = require('../config/appConfig');

function runMigrations() {
  return new Promise((resolve, reject) => {
    const dbMigrate = DbMigrate.getInstance(true);
    dbMigrate.silence(true);

    dbMigrate.up((error, results = []) => {
      if (error) {
        return reject(error)
      }

      resolve(results)
    })
  })
}

module.exports = fp(async function (fastify, opts) {
  const db = pgp(appConfig.postgresUri);

  fastify.decorate('db', db).addHook('onClose', async (instance, done) => {
    await db.$pool.end();
    done();
  });
  const migrationResults = await runMigrations();

  if (migrationResults.length > 0) {
    fastify.log.info({ migrationsCount: migrationResults.length, msg: 'Successful migrations run' })
  }


});
