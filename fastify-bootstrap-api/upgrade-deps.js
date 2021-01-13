const fs = require('fs');

const dependencies = {
  "@types/jest": {
    "current": "26.0.14",
    "wanted": "26.0.20",
    "latest": "26.0.20",
    "location": "node_modules/@types/jest"
  },
  "db-migrate": {
    "current": "0.11.11",
    "wanted": "0.11.12",
    "latest": "0.11.12",
    "location": "node_modules/db-migrate"
  },
  "fastify": {
    "current": "2.15.1",
    "wanted": "2.15.3",
    "latest": "3.9.2",
    "location": "node_modules/fastify"
  },
  "fastify-autoload": {
    "current": "1.2.2",
    "wanted": "1.2.2",
    "latest": "3.4.0",
    "location": "node_modules/fastify-autoload"
  },
  "fastify-cli": {
    "current": "1.5.0",
    "wanted": "1.5.0",
    "latest": "2.7.0",
    "location": "node_modules/fastify-cli"
  },
  "fastify-plugin": {
    "current": "1.6.1",
    "wanted": "1.6.1",
    "latest": "3.0.0",
    "location": "node_modules/fastify-plugin"
  },
  "fastify-swagger": {
    "current": "2.6.0",
    "wanted": "2.6.0",
    "latest": "3.5.0",
    "location": "node_modules/fastify-swagger"
  },
  "jest": {
    "current": "26.5.3",
    "wanted": "26.6.3",
    "latest": "26.6.3",
    "location": "node_modules/jest"
  },
  "pg-promise": {
    "current": "10.5.7",
    "wanted": "10.8.7",
    "latest": "10.8.7",
    "location": "node_modules/pg-promise"
  },
  "tap": {
    "current": "12.7.0",
    "wanted": "12.7.0",
    "latest": "14.11.0",
    "location": "node_modules/tap"
  }
}

const package = require('./package.json');
const devDeps = package.devDependencies;
const deps = package.dependencies;

Object.entries(dependencies).forEach(([packageKey, meta]) => {
  if (devDeps[packageKey]) {
    devDeps[packageKey] = '^' + meta.latest;
  } else {
    deps[packageKey] = '^' + meta.latest;
  }
});

fs.writeFileSync('./package.json', JSON.stringify(package, null, 2));
