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
}
