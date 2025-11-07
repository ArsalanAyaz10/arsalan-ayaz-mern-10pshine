import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

process.env.MONGOMS_DOWNLOAD_MIRROR = "https://fastdl.mongodb.org/";
process.env.MONGOMS_DISABLE_POSTINSTALL = "true";

mongoose.set("strictQuery", false); // ✅ optional but recommended

let mongoServer;

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

after(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});
