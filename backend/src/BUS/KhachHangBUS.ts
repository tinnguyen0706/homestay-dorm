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
        async ThemKH(): Promise<{ MaKH: string }> {
        // Gọi hàm kiểm tra trước (theo bước 2.1 trong sơ đồ)
        if (this.KTraTTKH()) {
            // Nếu hợp lệ -> Gọi xuống DAO (bước 2.3 trong sơ đồ)
            return await KhachHangDAO.ThemKH(this);
        }
        throw new Error("Thông tin không hợp lệ");
    }
        
        KTraTTKH(): boolean {
        if (!this.HoTen || this.HoTen.trim().length < 2) {
            throw new Error("Họ tên không hợp lệ");
        }
        if (!/^\d{10,11}$/.test(this.SDT)) {
            throw new Error("Số điện thoại phải có 10-11 chữ số");
        }
        if (this.Email && !this.Email.includes("@")) {
            throw new Error("Email không đúng định dạng");
        }
        return true; // Trả về true nếu mọi thứ hợp lệ
    }

        static async LayDSKH(MaKH?: string, HoTen?: string, SDT?: string): Promise<Array<KhachHangBUS>> {
            const result = await KhachHangDAO.LayDSKH(MaKH, HoTen, SDT);
            return result;
        }
    }