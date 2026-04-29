import { Router } from "express";
import NhuCauThueController from "../controllers/NhuCauThueController.ts";

const router = Router();

router.post("/ThemNCThue", NhuCauThueController.ThemNCThue);
router.get("/", NhuCauThueController.getDanhSachNhuCauThue);
router.get("/filter-options", NhuCauThueController.getFilterOptions);
router.get("/:id", NhuCauThueController.getChiTietNhuCauThue);

export default router;