import type { Request, Response } from "express";
import NhuCauThueBUS from "../BUS/NhuCauThueBUS.ts";
import NhomThueBUS from "../BUS/NhomThueBUS.ts";
import KhachHangBUS from "../BUS/KhachHangBUS.ts";
import LoaiPhongBUS from "../BUS/LoaiPhongBUS.ts";

export default class NhuCauThueController {
  static async ThemNCThue(req: Request, res: Response) {
    try {
      const {
        MaKH_DaiDien,
        DanhSachKH,
        LoaiPhong,
        SoNguoiDuKien,
        HinhThucThue,
        GiaMin,
        GiaMax,
        ThoiDiemVao,
        ThoiHanThue,
        KhuVuc,
        TrangThai,
        TieuChi,
        LoaiDangKy,
      } = req.body;

      const nhomThue = new NhomThueBUS(
        "",
        (DanhSachKH as string[]).map(
          (maKH) =>
            new KhachHangBUS({
              MaKH: maKH,
              HoTen: "",
              GioiTinh: "",
              Email: "",
              QuocTich: "",
              SDT: "",
              MaNhomThue: "",
            } as KhachHangBUS),
        ),
      );

      const NCT = new NhuCauThueBUS(
        "",
        MaKH_DaiDien,
        nhomThue,
        LoaiPhong,
        Number(SoNguoiDuKien),
        HinhThucThue,
        Number(GiaMin),
        Number(GiaMax),
        new Date(ThoiDiemVao),
        Number(ThoiHanThue),
        KhuVuc,
        TrangThai,
        TieuChi,
        "", // TenKhachHang sẽ được lấy từ DB sau khi có MaKH_DaiDien
        "", // TenLoaiPhong sẽ được lấy từ DB sau khi có LoaiPhong
      );

      const errors = NhuCauThueBUS.KiemTraThongTin(NCT, LoaiDangKy);
      if (errors.length > 0) {
        return res.status(422).json({ errors });
      }

      await NhuCauThueBUS.ThemNCThue(NCT);
      res.status(201).json({ message: "Thêm nhu cầu thuê thành công" });
    } catch (error) {
      console.log("--------------Lỗi ThemNCThue: ", error);
      res.status(400).json({ message: error });
    }
  }

  static async getDanhSachNhuCauThue(req: Request, res: Response) {
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

  static async getFilterOptions(req: Request, res: Response) {
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

  static async getChiTietNhuCauThue(req: Request, res: Response) {
    try {
      const { id } = req.params; // Lấy ID từ URL (vd: /api/nhucauthue/NCT01)

      const chiTiet = await NhuCauThueBUS.LayTTNCT(id as string);

      if (!chiTiet) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy thông tin nhu cầu thuê này",
        });
      }

      res.status(200).json({
        success: true,
        data: chiTiet,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Lỗi khi lấy chi tiết nhu cầu thuê: " + error.message,
      });
    }
  }
}
