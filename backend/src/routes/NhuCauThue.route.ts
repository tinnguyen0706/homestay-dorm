// src/routes/nhuCauThueRoutes.ts
import { Router } from "express";
import { getChiTietNhuCauThue, getDanhSachNhuCauThue, getFilterOptions } from "../controllers/NhuCauThueController.ts";

const router = Router();

router.get("/", getDanhSachNhuCauThue);
router.get("/filter-options", getFilterOptions);
router.get("/:id", getChiTietNhuCauThue);

export default router;