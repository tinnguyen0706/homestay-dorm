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

    query += " ORDER BY makh desc";

    const result = await pool.query(query, params);
    return result.rows.map((row) => new KhachHangBUS(row));
  }
  static async ThemKH(kh: {
    HoTen: string;
    GioiTinh: string;
    Email: string;
    SDT: string;
    QuocTich: string;
  }): Promise<{ MaKH: string }> {
    const { HoTen, GioiTinh, Email, SDT, QuocTich } = kh;

    const query = `
                INSERT INTO khachhang (hoten, gioitinh, email, sdt, quoctich)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING makh as "MaKH"
            `;
    const result = await pool.query(query, [
      HoTen,
      GioiTinh,
      Email,
      SDT,
      QuocTich,
    ]);
    return result.rows[0];
  }

  static async LayThongTinKH(MaKH: string): Promise<KhachHangBUS | null> {
    const query = "SELECT * FROM khachhang WHERE makh = $1";
    const result = await pool.query(query, [MaKH]);
    if (result.rows.length === 0) {
      return null;
    }
    return new KhachHangBUS(result.rows[0]);
  }
}
