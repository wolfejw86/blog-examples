const setupTestEnvironment = require('../../setupTestEnvironment');

const fastify = setupTestEnvironment();

test('should create a note via POST route', async () => {
  const requestPayload = {
    title: 'my test note',
    body: 'Aliquip fugiat eiusmod exercitation aute qui. Sit duis sunt in enim ullamco ex laboris veniam in fugiat consequat. Ut aliquip mollit non mollit est irure commodo aliquip dolor veniam ullamco in irure.'
  };

  const serverResponse = await fastify.inject({
    url: '/api/notes',
    method: 'POST',
    payload: requestPayload,
  });

  expect(serverResponse.json().title).toEqual(requestPayload.title)
  expect(serverResponse.json().body).toEqual(requestPayload.body)
});

test.todo('should retrieve created notes');
test.todo('should update a note');
test.todo('should delete a note');