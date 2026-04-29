import type { Request, Response } from "express";
import { LoaiPhongBUS } from "../BUS/LoaiPhongBUS.ts";

export async function getDanhSachLoaiPhong(req: Request, res: Response) {
  try {
    const dsLoaiPhong = await LoaiPhongBUS.LayDSLoaiPhong();

    res.status(200).json({
      success: true,
      data: dsLoaiPhong,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách loại phòng: " + error.message,
    });
  }
}
