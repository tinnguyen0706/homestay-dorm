import LoaiPhongDAO from "../DAO/LoaiPhongDAO.ts";

export default class LoaiPhongBUS {
  MaLoai: string;
  TenLoai: string;

  constructor(MaLoai: string = "", TenLoai: string = "") {
    this.MaLoai = MaLoai;
    this.TenLoai = TenLoai;
  }

  static async LayDSLoaiPhong(): Promise<LoaiPhongBUS[]> {
    return await LoaiPhongDAO.LayDSLoaiPhong();
  }

  static async LayThongTinLoaiPhong(
    MaLoai: string,
  ): Promise<LoaiPhongBUS | null> {
    return await LoaiPhongDAO.LayThongTinLoaiPhong(MaLoai);
  }
}
