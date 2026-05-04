import GiuongDAO from "../DAO/GiuongDAO.ts";

export default class GiuongBUS {
  MaTaiSan: string;
  GiaThueGiuong: number;
  TrangThai: string;
  MaPhong: string;

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

  static async LayDSGiuongTrongPhong(maPhong: string): Promise<GiuongBUS[]> {
    return GiuongDAO.LayDSGiuongTrongPhong(maPhong);
  }
}
