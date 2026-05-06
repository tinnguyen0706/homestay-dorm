import GiuongDAO from "../DAO/GiuongDAO.ts";

export default class GiuongBUS {
  private MaTaiSan: string;
  private GiaThueGiuong: number;
  private TrangThai: string;
  private MaPhong: string;

  constructor(
    MaTaiSan: string = "",
    GiaThueGiuong: number = 0,
    TrangThai: string = "",
    MaPhong: string = "",
  ) {
    this.MaTaiSan = MaTaiSan;
    this.GiaThueGiuong = GiaThueGiuong;
    this.TrangThai = TrangThai;
    this.MaPhong = MaPhong;
  }

  // Getters
  get _MaTaiSan(): string {
    return this.MaTaiSan;
  }

  get _GiaThueGiuong(): number {
    return this.GiaThueGiuong;
  }

  get _TrangThai(): string {
    return this.TrangThai;
  }

  get _MaPhong(): string {
    return this.MaPhong;
  }

  // Setters
  set _MaTaiSan(value: string) {
    this.MaTaiSan = value;
  }

  set _GiaThueGiuong(value: number) {
    this.GiaThueGiuong = value;
  }

  set _TrangThai(value: string) {
    this.TrangThai = value;
  }

  set _MaPhong(value: string) {
    this.MaPhong = value;
  }

  static async LayDSGiuongTrongPhong(maPhong: string): Promise<GiuongBUS[]> {
    return GiuongDAO.LayDSGiuongTrongPhong(maPhong);
  }
}
