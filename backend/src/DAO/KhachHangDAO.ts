import KhachHangBUS from "../BUS/KhachHangBUS.ts";
import pool from "../config/db.ts";

export default class KhachHangDAO {
  static async LayDSKH(
    MaKH: string | null = null,
    HoTen: string | null = null,
    SDT: string | null = null,
  ): Promise<KhachHangBUS[]> {
    const conditions: string[] = [];
    const values: string[] = [];

    if (MaKH !== null && MaKH !== "") {
      values.push(MaKH);
      conditions.push(`MaKH = $${values.length}`);
    }

    if (HoTen !== null && HoTen !== "") {
      values.push(HoTen);
      conditions.push(`HoTen ILIKE $${values.length}`);
    }

    if (SDT !== null && SDT !== "") {
      values.push(SDT);
      conditions.push(`SDT = $${values.length}`);
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const result = await pool.query(
      `
                SELECT MaKH, HoTen, GioiTinh, Email, QuocTich, SDT, MaNhomThue
                FROM KHACHHANG
                ${whereClause}
                ORDER BY MaKH
            `,
      values,
    );

    return result.rows.map(
      (row) =>
        new KhachHangBUS(
          row.makh,
          row.hoten,
          row.gioitinh,
          row.email,
          row.quoctich,
          row.sdt,
          row.manhomthue,
          "",
        ),
    );
  }
}
