const { UserService } = require('./userService');

/**
 * 
 * @param {import('fastify').FastifyInstance} fastify 
 */
module.exports = async (fastify) => {
  const userService = UserService(fastify.db);

  const usernamePasswordSchema = {
    type: 'object',
    required: ['username', 'password'],
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
    }
  };

  fastify.get('/me', async (req, res) => {
    return { id: req.session.userId, type: 'user' };
  });

  fastify.post('/signup', {
    schema: {
      body: usernamePasswordSchema
    }
  }, async (request, reply) => {
    const { username, password } = request.body;
    const user = await userService.createUser(username, password);

    reply.code(201);

    return { data: user.serialize() };
  });

  fastify.post('/login', async (request, reply) => {
    const { username, password } = request.body;
    const userId = await userService.login(username, password);

    request.session.user = { userId };

    return { userId }
  });
}