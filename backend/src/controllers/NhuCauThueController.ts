import type { Request, Response } from "express";
import NhuCauThueBUS from "../BUS/NhuCauThueBUS.ts";
import NhomThueBUS from "../BUS/NhomThueBUS.ts";
import KhachHangBUS from "../BUS/KhachHangBUS.ts";

export default class NhuCauThueController {
    static async ThemNCThue(req: Request, res: Response) {
        try {
            const {
                MaKH_DaiDien,
                DanhSachKH,
                LoaiPhong,
                SoNguoiDuKien,
                HinhThucThue,
                GiaMin,
                GiaMax,
                ThoiDiemVao,
                ThoiHanThue,
                KhuVuc,
                TrangThai,
                TieuChi,
                LoaiDangKy,
            } = req.body;

            const nhomThue = new NhomThueBUS(
                "",
                (DanhSachKH as string[]).map(
                    (maKH) => new KhachHangBUS({ MaKH: maKH, HoTen: "", GioiTinh: "", Email: "", QuocTich: "", SDT: "", MaNhomThue: "" }),
                ),
            );

            const NCT = new NhuCauThueBUS(
                "",
                MaKH_DaiDien,
                nhomThue,
                LoaiPhong,
                Number(SoNguoiDuKien),
                HinhThucThue,
                Number(GiaMin),
                Number(GiaMax),
                new Date(ThoiDiemVao),
                Number(ThoiHanThue),
                KhuVuc,
                TrangThai,
                TieuChi,
            );

            const errors = NhuCauThueBUS.KiemTraThongTin(NCT, LoaiDangKy);
            if (errors.length > 0) {
                return res.status(422).json({ errors });
            }

            await NhuCauThueBUS.ThemNCThue(NCT);
            res.status(201).json({ message: "Thêm nhu cầu thuê thành công" });
        } catch (error) {
            console.log("--------------Lỗi ThemNCThue: ", error);
            res.status(400).json({ message: error });
        }
    }
}