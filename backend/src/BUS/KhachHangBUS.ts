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

    static async LayDSKH(MaKH?: string, HoTen?: string, SDT?: string): Promise<Array<KhachHangBUS>> {
        const result = await KhachHangDAO.LayDSKH(MaKH, HoTen, SDT);
        return result;
    }
}