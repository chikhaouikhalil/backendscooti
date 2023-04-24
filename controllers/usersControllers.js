import { ObjectId } from "mongodb";
import { generateToken } from "../middlewares/authMiddlewares.js";
import { getDb } from "../middlewares/mongodb.js";
import expressAsyncHandler from "express-async-handler";

//  LOGIN USER VIA GOOGLE
// POST /google-signin
export const signinWithGoogleProvider = expressAsyncHandler(
  async (req, res) => {
    const db = await getDb();
    const { firstname, lastname, email, image } = req.body;

    // check data
    if (!firstname || !lastname || !email) {
      res.status(400).json({ message: "Invalid data" });
    } else {
      // if user exist with provided email then return it with a token else we create new account
      const existedUser = await db.collection("users").findOne({ email });
      if (existedUser) {
        await db
          .collection("users")
          .updateOne({ email }, { $set: { last_connexion: new Date() } });
        res.json({
          ...existedUser,
          access_token: generateToken(existedUser._id),
        });
      } else {
        // Save USER DATA
        const createdUser = await db.collection("users").insertOne({
          createdAt: new Date(),
          email,
          firstname,
          lastname,
          image: image ? image : null,
          provider: "google",
          phoneNumber: "",
          last_connexion: new Date(),
        });
        const userId = createdUser.insertedId;
        const newUser = await db
          .collection("users")
          .findOne({ _id: ObjectId(userId) });
        res.json({ ...newUser, access_token: generateToken(userId) });
      }
    }
  }
);

//  LOGIN USER VIA PHONE
// POST /phone-signin
export const singinWithPhoneNumber = expressAsyncHandler(async (req, res) => {
  const db = await getDb();
  const { phoneNumber } = req.body;

  // check data
  if (!phoneNumber) {
    res.status(400).json({ message: "Invalid data" });
  } else {
    // if user exist with provided email then return it with a token else we create new account
    const existedUser = await db.collection("users").findOne({ phoneNumber });
    if (existedUser) {
      await db
        .collection("users")
        .updateOne({ phoneNumber }, { $set: { last_connexion: new Date() } });
      res.json({
        ...existedUser,
        access_token: generateToken(existedUser._id),
      });
    } else {
      // Save USER DATA
      const createdUser = await db.collection("users").insertOne({
        createdAt: new Date(),
        email: null,
        firstname: null,
        lastname: null,
        image: null,
        provider: "phone",
        phoneNumber,
        last_connexion: new Date(),
      });
      const userId = createdUser.insertedId;
      const newUser = await db
        .collection("users")
        .findOne({ _id: ObjectId(userId) });
      res.json({ ...newUser, access_token: generateToken(userId) });
    }
  }
});

// UPDATE USER
// PUT /users/update-user
export const updateUserData = expressAsyncHandler(async (req, res) => {
  const db = getDb();
  delete req.body.access_token;
  // CHECK EMAIL IS NOT USED
  const existUser = await db
    .collection("users")
    .findOne({ email: req.body.email });
  if (existUser) {
    res.status(409).json({ message: "mail already used" });
  } else {
    await db
      .collection("users")
      .updateOne({ _id: ObjectId(req.user) }, { $set: { ...req.body } });
    const user = await db
      .collection("users")
      .findOne({ _id: ObjectId(req.user) });
    res.status(201).json(user);
  }
});
