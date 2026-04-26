import { Router } from "express";
import * as TaiKhoanNVController from '../controllers/TaiKhoanNVController.ts'

const router = Router()
router.get('/KTraTK', TaiKhoanNVController.KTraTK);

export default router;
