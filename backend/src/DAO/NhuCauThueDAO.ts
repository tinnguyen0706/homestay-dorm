import pool from "../config/db.ts";
import NhuCauThueBUS from "../BUS/NhuCauThueBUS.ts";

export class NhuCauThueDAO {
  static async LayDSNCT(filters: any = {}): Promise<NhuCauThueBUS[]> {
    let query = `
      SELECT 
        n.manhucau, n.songuoidukien, n.hinhthucthue, n.giamin, n.giamax,
        n.thoidiemvao, n.thoihanthue, n.khuvuc, n.trangthai,
        n.makh, n.manhomthue, n.maloai,
        k.hoten AS tenkhachhang, 
        l.tenloai AS tenloaiphong
      FROM NHUCAUTHUE n
      LEFT JOIN KHACHHANG k ON n.makh = k.makh
      LEFT JOIN LOAIPHONG l ON n.maloai = l.maloai
      WHERE 1=1
    `;
    const values: any[] = [];
    let paramIndex = 1;

    if (filters.SoNguoiDuKien) {
      query += ` AND n.songuoidukien = $${paramIndex++}`;
      values.push(filters.SoNguoiDuKien);
    }
    if (filters.HinhThucThue && filters.HinhThucThue !== "all") {
      query += ` AND n.hinhthucthue = $${paramIndex++}`;
      values.push(filters.HinhThucThue);
    }
    if (filters.KhuVuc && filters.KhuVuc !== "all") {
      query += ` AND n.khuvuc = $${paramIndex++}`;
      values.push(filters.KhuVuc);
    }
    if (filters.TrangThai && filters.TrangThai !== "all") {
      query += ` AND n.trangthai = $${paramIndex++}`;
      values.push(filters.TrangThai);
    }
    if (filters.ThoiHanThue) {
      query += ` AND n.thoihanthue = $${paramIndex++}`;
      values.push(filters.ThoiHanThue);
    }
    if (filters.LoaiPhong && filters.LoaiPhong !== "all") {
      query += ` AND n.maloai = $${paramIndex++}`; // Lọc theo MaLoai
      values.push(filters.LoaiPhong);
    }

    query += ` ORDER BY n.manhucau DESC`;

    const result = await pool.query(query, values);

    return result.rows.map(
      (row) =>
        new NhuCauThueBUS({
          MaNhuCau: row.manhucau,
          SoNguoiDuKien: row.songuoidukien,
          HinhThucThue: row.hinhthucthue,
          GiaMin: parseFloat(row.giamin), // Convert từ Numeric
          GiaMax: parseFloat(row.giamax),
          ThoiDiemVao: row.thoidiemvao,
          ThoiHanThue: row.thoihanthue,
          KhuVuc: row.khuvuc,
          TrangThai: row.trangthai,
          MaKH: row.makh,
          MaNhomThue: row.manhomthue,
          MaLoai: row.maloai,
          TenKhachHang: row.tenkhachhang, // Data từ JOIN
          TenLoaiPhong: row.tenloaiphong, // Data từ JOIN
        }),
    );
  }

  // Lấy chi tiết 1 nhu cầu thuê theo Mã
  static async LayTTNCT(MaNhuCau: string): Promise<NhuCauThueBUS | null> {
    const query = `
      SELECT n.*, k.hoten AS tenkhachhang, l.tenloai AS tenloaiphong
      FROM NHUCAUTHUE n
      LEFT JOIN KHACHHANG k ON n.makh = k.makh
      LEFT JOIN LOAIPHONG l ON n.maloai = l.maloai
      WHERE n.manhucau = $1
    `;
    const result = await pool.query(query, [MaNhuCau]);

    if (result.rows.length === 0) return null;

    const row = result.rows[0];

    // Trả về object thuần ép kiểu sang BUS
    return {
      MaNhuCau: row.manhucau,
      SoNguoiDuKien: row.songuoidukien,
      HinhThucThue: row.hinhthucthue,
      GiaMin: parseFloat(row.giamin),
      GiaMax: parseFloat(row.giamax),
      ThoiDiemVao: row.thoidiemvao,
      ThoiHanThue: row.thoihanthue,
      KhuVuc: row.khuvuc,
      TrangThai: row.trangthai,
      MaKH: row.makh,
      MaLoai: row.maloai,
      TenKhachHang: row.tenkhachhang,
      TenLoaiPhong: row.tenloaiphong,
    } as NhuCauThueBUS;
  }
}
