import { getDb } from "../middlewares/mongodb.js";
import expressAsyncHandler from "express-async-handler";

//  GET ALL Parkings DATA
// GET /parkings
export const getParkings = expressAsyncHandler(async (req, res) => {
  const db = getDb();
  const parkings = await db.collection("parkings").find({}).toArray();
  res.json(parkings);
});
