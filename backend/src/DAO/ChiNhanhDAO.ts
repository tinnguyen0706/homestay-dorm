import pool from "../config/db.ts";
import ChiNhanhBUS from "../BUS/ChiNhanhBUS.ts";

export default class ChiNhanhDAO {
  static async LayDSChiNhanh(): Promise<ChiNhanhBUS[]> {
    const result = await pool.query(`
      SELECT machinhanh, tenchinhanh
      FROM ChiNhanh
      ORDER BY machinhanh ASC
    `);

    return result.rows.map(
      (row) => new ChiNhanhBUS(row.machinhanh, row.tenchinhanh ?? row.machinhanh, row.tenchinhanh ?? row.machinhanh, ""),
    );
  }

  static async LayThongTinChiNhanh(MaCN: string): Promise<ChiNhanhBUS | null> {
    const result = await pool.query(
      `
      SELECT machinhanh, tenchinhanh, diachi
      FROM ChiNhanh
      WHERE machinhanh = $1
    `,
      [MaCN],
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return new ChiNhanhBUS(
      row.machinhanh,
      row.tenchinhanh ?? row.machinhanh,
      row.tenchinhanh ?? row.machinhanh,
      row.diachi,
    );
  }
}
