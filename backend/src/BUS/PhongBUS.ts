import LoaiPhongBUS from "./LoaiPhongBUS.ts";
import ChiNhanhBUS from "./ChiNhanhBUS.ts";
import GiuongBUS from "./GiuongBUS.ts";
import { PhongDAO } from "../DAO/PhongDAO.js";

export class PhongBUS {
  MaPhong!: string;
  TenPhong!: string;
  LoaiPhong!: string;
  SucChuaToiDa!: number;
  GioiTinhChoPhep!: string;
  TrangThai!: string;
  ChiNhanh!: ChiNhanhBUS;
  GiaThue?: number;
  Giuong?: GiuongBUS[];
  TaiSan?: any[];
  TieuChi?: any[];

  constructor(data?: Partial<PhongBUS>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  static async LayDSPhong(filters: any) {
    return PhongDAO.LayDSPhong(filters);
  }

  static async LayFilterOptions() {
    const [chiNhanh, loaiPhong, gioiTinh, trangThai] = await Promise.all([
      ChiNhanhBUS.LayDSChiNhanh(),
      LoaiPhongBUS.LayDSLoaiPhong(),
      PhongDAO.LayDSGioiTinh(),
      PhongDAO.LayDSTrangThai(),
    ]);

    return {
      ChiNhanh: chiNhanh,
      LoaiPhong: loaiPhong.map((lp) => ({
        MaLoai: lp.MaLoai,
        TenLoai: lp.TenLoai,
      })),
      GioiTinh: gioiTinh,
      TrangThai: trangThai,
    };
  }

  static async LayTTPhong(maPhong: string) {
    if (!maPhong) {
      throw new Error("Ma phong khong hop le");
    }

    const phong = await PhongDAO.LayTTPhong(maPhong);
    if (!phong) return null;

    const [chiNhanhInfo, giuong, dichVu] = await Promise.all([
      ChiNhanhBUS.LayThongTinChiNhanh(phong.ChiNhanh.MaCN),
      GiuongBUS.LayDSGiuongTrongPhong(maPhong),
      ChiNhanhBUS.LayDSDichVuTaiChiNhanh(phong.ChiNhanh.MaCN),
    ]);

    if (chiNhanhInfo) {
      phong.ChiNhanh = chiNhanhInfo;
    }
    phong.ChiNhanh.DichVu = dichVu;

    phong.Giuong = giuong;
    if (giuong.length > 0) {
      const tongGia = giuong.reduce((sum, g) => sum + (g.GiaThueGiuong || 0), 0);
      phong.GiaThue = tongGia / giuong.length;
    }

    return phong;
  }
}
