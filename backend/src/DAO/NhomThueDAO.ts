import NhuCauThueBUS from "../BUS/NhuCauThueBUS.ts";
import pool from "../config/db.ts";

export default class NhomThueDAO {
  static async ThemNhom(NCT: NhuCauThueBUS): Promise<string> {
    try {
      const result = await pool.query(
        "INSERT INTO NHOMTHUE (MaKH_DaiDien) VALUES ($1) RETURNING MaNhomThue",
        [NCT.MaKH_DaiDien],
      );
      const MaNhomThue = result.rows[0].manhomthue ?? result.rows[0].MaNhomThue;
      for (const KH of NCT.NhomThue.KH) {
        await pool.query(
          "UPDATE KHACHHANG SET MaNhomThue = $1 WHERE MaKH = $2",
          [MaNhomThue, KH.MaKH],
        );
      }
      return MaNhomThue;
    } catch (error) {
      console.log("-----Lỗi thêm nhóm: ", error);
      throw error;
    }
  }
}
