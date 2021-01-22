'use strict'
const cookie = require('fastify-cookie');
const session = require('fastify-session');
const pgSessionStore = require('connect-pg-simple');
const fp = require('fastify-plugin');
const appConfig = require('../config/appConfig');

/**
 * @param {import('fastify').FastifyInstance} fastify 
 */
const plugin = async (fastify) => {
  const SessionStore = pgSessionStore(session);

  fastify.register(cookie);
  fastify.register(session, {
    store: new SessionStore({
      tableName: 'user_sessions',
      pool: fastify.db.$pool,
    }),
    secret: appConfig.sessionSecret,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
    }
  });
};
module.exports = fp(plugin, { name: 'session', dependencies: ['db'] })
