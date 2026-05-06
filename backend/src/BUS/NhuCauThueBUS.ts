import NhomThueBUS from "./NhomThueBUS.ts";
import NhomThueDAO from "../DAO/NhomThueDAO.ts";
import NhuCauThueDAO from "../DAO/NhuCauThueDAO.ts";
import TieuChiDAO from "../DAO/TieuChiDAO.ts";
import TieuChiBUS from "./TieuChiBUS.ts";

export default class NhuCauThueBUS {
  private MaNCT: string;
  private MaKH_DaiDien: string;
  private NhomThue: NhomThueBUS;
  private LoaiPhong: string;
  private SoNguoiDuKien: number;
  private HinhThucThue: string;
  private GiaMin: number;
  private GiaMax: number;
  private ThoiDiemVao: Date;
  private ThoiHanThue: number;
  private KhuVuc: string;
  private TrangThai: string;
  private TieuChi: TieuChiBUS[];

  private TenKhachHang: string;
  private TenLoaiPhong: string;

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
    TieuChi: TieuChiBUS[] = [],
    TenKhachHang: string = "",
    TenLoaiPhong: string = "",
  ) {
    this.MaNCT = MaNCT;
    this.MaKH_DaiDien = MaKH_DaiDien;
    this.NhomThue = NhomThue;
    this.LoaiPhong = LoaiPhong;
    this.SoNguoiDuKien = SoNguoiDuKien;
    this.HinhThucThue = HinhThucThue;
    this.GiaMin = GiaMin;
    this.GiaMax = GiaMax;
    this.ThoiDiemVao = ThoiDiemVao;
    this.ThoiHanThue = ThoiHanThue;
    this.KhuVuc = KhuVuc;
    this.TrangThai = TrangThai;
    this.TieuChi = TieuChi;
    this.TenKhachHang = TenKhachHang;
    this.TenLoaiPhong = TenLoaiPhong;
  }

  // Getters
  get _MaNCT(): string {
    return this.MaNCT;
  }

  get _MaKH_DaiDien(): string {
    return this.MaKH_DaiDien;
  }

  get _NhomThue(): NhomThueBUS {
    return this.NhomThue;
  }

  get _LoaiPhong(): string {
    return this.LoaiPhong;
  }

  get _SoNguoiDuKien(): number {
    return this.SoNguoiDuKien;
  }

  get _HinhThucThue(): string {
    return this.HinhThucThue;
  }

  get _GiaMin(): number {
    return this.GiaMin;
  }

  get _GiaMax(): number {
    return this.GiaMax;
  }

  get _ThoiDiemVao(): Date {
    return this.ThoiDiemVao;
  }

  get _ThoiHanThue(): number {
    return this.ThoiHanThue;
  }

  get _KhuVuc(): string {
    return this.KhuVuc;
  }

  get _TrangThai(): string {
    return this.TrangThai;
  }

  get _TieuChi(): TieuChiBUS[] {
    return this.TieuChi;
  }

  get _TenKhachHang(): string {
    return this.TenKhachHang;
  }

  get _TenLoaiPhong(): string {
    return this.TenLoaiPhong;
  }

  // Setters
  set _MaNCT(value: string) {
    this.MaNCT = value;
  }

  set _MaKH_DaiDien(value: string) {
    this.MaKH_DaiDien = value;
  }

  set _NhomThue(value: NhomThueBUS) {
    this.NhomThue = value;
  }

  set _LoaiPhong(value: string) {
    this.LoaiPhong = value;
  }

  set _SoNguoiDuKien(value: number) {
    this.SoNguoiDuKien = value;
  }

  set _HinhThucThue(value: string) {
    this.HinhThucThue = value;
  }

  set _GiaMin(value: number) {
    this.GiaMin = value;
  }

  set _GiaMax(value: number) {
    this.GiaMax = value;
  }

  set _ThoiDiemVao(value: Date) {
    this.ThoiDiemVao = value;
  }

  set _ThoiHanThue(value: number) {
    this.ThoiHanThue = value;
  }

  set _KhuVuc(value: string) {
    this.KhuVuc = value;
  }

  set _TrangThai(value: string) {
    this.TrangThai = value;
  }

  set _TieuChi(value: TieuChiBUS[]) {
    this.TieuChi = value;
  }

  set _TenKhachHang(value: string) {
    this.TenKhachHang = value;
  }

  set _TenLoaiPhong(value: string) {
    this.TenLoaiPhong = value;
  }

  static KiemTraThongTin(
    NCT: NhuCauThueBUS,
    loaiDangKy: "ca-nhan" | "nhom",
  ): string[] {
    const errors: string[] = [];

    if (
      loaiDangKy === "ca-nhan" &&
      (!NCT._MaKH_DaiDien || NCT._MaKH_DaiDien.trim() === "")
    ) {
      errors.push("Phải chọn khách hàng.");
    }

    if (loaiDangKy === "nhom") {
      if (!NCT._MaKH_DaiDien || NCT._MaKH_DaiDien.trim() === "") {
        errors.push("Phải chọn khách hàng đại diện.");
      }
      if (NCT._SoNguoiDuKien < 2) {
        errors.push("Nhóm thuê phải có ít nhất 2 thành viên.");
      }
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(NCT._ThoiDiemVao.getTime()) || NCT._ThoiDiemVao <= today) {
      errors.push("Thời điểm vào phải sau ngày hiện tại.");
    }

    if (!NCT._ThoiHanThue || NCT._ThoiHanThue <= 2) {
      errors.push("Thời hạn thuê phải lớn hơn 2 tháng.");
    }

    if (!NCT._LoaiPhong || NCT._LoaiPhong.trim() === "") {
      errors.push("Phải chọn loại phòng.");
    }

    if (NCT._GiaMin > NCT._GiaMax) {
      errors.push("Giá tối thiểu không được lớn hơn giá tối đa.");
    }

    return errors;
  }

  static async ThemNCThue(NCT: NhuCauThueBUS): Promise<void> {
    const MaNhomThue = await NhomThueDAO.ThemNhom(NCT);
    NCT._NhomThue._MaNhomThue = MaNhomThue;
    const MaNCT = await NhuCauThueDAO.ThemNCT(NCT);
    await TieuChiDAO.ThemTieuChi_NCT(
      NCT._TieuChi.map((tieuChi) => tieuChi._MaTieuChi),
      MaNCT,
    );
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

  static async LayTTNCT(MaNhuCau: string): Promise<NhuCauThueBUS | null> {
    return await NhuCauThueDAO.LayTTNCT(MaNhuCau);
  }
}
