import TaiKhoanNVBUS from "../BUS/TaiKhoanNVBUS.ts";
import type { Request, Response } from "express";
import type { ITaiKhoanNV } from "../types/ITaiKhoanNV.ts";

export async function KTraTK(req: Request, res: Response) {
  try {
    const TaiKhoanNV: ITaiKhoanNV = {
      Username: String(req.query.Username),
      Password: String(req.query.Password),
    };

    if (!TaiKhoanNV.Username || !TaiKhoanNV.Password) {
      return res.status(400).json({ message: "Thiếu tham số!" });
    }
    const result = await TaiKhoanNVBUS.KTraTK(TaiKhoanNV);
    res.json(result);
  } catch (error) {
    console.log("--------------Lỗi: ", error);
    return res.status(400).json({ message: error });
  }
}
