import { Router } from "express";
import LoaiPhongController from "../controllers/LoaiPhongController.ts";

const router = Router();

router.get("/LayDSLoaiPhong", LoaiPhongController.LayDSLoaiPhong);
router.get("/LayThongTinLoaiPhong/:MaLoai", LoaiPhongController.LayThongTinLoaiPhong);

export default router;