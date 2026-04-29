import { Router } from "express";
import { getDanhSachLoaiPhong } from "../controllers/LoaiPhongController.ts";

const router = Router();

router.get("/", getDanhSachLoaiPhong);

export default router;