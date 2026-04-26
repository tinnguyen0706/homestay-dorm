import TaiKhoanNVBUS from "../BUS/TaiKhoanNVBUS.ts";
import type { Request, Response } from "express";

export async function KTraTK(req: Request, res: Response) {
  try {
    const TaiKhoanNV = {
      Username: String(req.query.Username),
      Password: String(req.query.Password),
    };

    if (!TaiKhoanNV.Username || !TaiKhoanNV.Password) {
      return res.status(400).json({ message: "Thiếu tham số!" });
    }
    const bus = new TaiKhoanNVBUS(TaiKhoanNV);
    const result = await bus.KTraTK();
    res.json(result);
  } catch (error) {
    console.log("--------------Lỗi: ", error);
    return res.status(400).json({ message: error });
  }
}
