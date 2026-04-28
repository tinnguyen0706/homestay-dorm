import pool from "../config/db.ts";

export default class TieuChiDAO {
  static async LayDSTC(): Promise<string[]> {
    const result = await pool.query("SELECT TenTieuChi FROM TIEUCHI");
    return result.rows.map((row) => row.tentieuchi);
  }
}
