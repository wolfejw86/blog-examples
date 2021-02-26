import { FastifyPluginAsync } from 'fastify';

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.post<{ Body: any }>('/', async function (request) {
        fastify.log.info(JSON.stringify(request.body));

        return { root: true };
    });
};

export default root;
