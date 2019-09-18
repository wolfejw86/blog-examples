import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { Db } from "mongodb";

export type SpeedTestUnits = "bps" | "kbps" | "mbps" | "gbps";

export const setupApp = (db: Db) => {
  const app = new Koa();

  app.use(bodyParser());

  const router = new Router();

  router.prefix("/api");

  router.get("/health", ctx => {
    ctx.status = 200;
    ctx.body = {
      message: "ok",
      ok: true
    };
  });

  router.post("/speed-test-record", async ctx => {
    const { speed, unit } = ctx.request.body;

    const record = await db.collection("speed_test_records").insertOne({
      speed,
      unit,
      createdAt: new Date()
    });

    ctx.status = 201;
    ctx.body = {
      data: record.ops[0]
    };
  });

  app.use(router.routes()).use(router.allowedMethods());

  return app;
};
