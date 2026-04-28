import { Router } from "express";
import { PhongController } from "../controllers/PhongController.js";

const router = Router();

// /api/phong
router.get("/", PhongController.getDSPhong);

// /api/phong/:id
router.get("/:id", PhongController.getTTPhong);

export default router;
