const fp = require('fastify-plugin');
const pgp = require('pg-promise')();

const appConfig = require('../config/appConfig');

module.exports = fp(function (fastify, opts, next) {
  const db = pgp(appConfig.postgresUri);

  fastify.decorate('db', db);

  next();
});
