const setupTestEnvironment = require('../../setupTestEnvironment');

const fastify = setupTestEnvironment();

it('should create a user during signup', async () => {
  const payload = {
    username: 'test123',
    password: 'goodenough',
  };

  const serverResponse = await fastify.inject({
    url: '/api/users/signup',
    method: 'POST',
    payload
  });

  expect(serverResponse.statusCode).toBe(201);
});


it('should login a signed up user', async () => {
  const payload = {
    username: 'test123',
    password: 'goodenough',
  };

  const serverResponse = await fastify.inject({
    url: '/api/users/signup',
    method: 'POST',
    payload
  });

  expect(serverResponse.statusCode).toBe(201);

  const loginResult = await fastify.inject({
    url: '/api/users/login',
    method: 'POST',
    payload,
  });

  expect(loginResult.headers['set-cookie'].includes('sessionId')).toBeTruthy();
});