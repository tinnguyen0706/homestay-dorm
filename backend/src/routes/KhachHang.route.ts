import { Router } from 'express';
import * as KhachHangController from '../controllers/KhachHangController.ts';

const router = Router();

router.get('/LayDSKH', KhachHangController.LayDSKH);
router.post('/ThemKH', KhachHangController.ThemKH);

export default router;