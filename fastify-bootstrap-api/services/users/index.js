const bcrypt = require('bcryptjs');
const { isLoggedIn } = require('../../middleware/isLoggedIn')
/**
 * @param {import('fastify').FastifyInstance} fastify 
 */
const routes = async (fastify) => {
  // your routes code here
  fastify.post('/signup', {
    schema: {
      body: {
        type: 'object', required: ['username', 'password'], properties: {
          username: { type: 'string' },
          password: { type: 'string' },
        }
      }
    }
  }, async (request, reply) => {
    const { username, password } = request.body;

    try {
      const hashed = await bcrypt.hash(password, 10);
      const user = await fastify.db.one('INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id', [username, hashed]);

      reply.code(201);

      return { id: user.id, username }
    } catch (error) {
      console.warn(error);
      throw new Error('Unable to complete signup');
    }
  });

  fastify.post('/login',
    {
      schema: {
        body: {
          type: 'object', required: ['username', 'password'], properties: {
            username: { type: 'string' },
            password: { type: 'string' },
          }
        }
      }
    }, async (request, reply) => {
      try {
        const { username, password } = request.body;
        const user = await fastify.db.one('SELECT id, username, password_hash FROM users WHERE username = $1', [username]);

        const isValidPassword = await bcrypt.compare(password, user.password_hash);

        if (!isValidPassword) {
          throw new Error();
        }

        request.session.user = { userId: user.id, isLoggedIn: true };

        return { id: user.id, username: user.username, success: true }
      } catch (error) {
        throw new Error('Invalid username/password combination');
      }
    });

  fastify.post('/logout', { preHandler: isLoggedIn }, (request, reply) => {
    request.session.user = null;
    request.sessionStore.destroy(request.session.sessionId, err => {
      if (err) {
        reply.code(500);
        reply.send({ message: 'Something went wrong', success: false });
        return;
      }

      reply.send({ success: true, loggedOut: true });
    })
  })

  fastify.get('/me', {
    preHandler: isLoggedIn
  }, async (request, reply) => {
    try {
      const userId = request.user;
      const user = await fastify.db.one('SELECT id, username FROM users WHERE id = $1', [userId]);

      return user;
    } catch (error) {
      throw new Error('You must be logged in to view this data.')
    }
  })
};

module.exports = routes
