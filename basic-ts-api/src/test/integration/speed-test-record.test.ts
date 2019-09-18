import http from "http";
import supertest, { SuperTest, Test } from "supertest";
import { setupApp } from "../../app";
import { setupDBConnection } from "../setupReplicaSet";
import { connectDb } from "../../db";
import { Db } from "mongodb";

let server: http.Server;
let request: SuperTest<Test>;
let db: Db;
let disconnect: () => Promise<void>;

setupDBConnection();

beforeAll(async () => {
  const dbConnection = await connectDb(global.__MONGO_URI__);
  db = dbConnection.db;
  disconnect = dbConnection.disconnect;

  const app = setupApp(db);

  server = http.createServer(app.callback());
  request = supertest(server);
});

afterAll(async () => {
  await disconnect();
});

test("should create a speed test record at /api/speed-test-record", async () => {
  const speedTestResult = {
    speed: 90,
    unit: "mbps"
  };

  const response = await request
    .post("/api/speed-test-record")
    .send({ speed: speedTestResult.speed, unit: speedTestResult.unit });

  const { _id, createdAt, ...apiResponse } = response.body.data;

  expect(response.status).toBe(201);
  expect(apiResponse).toEqual(speedTestResult);
});
