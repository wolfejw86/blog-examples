const fp = require('fastify-plugin')
const appConfig = require('../config/appConfig');
const fastifySession = require('fastify-session');
const fastifyCookie = require('fastify-cookie');

module.exports = fp(function (fastify, opts, next) {
  fastify.register(fastifyCookie);
  fastify.register(
    fastifySession,
    {
      secret: appConfig.sessionSecret,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development'
      }
    }
  );

  next();
});
