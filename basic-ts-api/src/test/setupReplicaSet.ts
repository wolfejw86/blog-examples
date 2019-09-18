import { MongoMemoryReplSet } from "mongodb-memory-server";

export const setupDBConnection = () => {
  let replicaSet: MongoMemoryReplSet;

  beforeAll(async () => {
    replicaSet = new MongoMemoryReplSet({
      autoStart: true,
      replSet: {
        name: "rs0",
        dbName: "test_db",
        storageEngine: "wiredTiger",
        count: 1
      }
    });

    await replicaSet.waitUntilRunning();

    const uri = await replicaSet.getConnectionString();

    global.__MONGO_URI__ = uri;
  });

  afterAll(async () => {
    await replicaSet.stop();
  });
};
