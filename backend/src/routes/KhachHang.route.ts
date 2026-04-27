import { Router } from 'express';
import * as KhachHangController from '../controllers/KhachHangController.ts';

const router = Router();

router.get('/LayDSKH', KhachHangController.LayDSKH);

export default router;