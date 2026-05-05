import pool from "../config/db.ts";
import DichVuBUS from "../BUS/DichVuBUS.ts";

export default class DichVuDAO {
  static async LayDSDV_ChiNhanh(maCN: string): Promise<DichVuBUS[]> {
    const result = await pool.query(
      `
      SELECT dv.madv, dv.tendv, dv.dongia, dv.donvitinh
      FROM DichVu dv
      JOIN ChiNhanh_DichVu cndv ON dv.madv = cndv.madv
      WHERE cndv.machinhanh = $1
      ORDER BY dv.madv ASC
    `,
      [maCN],
    );

    return result.rows.map(
      (row) => new DichVuBUS(row.madv, row.tendv, Number(row.dongia), row.donvitinh),
    );
  }
}
