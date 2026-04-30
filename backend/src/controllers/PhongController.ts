import type { Request, Response } from "express";
import { PhongBUS } from "../BUS/PhongBUS.js";

export class PhongController {
  static async getFilterOptions(req: Request, res: Response) {
    try {
      const filterOptions = await PhongBUS.LayFilterOptions();
      res.json(filterOptions);
    } catch (error: any) {
      console.error("Loi getFilterOptions:", error);
      res.status(500).json({ error: error.message });
    }
  }

  static async getDSPhong(req: Request, res: Response) {
    try {
      const filters = req.query;
      const danhSachPhong = await PhongBUS.LayDSPhong(filters);
      res.json(danhSachPhong);
    } catch (error: any) {
      console.error("Loi getDSPhong:", error);
      res.status(500).json({ error: error.message });
    }
  }

  static async getTTPhong(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const phong = await PhongBUS.LayTTPhong(id as string);
      if (!phong) {
        return res.status(404).json({ message: "Khong tim thay phong" });
      }
      res.json(phong);
    } catch (error: any) {
      console.error("Loi getTTPhong:", error);
      res.status(500).json({ error: error.message });
    }
  }
}
