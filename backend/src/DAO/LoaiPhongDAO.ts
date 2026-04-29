import pool from "../config/db.ts";
import { LoaiPhongBUS } from "../BUS/LoaiPhongBUS.ts";

export class LoaiPhongDAO {
  static async LayDSLoaiPhong(): Promise<LoaiPhongBUS[]> {
    const query = `
      SELECT MaLoai, TenLoai 
      FROM LOAIPHONG 
      ORDER BY TenLoai ASC
    `;
    const result = await pool.query(query);

    // Trả về object thuần như code ban đầu của bạn, ép kiểu as LoaiPhongBUS
    return result.rows.map(
      (row) =>
        ({
          MaLoai: row.maloai,
          TenLoai: row.tenloai,
        }) as LoaiPhongBUS,
    );
  }
}
