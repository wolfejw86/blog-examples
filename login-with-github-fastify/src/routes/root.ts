import { FastifyPluginAsync } from 'fastify';
import { Octokit } from '@octokit/core';

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/', async function (request, reply) {
        console.log(request.session);

        return request.session;
    });

    fastify.get('/user/me', async (req) => {
        const octokit = new Octokit({
            auth: req.session.grant.response.access_token,
        });

        const data = await octokit.request('GET /user');

        return data;
    });
};

export default root;
