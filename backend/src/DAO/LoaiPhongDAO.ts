import pool from "../config/db.ts";
import LoaiPhongBUS from "../BUS/LoaiPhongBUS.ts";

export default class LoaiPhongDAO {
    static async LayDSLoaiPhong(): Promise<LoaiPhongBUS[]> {
        const result = await pool.query("SELECT MaLoai, TenLoai FROM LOAIPHONG");
        return result.rows.map((row) => new LoaiPhongBUS(row.maloai, row.tenloai));
    }
}