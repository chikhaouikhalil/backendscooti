import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

var _db;

// CONNECT TO DB
export const connectToServer = async () => {
  try {
    const client = await new MongoClient(process.env.MONGO_URL);
    await client.connect();
    console.log("connected to DB");

    _db = client.db(process.env.DB_NAME);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// GET DB TO INTERACT
export const getDb = () => {
  return _db;
};
