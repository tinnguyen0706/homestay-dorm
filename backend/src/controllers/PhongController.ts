import type { Request, Response } from "express";
import { PhongBUS } from "../BUS/PhongBUS.js";

export class PhongController {
  static async getDSPhong(req: Request, res: Response) {
    try {
      // Lấy query parameters từ URL
      const filters = req.query;
      const danhSachPhong = await PhongBUS.LayDSPhong(filters);
      res.json(danhSachPhong);
    } catch (error: any) {
      console.error("Lỗi getDSPhong:", error);
      res.status(500).json({ error: error.message });
    }
  }

  static async getTTPhong(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const phong = await PhongBUS.LayTTPhong(id as string);
      if (!phong) {
        return res.status(404).json({ message: "Không tìm thấy phòng" });
      }
      res.json(phong);
    } catch (error: any) {
      console.error("Lỗi getTTPhong:", error);
      res.status(500).json({ error: error.message });
    }
  }
}
