'use strict'
const cookie = require('fastify-cookie');
const session = require('fastify-session');
const fp = require('fastify-plugin');
const appConfig = require('../config/appConfig');
const pgStore = require('connect-pg-simple');

/**
 * @param {import('fastify').FastifyInstance} fastify 
 */
const plugin = async (fastify) => {
  const pgSession = pgStore(session);

  fastify.register(cookie);
  fastify.register(session, {
    store: new pgSession({
      pool: fastify.db.$pool,
      tableName: 'user_sessions',
    }),
    secret: appConfig.sessionSecret,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
    }
  });
};
module.exports = fp(plugin, { dependencies: ['db'] })
