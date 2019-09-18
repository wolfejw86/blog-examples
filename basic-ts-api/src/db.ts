import mongodb from "mongodb";

export const connectDb = async (uri: string) => {
  const client = new mongodb.MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

  await client.connect();

  const db = client.db("speed_test");

  const disconnect = () => client.close();

  return {
    db,
    disconnect
  };
};
