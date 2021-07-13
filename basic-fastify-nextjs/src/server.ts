import Fastify from 'fastify';
import fastifyNextjs from 'fastify-nextjs';

const fastify = Fastify({ logger: true, pluginTimeout: 20000 });

fastify
  .register(fastifyNextjs, {
    dev: process.env.NODE_ENV !== 'production',
    logLevel: 'debug',
    noServeAssets: false,
  })
  .after(() => {
    fastify.next('/counter');
  });

fastify.get('/health', async () => {
  return { ok: true };
});

fastify.get('/', (_, reply) => {
  reply.redirect('http://localhost:3000/counter');
});

fastify.listen(3000, () => {
  fastify.log.info('Server listening on http://localhost:3000');
});
