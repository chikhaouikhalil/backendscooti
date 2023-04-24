import { Router } from "express";
import { checkToken } from "../middlewares/authMiddlewares.js";
import { saveContactForm } from "../controllers/contactControllers.js";

const router = Router();

//  SAVE CONTACT FORM DATA
// POST /contact
router.post("/", checkToken, saveContactForm);

export default router;
