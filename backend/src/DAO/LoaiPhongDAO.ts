import pool from "../config/db.ts";
import LoaiPhongBUS from "../BUS/LoaiPhongBUS.ts";

export default class LoaiPhongDAO {
    static async LayDSLoaiPhong(): Promise<LoaiPhongBUS[]> {
        const result = await pool.query("SELECT MaLoai, TenLoai FROM LOAIPHONG");
        return result.rows.map((row) => new LoaiPhongBUS(row.maloai, row.tenloai));
    }

    static async LayThongTinLoaiPhong(MaLoai: string): Promise<LoaiPhongBUS | null> {
        const query = "SELECT * FROM LOAIPHONG WHERE MaLoai = $1";
        const result = await pool.query(query, [MaLoai]);
        if (result.rows.length === 0) {
            return null;
        }
        const row = result.rows[0];
        return new LoaiPhongBUS(row.maloai, row.tenloai);
    }  
}