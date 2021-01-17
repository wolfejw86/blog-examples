function loadEnvironmentVariable(keyname) {
  const envVar = process.env[keyname];

  if (!envVar) {
    throw new Error(`Must include ${keyname} as an environment variable.`);
  }

  return envVar;
}

function loadArrayEnvVariable(keyname) {
  return loadEnvironmentVariable(keyname).split(',');
}

module.exports = {
  postgresUri: loadEnvironmentVariable('POSTGRES_URI'),
  sessionSecret: loadArrayEnvVariable('SESSION_SECRET'),
};
