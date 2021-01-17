'use strict'
const cookie = require('fastify-cookie');
const session = require('fastify-session');
const fp = require('fastify-plugin');
const appConfig = require('../config/appConfig');

/**
 * @param {import('fastify').FastifyInstance} fastify 
 */
const plugin = async (fastify) => {
  fastify.register(cookie);
  fastify.register(session, {
    secret: appConfig.sessionSecret,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
    }
  });
};
module.exports = fp(plugin)
