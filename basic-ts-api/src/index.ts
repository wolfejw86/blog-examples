import http from "http";
import { setupApp } from "./app";
import { connectDb } from "./db";

const port = process.env.PORT || 3000;

const main = async () => {
  const { db } = await connectDb(
    process.env.MONGO_URI || "mongodb://localhost/speed_test"
  );
  const app = setupApp(db);

  http.createServer(app.callback()).listen(port, async () => {
    console.log(
      `App listening on port ${port} @ ${new Date().toLocaleString()}`
    );
  });
};

main();
