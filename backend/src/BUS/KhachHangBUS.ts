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
    async TaoKhachHang(): Promise<{ MaKH: string }> {
        if (!this.HoTen || this.HoTen.trim().length < 2) {
            throw new Error("Họ tên không hợp lệ");
        }
        if (!/^\d{10,11}$/.test(this.SDT)) {
            throw new Error("Số điện thoại phải có 10-11 chữ số");
        }

        return await KhachHangDAO.insert({
            HoTen: this.HoTen,
            GioiTinh: this.GioiTinh,
            Email: this.Email,
            SDT: this.SDT,
            QuocTich: this.QuocTich
        });
    }
    static async LayDSKH(MaKH?: string, HoTen?: string, SDT?: string): Promise<Array<KhachHangBUS>> {
        const result = await KhachHangDAO.LayDSKH(MaKH, HoTen, SDT);
        return result;
    }
}