'use strict'
const fs = require('fs');
const path = require('path')
const AutoLoad = require('fastify-autoload')

/**
 * 
 * @param {import('fastify').FastifyInstance} fastify 
 */
module.exports = async function (fastify, opts) {
  // Place here your custom code!
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in services
  // define your routes in one of these
  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services'),
    options: Object.assign({ prefix: '/api' }, opts)
  });

  fastify.get('/', (req, reply) => {
    reply.header('content-type', 'text/html');
    reply.send(fs.createReadStream(path.join(__dirname, 'index.html')))
  })

  if (process.env.NODE_ENV === 'development')
    fastify.log.info(fastify.printRoutes());
}

