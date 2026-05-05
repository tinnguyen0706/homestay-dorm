import type { Request, Response } from "express";
import LoaiPhongBUS from "../BUS/LoaiPhongBUS.ts";

export default class LoaiPhongController {
  static async LayDSLoaiPhong(req: Request, res: Response) {
    try {
      const result = await LoaiPhongBUS.LayDSLoaiPhong();
      res.json(result);
    } catch (error) {
      console.log("--------------Lỗi LayDSLoaiPhong: ", error);
      res.status(400).json({ message: error });
    }
  }

  static async LayThongTinLoaiPhong(req: Request, res: Response) {
    try {
      const MaLoai = String(req.params.MaLoai);
      const result = await LoaiPhongBUS.LayThongTinLoaiPhong(MaLoai);
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ message: "Không tìm thấy loại phòng" });
      }
    } catch (error) {
      console.log("--------------Lỗi LayThongTinLoaiPhong: ", error);
      res.status(400).json({ message: error });
    }
  }
}
