const setupTestEnvironment = require("../../setupTestEnvironment");

const fastify = setupTestEnvironment();

test('should signup a user', async () => {
  const user = { username: 'test', password: 'test' };

  const signup = await fastify.inject({
    url: '/api/users/signup',
    method: 'POST',
    payload: user,
  });

  expect(signup.statusCode).toBe(201);
  expect(signup.json().username).toBe(user.username);
});

test('should login a user and access user profile', async () => {
  const user = { username: 'test', password: 'test' };

  const signup = await fastify.inject({
    url: '/api/users/signup',
    method: 'POST',
    payload: user,
  });

  const login = await fastify.inject({
    url: '/api/users/login',
    method: 'POST',
    payload: user,
  });

  expect(login.statusCode).toBe(200);
  expect(login.json().success).toBeTruthy();

  const cookie = login.headers['set-cookie'];
  const profile = await fastify.inject({
    url: '/api/users/me',
    method: 'GET',
    headers: { cookie }
  });

  expect(profile.statusCode).toBe(200);
  expect(profile.json().id).toBe(signup.json().id);
  expect(profile.json().username).toBe(signup.json().username);
})