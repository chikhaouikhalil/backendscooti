import { Router } from "express";
import {
  signinWithGoogleProvider,
  singinWithPhoneNumber,
  updateUserData,
} from "../controllers/usersControllers.js";
import { checkToken } from "../middlewares/authMiddlewares.js";

const router = Router();

//  Login via google
// POST /users/google-signin
router.post("/google-signin", signinWithGoogleProvider);

//  Login via phone number
// POST /users/phone-signin
router.post("/phone-signin", singinWithPhoneNumber);

// Update user data
// PUT /users/update-user
router.put("/update-user", checkToken, updateUserData);

export default router;
