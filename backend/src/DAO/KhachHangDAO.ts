import pool from "../config/db.ts";
import KhachHangBUS from "../BUS/KhachHangBUS.ts";

export default class KhachHangDAO {
  static async LayDSKH(
    MaKH?: string,
    HoTen?: string,
    SDT?: string,
  ): Promise<Array<KhachHangBUS>> {
    let query =
      'SELECT makh as "MaKH", hoten as "HoTen", gioitinh as "GioiTinh", email as "Email", sdt as "SDT", quoctich as "QuocTich", manhomthue as "MaNhomThue" FROM khachhang';
    const params: string[] = [];

    if (MaKH) {
      query += " WHERE makh ILIKE $1";
      params.push("%" + MaKH + "%");
    } else if (HoTen) {
      query += " WHERE hoten ILIKE $1";
      params.push("%" + HoTen + "%");
    } else if (SDT) {
      query += " WHERE sdt ILIKE $1";
      params.push("%" + SDT + "%");
    }
    const result = await pool.query(query, params);
    return result.rows.map((row) => new KhachHangBUS(row));
  }
}
