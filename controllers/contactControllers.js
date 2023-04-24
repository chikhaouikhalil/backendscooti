import { ObjectId } from "mongodb";
import { getDb } from "../middlewares/mongodb.js";
import expressAsyncHandler from "express-async-handler";

export const saveContactForm = expressAsyncHandler(async (req, res) => {
  const db = getDb();
  const { object, message } = req.body;
  if (!object || !message) {
    res.status(400).json({ message: "invalid data" });
  } else {
    await db.collection("contact").insertOne({
      createdAt: new Date(),
      user: ObjectId(req.user),
      object,
      message,
      answered: false,
      answeredAt: null,
    });
    res.status(201).json({ message: "contact message saved" });
  }
});
