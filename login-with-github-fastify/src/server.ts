import * as dotenv from 'dotenv';
dotenv.config();

import Fastify from 'fastify';
import app from './app';

const server = Fastify({
    logger: true,
});

server
    .register(app)
    .then(() => server.ready())
    .then(() => server.listen(3000, '0.0.0.0'));
