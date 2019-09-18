import http from "http";
import supertest, { SuperTest, Test } from "supertest";
import { setupApp } from "../../app";

let server: http.Server;
let request: SuperTest<Test>;

beforeAll(() => {
  const app = setupApp({} as any);
  server = http.createServer(app.callback());
  request = supertest(server);
});

test("should return a 200 status for /api/health", async () => {
  const response = await request.get("/api/health");

  expect(response.status).toBe(200);
});
