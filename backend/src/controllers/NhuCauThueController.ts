import type { Request, Response } from "express";
import NhuCauThueBUS from "../BUS/NhuCauThueBUS.ts";
import { LoaiPhongBUS } from "../BUS/LoaiPhongBUS.ts";

export async function getDanhSachNhuCauThue(req: Request, res: Response) {
  try {
    const filters = {
      SoNguoiDuKien: req.query.SoNguoiDuKien
        ? Number(req.query.SoNguoiDuKien)
        : undefined,
      HinhThucThue: req.query.HinhThucThue,
      GiaMin: req.query.GiaMin ? Number(req.query.GiaMin) : undefined,
      GiaMax: req.query.GiaMax ? Number(req.query.GiaMax) : undefined,
      ThoiHanThue: req.query.ThoiHanThue
        ? Number(req.query.ThoiHanThue)
        : undefined,
      KhuVuc: req.query.KhuVuc,
      LoaiPhong: req.query.LoaiPhong,
      TrangThai: req.query.TrangThai,
    };

    const dsNhuCauThue = await NhuCauThueBUS.LayDSNCT(filters);

    res.status(200).json({
      success: true,
      data: dsNhuCauThue,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Lỗi khi lấy danh sách nhu cầu thuê",
    });
  }
}

export async function getFilterOptions(req: Request, res: Response) {
  try {
    // Chỉ lấy mỗi Loại Phòng
    const dsLoaiPhong = await LoaiPhongBUS.LayDSLoaiPhong();

    res.status(200).json({
      success: true,
      data: {
        loaiPhongs: dsLoaiPhong,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Thêm hàm này vào cuối file
export async function getChiTietNhuCauThue(req: Request, res: Response) {
  try {
    const { id } = req.params; // Lấy ID từ URL (vd: /api/nhucauthue/NCT01)
    
    const chiTiet = await NhuCauThueBUS.LayTTNCT(id);
    
    if (!chiTiet) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thông tin nhu cầu thuê này"
      });
    }

    res.status(200).json({
      success: true,
      data: chiTiet
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy chi tiết nhu cầu thuê: " + error.message
    });
  }
}