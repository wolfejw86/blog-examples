const fs = require('fs');
const latestDepInfo = {
  "db-migrate": {
    "wanted": "0.11.12",
    "latest": "0.11.12",
    "location": ""
  },
  "db-migrate-pg": {
    "wanted": "1.2.2",
    "latest": "1.2.2",
    "location": ""
  },
  "dotenv": {
    "wanted": "8.2.0",
    "latest": "8.2.0",
    "location": ""
  },
  "fastify": {
    "wanted": "2.15.3",
    "latest": "3.9.2",
    "location": ""
  },
  "fastify-autoload": {
    "wanted": "1.2.2",
    "latest": "3.4.0",
    "location": ""
  },
  "fastify-cli": {
    "wanted": "1.5.0",
    "latest": "2.7.0",
    "location": ""
  },
  "fastify-plugin": {
    "wanted": "1.6.1",
    "latest": "3.0.0",
    "location": ""
  },
  "fastify-swagger": {
    "wanted": "2.6.0",
    "latest": "3.5.0",
    "location": ""
  },
  "jest": {
    "wanted": "26.6.3",
    "latest": "26.6.3",
    "location": ""
  },
  "pg-promise": {
    "wanted": "10.8.7",
    "latest": "10.8.7",
    "location": ""
  }
};

const package = require('./package.json');

Object.entries(latestDepInfo).forEach(([packagekey, meta]) => {
  if (package.dependencies[packagekey]) {
    package.dependencies[packagekey] = `^${meta.latest}`;
  } else {
    // we know it's a dev dependency
    package.devDependencies[packagekey] = `^${meta.latest}`;
  }
});

fs.writeFileSync('./package.json', JSON.stringify(package, null, 2));
