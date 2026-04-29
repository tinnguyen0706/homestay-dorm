import pool from "../config/db.ts";
import TieuChiBUS from "../BUS/TieuChiBUS.ts";

export default class TieuChiDAO {
  static async LayDSTC(): Promise<TieuChiBUS[]> {
    const result = await pool.query("SELECT MaTieuChi, TenTieuChi FROM TIEUCHI");
    return result.rows.map((row) => new TieuChiBUS(row.matieuchi, row.tentieuchi));
  }

  static async ThemTieuChi_NCT(MaTieuChi: string[], MaNCT: string): Promise<void> {
    for (const ma of MaTieuChi) {
      await pool.query(
        "INSERT INTO TIEUCHI_NHUCAU (MaTieuChi, MaNhuCau) VALUES ($1, $2)",
        [ma, MaNCT],
      );
    }
  }
}
