import NhuCauThueBUS from "../BUS/NhuCauThueBUS.ts";
import pool from "../config/db.ts";
export default class NhuCauThueDAO {
  static async ThemNCT(NhuCauThue: NhuCauThueBUS): Promise<string> {
    const result = await pool.query(
      "INSERT INTO NHUCAUTHUE(SoNguoiDuKien, HinhThucThue, GiaMin, GiaMax, ThoiDiemVao, ThoiHanThue, KhuVuc, TrangThai, MaKH, MaNhomThue, MaLoai) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING MaNhuCau",
      [
        NhuCauThue.SoNguoiDuKien,
        NhuCauThue.HinhThucThue,
        NhuCauThue.GiaMin,
        NhuCauThue.GiaMax,
        NhuCauThue.ThoiDiemVao,
        NhuCauThue.ThoiHanThue,
        NhuCauThue.KhuVuc,
        NhuCauThue.TrangThai,
        NhuCauThue.MaKH_DaiDien,
        NhuCauThue.NhomThue.MaNhomThue,
        NhuCauThue.LoaiPhong,
      ],
    );
    return result.rows[0].manhucau;
  }
}
