import pool from "../config/db.ts";
import type { ITaiKhoanNV, ITaiKhoanUsername } from "../types/ITaiKhoanNV.ts";

export default class TaiKhoanNVDAO {
  static async LayTTTK(TaiKhoanNV: ITaiKhoanNV): Promise<ITaiKhoanUsername[]> {
    const result = await pool.query(
      "SELECT USERNAME FROM TAIKHOAN_NV WHERE USERNAME = $1 AND PASSWORD = CRYPT($2, PASSWORD)",
      [TaiKhoanNV.Username, TaiKhoanNV.Password],
    );
    return result.rows;
  }
}
