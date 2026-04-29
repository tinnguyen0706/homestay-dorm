import NhomThueBUS from "./NhomThueBUS.ts";
import NhomThueDAO from "../DAO/NhomThueDAO.ts";
import NhuCauThueDAO from "../DAO/NhuCauThueDAO.ts";
import TieuChiDAO from "../DAO/TieuChiDAO.ts";

export default class NhuCauThueBUS {
  private _MaNCT: string;
  private _MaKH_DaiDien: string;
  private _NhomThue: NhomThueBUS;
  private _LoaiPhong: string;
  private _SoNguoiDuKien: number;
  private _HinhThucThue: string;
  private _GiaMin: number;
  private _GiaMax: number;
  private _ThoiDiemVao: Date;
  private _ThoiHanThue: number;
  private _KhuVuc: string;
  private _TrangThai: string;
  private _TieuChi: string[];

  private _TenKhachHang: string;
  private _TenLoaiPhong: string;

  constructor(
    MaNCT: string = "",
    MaKH_DaiDien: string = "",
    NhomThue: NhomThueBUS = new NhomThueBUS(),
    LoaiPhong: string = "",
    SoNguoiDuKien: number = 0,
    HinhThucThue: string = "",
    GiaMin: number = 0,
    GiaMax: number = 0,
    ThoiDiemVao: Date = new Date(0),
    ThoiHanThue: number = 0,
    KhuVuc: string = "",
    TrangThai: string = "",
    TieuChi: string[] = [],
    TenKhachHang: string = "",
    TenLoaiPhong: string = "",
  ) {
    this._MaNCT = MaNCT;
    this._MaKH_DaiDien = MaKH_DaiDien;
    this._NhomThue = NhomThue;
    this._LoaiPhong = LoaiPhong;
    this._SoNguoiDuKien = SoNguoiDuKien;
    this._HinhThucThue = HinhThucThue;
    this._GiaMin = GiaMin;
    this._GiaMax = GiaMax;
    this._ThoiDiemVao = ThoiDiemVao;
    this._ThoiHanThue = ThoiHanThue;
    this._KhuVuc = KhuVuc;
    this._TrangThai = TrangThai;
    this._TieuChi = TieuChi;
    this._TenKhachHang = TenKhachHang;
    this._TenLoaiPhong = TenLoaiPhong;
  }

  get MaNCT(): string {
    return this._MaNCT;
  }

  set MaNCT(value: string) {
    this._MaNCT = value;
  }

  get MaKH_DaiDien(): string {
    return this._MaKH_DaiDien;
  }

  set MaKH_DaiDien(value: string) {
    this._MaKH_DaiDien = value;
  }

  get NhomThue(): NhomThueBUS {
    return this._NhomThue;
  }

  set NhomThue(value: NhomThueBUS) {
    this._NhomThue = value;
  }

  get LoaiPhong(): string {
    return this._LoaiPhong;
  }

  set LoaiPhong(value: string) {
    this._LoaiPhong = value;
  }

  get SoNguoiDuKien(): number {
    return this._SoNguoiDuKien;
  }

  set SoNguoiDuKien(value: number) {
    this._SoNguoiDuKien = value;
  }

  get HinhThucThue(): string {
    return this._HinhThucThue;
  }

  set HinhThucThue(value: string) {
    this._HinhThucThue = value;
  }

  get GiaMin(): number {
    return this._GiaMin;
  }

  set GiaMin(value: number) {
    this._GiaMin = value;
  }

  get GiaMax(): number {
    return this._GiaMax;
  }

  set GiaMax(value: number) {
    this._GiaMax = value;
  }

  get ThoiDiemVao(): Date {
    return this._ThoiDiemVao;
  }

  set ThoiDiemVao(value: Date) {
    this._ThoiDiemVao = value;
  }

  get ThoiHanThue(): number {
    return this._ThoiHanThue;
  }

  set ThoiHanThue(value: number) {
    this._ThoiHanThue = value;
  }

  get KhuVuc(): string {
    return this._KhuVuc;
  }

  set KhuVuc(value: string) {
    this._KhuVuc = value;
  }

  get TrangThai(): string {
    return this._TrangThai;
  }

  set TrangThai(value: string) {
    this._TrangThai = value;
  }

  get TieuChi(): string[] {
    return this._TieuChi;
  }

  set TieuChi(value: string[]) {
    this._TieuChi = value;
  }

  get TenKhachHang(): string {
    return this._TenKhachHang;
  }

  set TenKhachHang(value: string) {
    this._TenKhachHang = value;
  }

  get TenLoaiPhong(): string {
    return this._TenLoaiPhong;
  }

  set TenLoaiPhong(value: string) {
    this._TenLoaiPhong = value;
  }

  static KiemTraThongTin(
    NCT: NhuCauThueBUS,
    loaiDangKy: "ca-nhan" | "nhom",
  ): string[] {
    const errors: string[] = [];

    if (
      loaiDangKy === "ca-nhan" &&
      (!NCT.MaKH_DaiDien || NCT.MaKH_DaiDien.trim() === "")
    ) {
      errors.push("Phải chọn khách hàng.");
    }

    if (loaiDangKy === "nhom") {
      if (!NCT.MaKH_DaiDien || NCT.MaKH_DaiDien.trim() === "") {
        errors.push("Phải chọn khách hàng đại diện.");
      }
      if (NCT.SoNguoiDuKien < 2) {
        errors.push("Nhóm thuê phải có ít nhất 2 thành viên.");
      }
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(NCT.ThoiDiemVao.getTime()) || NCT.ThoiDiemVao <= today) {
      errors.push("Thời điểm vào phải sau ngày hiện tại.");
    }

    if (!NCT.ThoiHanThue || NCT.ThoiHanThue <= 2) {
      errors.push("Thời hạn thuê phải lớn hơn 2 tháng.");
    }

    if (!NCT.LoaiPhong || NCT.LoaiPhong.trim() === "") {
      errors.push("Phải chọn loại phòng.");
    }

    if (NCT.GiaMin > NCT.GiaMax) {
      errors.push("Giá tối thiểu không được lớn hơn giá tối đa.");
    }

    return errors;
  }

  static async ThemNCThue(NCT: NhuCauThueBUS): Promise<void> {
    const MaNhomThue = await NhomThueDAO.ThemNhom(NCT);
    NCT.NhomThue.MaNhomThue = MaNhomThue;
    const MaNCT = await NhuCauThueDAO.ThemNCT(NCT);
    await TieuChiDAO.ThemTieuChi_NCT(NCT.TieuChi, MaNCT);
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
