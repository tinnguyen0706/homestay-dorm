import NhuCauThueBUS from "../BUS/NhuCauThueBUS.ts";
import pool from "../config/db.ts";
export default class NhuCauThueDAO {
  static async ThemNCT(NhuCauThue: NhuCauThueBUS): Promise<void> {
    // const query = pool.query(
    //   "Insert into NHUCAUTHUE(SoNguoiDuKien, HinhThucThue, GiaMin, GiaMax, ThoiDiemVao, ThoiHanThue, KhuVuc, TrangThai, MaKH, MaNhomThue, MaLoai) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
    //   [
    //     NhuCauThue.SoNguoiDuKien,
    //     NhuCauThue.HinhThucThue,
    //     NhuCauThue.GiaMin,
    //     NhuCauThue.GiaMax,
    //     NhuCauThue.ThoiDiemVao,
    //     NhuCauThue.ThoiHanThue,
    //     NhuCauThue.KhuVuc,
    //     NhuCauThue.TrangThai,
    //     NhuCauThue.MaKH,
    //     NhuCauThue.NhomThue.MaNhomThue,
    //     NhuCauThue.MaLoai,
    //   ],
    // );
  }
}
