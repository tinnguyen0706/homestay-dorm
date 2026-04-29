import { Router } from "express";
import * as TaiKhoanNVController from "../controllers/TaiKhoanNVController.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";

const router = Router();
router.post("/DangNhap", TaiKhoanNVController.DangNhap);
router.get("/KiemTraDangNhap", authMiddleware, TaiKhoanNVController.KiemTraDangNhap);
router.post("/DangXuat", authMiddleware, TaiKhoanNVController.DangXuat);

export default router;
