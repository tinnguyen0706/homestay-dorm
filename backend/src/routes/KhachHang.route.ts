import { Router } from 'express';
import * as KhachHangController from '../controllers/KhachHangController.ts';

const router = Router();

router.get('/LayDSKH', KhachHangController.LayDSKH);
router.post('/ThemKH', KhachHangController.ThemKH);
router.get('/LayThongTinKH/:MaKH', KhachHangController.LayThongTinKH);

export default router;