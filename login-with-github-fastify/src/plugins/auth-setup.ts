import fp from 'fastify-plugin';
import cookie from 'fastify-cookie';
import session from 'fastify-session';
import grant from 'grant';

export default fp(async (fastify) => {
    return fastify
        .register(cookie)
        .register(session, {
            secret: new Array(32).fill('a').join(''),
            cookie: { secure: false },
        })
        .register(
            grant.fastify()({
                defaults: {
                    transport: 'session',
                    origin: fastify.appConfig.appOrigin,
                },
                github: {
                    key: fastify.appConfig.github.client_id,
                    secret: fastify.appConfig.github.client_secret,
                    callback: '/',
                    response: ['tokens', 'profile'],
                    scope: ['user:email'],
                },
            }),
        );
});
