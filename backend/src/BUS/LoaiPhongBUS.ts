import LoaiPhongDAO from "../DAO/LoaiPhongDAO.ts";

export default class LoaiPhongBUS {
  private MaLoai: string;
  private TenLoai: string;

  constructor(MaLoai: string = "", TenLoai: string = "") {
    this.MaLoai = MaLoai;
    this.TenLoai = TenLoai;
  }

  // Getters
  get _MaLoai(): string {
    return this.MaLoai;
  }

  get _TenLoai(): string {
    return this.TenLoai;
  }

  // Setters
  set _MaLoai(value: string) {
    this.MaLoai = value;
  }

  set _TenLoai(value: string) {
    this.TenLoai = value;
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
