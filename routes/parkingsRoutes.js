import { Router } from "express";
import { getParkings } from "../controllers/parkingsControllers.js";

const router = Router();

//  GET ALL Parkings DATA
// GET /parkings
router.get("/", getParkings);

export default router;
