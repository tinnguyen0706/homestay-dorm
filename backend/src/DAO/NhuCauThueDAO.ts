import NhomThueBUS from "../BUS/NhomThueBUS.ts";
import NhuCauThueBUS from "../BUS/NhuCauThueBUS.ts";
import LoaiPhongBUS from "../BUS/LoaiPhongBUS.ts";
import TieuChiBUS from "../BUS/TieuChiBUS.ts";
import pool from "../config/db.ts";
export default class NhuCauThueDAO {
  static async ThemNCT(NhuCauThue: NhuCauThueBUS): Promise<string> {
    const result = await pool.query(
      "INSERT INTO NHUCAUTHUE(SoNguoiDuKien, HinhThucThue, GiaMin, GiaMax, ThoiDiemVao, ThoiHanThue, KhuVuc, TrangThai, MaKH, MaNhomThue, MaLoai) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING MaNhuCau",
      [
        NhuCauThue._SoNguoiDuKien,
        NhuCauThue._HinhThucThue,
        NhuCauThue._GiaMin,
        NhuCauThue._GiaMax,
        NhuCauThue._ThoiDiemVao,
        NhuCauThue._ThoiHanThue,
        NhuCauThue._KhuVuc,
        NhuCauThue._TrangThai,
        NhuCauThue._MaKH_DaiDien,
        NhuCauThue._NhomThue._MaNhomThue,
        NhuCauThue._LoaiPhong._MaLoai,
      ],
    );
    return result.rows[0].manhucau;
  }

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
      query += ` AND n.khuvuc ILIKE $${paramIndex++}`;
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
        new NhuCauThueBUS(
          row.manhucau,
          row.makh,
          row.tenkhachhang,
          new NhomThueBUS(),
          new LoaiPhongBUS(row.maloai, row.tenloaiphong),
          row.songuoidukien,
          row.hinhthucthue,
          parseFloat(row.giamin), // Convert từ Numeric
          parseFloat(row.giamax),
          row.thoidiemvao,
          row.thoihanthue,
          row.khuvuc,
          row.trangthai,
          [],
        ),
    );
  }

  // Lấy chi tiết 1 nhu cầu thuê theo Mã
  static async LayTTNCT(MaNhuCau: string): Promise<NhuCauThueBUS | null> {
    const query = `
      SELECT n.*, k.hoten AS tenkhachhang, l.tenloai AS tenloaiphong, nt.manhomthue
      FROM NHUCAUTHUE n
      LEFT JOIN KHACHHANG k ON n.makh = k.makh
      LEFT JOIN LOAIPHONG l ON n.maloai = l.maloai
      LEFT JOIN NHOMTHUE nt ON n.manhomthue = nt.manhomthue
      WHERE n.manhucau = $1 
    `;
    const tieuChiQuery = `
      SELECT tc.matieuchi, tc.tentieuchi
      FROM TIEUCHI tc
      INNER JOIN TIEUCHI_NHUCAU tcnc ON tc.matieuchi = tcnc.matieuchi
      WHERE tcnc.manhucau = $1
      ORDER BY tc.matieuchi ASC
    `;

    const [result, tieuChiResult] = await Promise.all([
      pool.query(query, [MaNhuCau]),
      pool.query(tieuChiQuery, [MaNhuCau]),
    ]);

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    const tieuChi = tieuChiResult.rows.map(
      (tc) => new TieuChiBUS(tc.matieuchi, tc.tentieuchi),
    );

    // Trả về object thuần ép kiểu sang BUS
    return new NhuCauThueBUS(
      row.manhucau,
      row.makh,
      row.tenkhachhang,
      new NhomThueBUS(row.manhomthue, []),
      new LoaiPhongBUS(row.maloai, row.tenloaiphong),
      row.songuoidukien,
      row.hinhthucthue,
      parseFloat(row.giamin), // Convert từ Numeric
      parseFloat(row.giamax),
      row.thoidiemvao,
      row.thoihanthue,
      row.khuvuc,
      row.trangthai,
      tieuChi,
    );
  }
}
