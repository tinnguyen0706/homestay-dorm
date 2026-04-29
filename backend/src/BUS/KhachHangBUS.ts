import KhachHangDAO from "../DAO/KhachHangDAO.ts";

export default class KhachHangBUS {
  MaKH: string;
  HoTen: string;
  GioiTinh: string;
  Email: string;
  QuocTich: string;
  SDT: string;
  MaNhomThue: string;

        constructor(KhachHang: KhachHangBUS) {
            this.MaKH = KhachHang.MaKH;
            this.HoTen = KhachHang.HoTen;
            this.GioiTinh = KhachHang.GioiTinh;
            this.Email = KhachHang.Email;
            this.QuocTich = KhachHang.QuocTich;
            this.SDT = KhachHang.SDT;
            this.MaNhomThue = KhachHang.MaNhomThue;
        }
        static async ThemKH(kh: {
            HoTen: string;
            GioiTinh: string;
            Email: string;
            SDT: string;
            QuocTich: string;
        }): Promise<{ MaKH: string }> {
                return await KhachHangDAO.ThemKH(kh);
        }
        static KTraTTKH(kh: { HoTen: string; SDT: string; Email: string; }): boolean {
            if (!kh.HoTen || kh.HoTen.trim().length < 2) {
                throw new Error("Họ tên không hợp lệ (tối thiểu 2 ký tự)");
            }
            if (!/^\d{10,11}$/.test(kh.SDT)) {
                throw new Error("Số điện thoại không đúng định dạng (10-11 số)");
            }
            if (kh.Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(kh.Email)) {
                throw new Error("Email không đúng định dạng");
            }
            return true; 
        }

  static async LayDSKH(
    MaKH?: string,
    HoTen?: string,
    SDT?: string,
  ): Promise<Array<KhachHangBUS>> {
    const result = await KhachHangDAO.LayDSKH(MaKH, HoTen, SDT);
    return result;
  }

  static async LayThongTinKH(MaKH: string): Promise<KhachHangBUS | null> {
    const result = await KhachHangDAO.LayThongTinKH(MaKH);
    return result;
  }
}
