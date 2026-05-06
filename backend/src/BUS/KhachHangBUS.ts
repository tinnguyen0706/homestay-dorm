import KhachHangDAO from "../DAO/KhachHangDAO.ts";

export default class KhachHangBUS {
  private MaKH: string;
  private HoTen: string;
  private GioiTinh: string;
  private Email: string;
  private QuocTich: string;
  private SDT: string;
  private MaNhomThue: string;

  constructor(KhachHang: {
    MaKH?: string;
    HoTen?: string;
    GioiTinh?: string;
    Email?: string;
    QuocTich?: string;
    SDT?: string;
    MaNhomThue?: string;
  }) {
    this.MaKH = KhachHang.MaKH ?? "";
    this.HoTen = KhachHang.HoTen ?? "";
    this.GioiTinh = KhachHang.GioiTinh ?? "";
    this.Email = KhachHang.Email ?? "";
    this.QuocTich = KhachHang.QuocTich ?? "";
    this.SDT = KhachHang.SDT ?? "";
    this.MaNhomThue = KhachHang.MaNhomThue ?? "";
  }

  // Getters
  get _MaKH(): string {
    return this.MaKH;
  }

  get _HoTen(): string {
    return this.HoTen;
  }

  get _GioiTinh(): string {
    return this.GioiTinh;
  }

  get _Email(): string {
    return this.Email;
  }

  get _QuocTich(): string {
    return this.QuocTich;
  }

  get _SDT(): string {
    return this.SDT;
  }

  get _MaNhomThue(): string {
    return this.MaNhomThue;
  }

  // Setters
  set _MaKH(value: string) {
    this.MaKH = value;
  }

  set _HoTen(value: string) {
    this.HoTen = value;
  }

  set _GioiTinh(value: string) {
    this.GioiTinh = value;
  }

  set _Email(value: string) {
    this.Email = value;
  }

  set _QuocTich(value: string) {
    this.QuocTich = value;
  }

  set _SDT(value: string) {
    this.SDT = value;
  }

  set _MaNhomThue(value: string) {
    this.MaNhomThue = value;
  }

  static async ThemKH(kh: KhachHangBUS): Promise<{ MaKH: string }> {
    return await KhachHangDAO.ThemKH(kh);
  }

  static KTraTTKH(kh: KhachHangBUS): boolean {
    if (!kh._HoTen || kh._HoTen.trim().length < 2) {
      throw new Error("Họ tên không hợp lệ (tối thiểu 2 ký tự)");
    }
    if (!/^\d{10,11}$/.test(kh._SDT)) {
      throw new Error("Số điện thoại không đúng định dạng (10-11 số)");
    }
    if (kh._Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(kh._Email)) {
      throw new Error("Email không đúng định dạng");
    }
    return true;
  }

  static async LayDSKH(MaKH?: string, HoTen?: string, SDT?: string): Promise<Array<KhachHangBUS>> {
    const result = await KhachHangDAO.LayDSKH(MaKH, HoTen, SDT);
    return result;
  }

  static async LayThongTinKH(MaKH: string): Promise<KhachHangBUS | null> {
    const result = await KhachHangDAO.LayThongTinKH(MaKH);
    return result;
  }
}