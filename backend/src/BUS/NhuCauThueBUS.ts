import { NhuCauThueDAO } from "../DAO/NhuCauThueDAO.ts";

export default class NhuCauThueBUS {
  MaNhuCau!: string;
  SoNguoiDuKien!: number;
  HinhThucThue!: string;
  GiaMin!: number;
  GiaMax!: number;
  ThoiDiemVao!: Date;
  ThoiHanThue!: number;
  KhuVuc?: string;
  TrangThai!: string;
  MaKH!: string;
  MaNhomThue?: string;
  MaLoai!: string;

  // Thuộc tính mở rộng để hiển thị trên Frontend
  TenKhachHang?: string;
  TenLoaiPhong?: string;

  constructor(data?: Partial<NhuCauThueBUS>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  static async LayDSNCT(filters: any) {
    if (
      filters.GiaMin &&
      filters.GiaMax &&
      Number(filters.GiaMin) > Number(filters.GiaMax)
    ) {
      throw new Error("Giá tối thiểu không được lớn hơn giá tối đa.");
    }
    return await NhuCauThueDAO.LayDSNCT(filters);
  }

  // Bổ sung hàm này ngay dưới hàm LayDSNCT
  static async LayTTNCT(MaNhuCau: string): Promise<NhuCauThueBUS | null> {
    return await NhuCauThueDAO.LayTTNCT(MaNhuCau);
  }
}
