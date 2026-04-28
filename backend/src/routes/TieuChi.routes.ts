import { Router } from "express";
import TieuChiController from "../controllers/TieuChiController.ts";

const router = Router();

router.get("/LayDSTC", TieuChiController.LayDSTC);

export default router;
