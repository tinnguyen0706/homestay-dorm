import { PhongDAO } from "../DAO/PhongDAO.js";

export class PhongBUS {
  MaPhong!: string;
  TenPhong!: string;
  LoaiPhong!: string;
  SucChuaToiDa!: number;
  GioiTinhChoPhep!: string;
  TrangThai!: string;
  MaCN!: string;
  TenChiNhanh?: string;
  DiaChi?: string;
  GiaThue?: number;
  Giuong?: any[];
  TaiSan?: any[];
  DichVu?: any[];
  TieuChi?: any[];

  constructor(data?: Partial<PhongBUS>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  static async LayDSPhong(filters: any) {
    const dsPhong = await PhongDAO.LayDSPhong(filters);
    return dsPhong;
  }

  static async LayFilterOptions() {
    return PhongDAO.LayFilterOptions();
  }

  static async LayTTPhong(maPhong: string) {
    if (!maPhong) {
      throw new Error("Ma phong khong hop le");
    }
    const phong = await PhongDAO.LayTTPhong(maPhong);
    return phong;
  }
}
