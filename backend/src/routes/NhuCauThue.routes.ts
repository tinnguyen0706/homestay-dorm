import { Router } from "express";
import NhuCauThueController from "../controllers/NhuCauThueController.ts";

const router = Router();

router.post("/ThemNCThue", NhuCauThueController.ThemNCThue);

export default router;
