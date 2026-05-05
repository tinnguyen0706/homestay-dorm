import pool from "../config/db.ts";
import GiuongBUS from "../BUS/GiuongBUS.ts";

export default class GiuongDAO {
  static async LayDSGiuongTrongPhong(maPhong: string): Promise<GiuongBUS[]> {
    const result = await pool.query(
      `
      SELECT g.mataisan, g.trangthai, g.giathuegiuong
      FROM Giuong g
      JOIN TaiSan ts ON g.mataisan = ts.mataisan
      WHERE ts.maphong = $1
      ORDER BY g.mataisan ASC
    `,
      [maPhong],
    );

    return result.rows.map(
      (row) => new GiuongBUS(row.mataisan, Number(row.giathuegiuong), row.trangthai, maPhong),
    );
  }
}
