const fs = require('fs');
const os = require('os');
const faker = require('faker');
const { MongoClient } = require('mongodb');

/**
 * creates a random user object with fake data
 */
function createRandomUser() {
  return {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
  };
}

/**
 * turn each document into a comma separated value followed by an end-of-line character
 */
function streamTransformer(doc) {
  return `${Object.values(doc).join(', ')}${os.EOL}`;
}

async function basicStreamExample() {
  const client = await new MongoClient('mongodb://localhost:27017/csv_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).connect();

  const db = client.db('csv_test');
  const fakeUsers = new Array(5000).fill(0).map(createRandomUser);

  await db.collection('users').insertMany(fakeUsers);

  const stream = db
    .collection('users')
    .find()
    .stream({ transform: streamTransformer });

  const output = fs.createWriteStream('./users.csv');
  const streamFinished = new Promise(resolve => stream.on('end', resolve));

  stream.pipe(output);

  await streamFinished;

  await client.close();
}

basicStreamExample();
