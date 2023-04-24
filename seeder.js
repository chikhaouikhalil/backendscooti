import { ps } from "./data.js";
import { connectToServer, getDb } from "./middlewares/mongodb.js";

const addScooters = async () => {
  await connectToServer();

  const db = getDb();
  await db.collection("parkings").insertMany(ps);
  console.log("c bon tzedou");
};

addScooters();
