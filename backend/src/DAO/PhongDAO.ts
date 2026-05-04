import pool from "../config/db.ts";
import { PhongBUS } from "../BUS/PhongBUS.js";
import ChiNhanhBUS from "../BUS/ChiNhanhBUS.ts";

export class PhongDAO {
  static async LayDSGioiTinh(): Promise<string[]> {
    const result = await pool.query(`
      SELECT DISTINCT gioitinhchophep
      FROM Phong
      WHERE gioitinhchophep IS NOT NULL AND gioitinhchophep <> ''
      ORDER BY gioitinhchophep ASC
    `);
    return result.rows.map((row) => row.gioitinhchophep);
  }

  static async LayDSTrangThai(): Promise<string[]> {
    const result = await pool.query(`
      SELECT DISTINCT trangthai
      FROM Phong
      WHERE trangthai IS NOT NULL AND trangthai <> ''
      ORDER BY trangthai ASC
    `);
    return result.rows.map((row) => row.trangthai);
  }

  static async LayDSPhong(filters: any): Promise<PhongBUS[]> {
    let query = `
      SELECT p.*, l.tenloai AS loai_phong_ten, cn.tenchinhanh
      FROM Phong p
      LEFT JOIN LoaiPhong l ON p.maloai = l.maloai
      LEFT JOIN ChiNhanh cn ON p.machinhanh = cn.machinhanh
      WHERE 1=1
    `;
    const values: any[] = [];
    let paramIndex = 1;

    if (filters.ChiNhanh) {
      query += ` AND p.machinhanh = $${paramIndex++}`;
      values.push(filters.ChiNhanh);
    }
    if (filters.LoaiPhong) {
      query += ` AND l.tenloai = $${paramIndex++}`;
      values.push(filters.LoaiPhong);
    }
    if (filters.SucChua) {
      query += ` AND p.succhuatoida >= $${paramIndex++}`;
      values.push(filters.SucChua);
    }
    if (filters.GioiTinh) {
      query += ` AND p.gioitinhchophep = $${paramIndex++}`;
      values.push(filters.GioiTinh);
    }
    if (filters.TrangThai) {
      query += ` AND p.trangthai = $${paramIndex++}`;
      values.push(filters.TrangThai);
    }

    const result = await pool.query(query, values);
    return result.rows.map((row) => ({
      MaPhong: row.maphong,
      TenPhong: row.tenphong,
      LoaiPhong: row.loai_phong_ten || row.maloai,
      SucChuaToiDa: row.succhuatoida,
      GioiTinhChoPhep: row.gioitinhchophep,
      TrangThai: row.trangthai,
      ChiNhanh: new ChiNhanhBUS(
        row.machinhanh,
        row.tenchinhanh ?? row.machinhanh,
        row.tenchinhanh ?? row.machinhanh,
        "",
      ),
    }));
  }

  static async LayTTPhong(maPhong: string): Promise<PhongBUS | null> {
    const result = await pool.query(
      `
      SELECT p.*, l.tenloai AS loai_phong_ten
      FROM Phong p
      LEFT JOIN LoaiPhong l ON p.maloai = l.maloai
      WHERE p.maphong = $1
    `,
      [maPhong],
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    const [taiSanResult, tieuChiResult] = await Promise.all([
      pool.query(
        `
        SELECT mataisan, tentaisan
        FROM TaiSan
        WHERE maphong = $1 AND loai = 'T�i s?n kh�c'
        ORDER BY mataisan ASC
      `,
        [maPhong],
      ),
      pool.query(
        `
        SELECT tc.matieuchi, tc.tentieuchi
        FROM TieuChi tc
        JOIN Phong_TieuChi ptc ON tc.matieuchi = ptc.matieuchi
        WHERE ptc.maphong = $1
        ORDER BY tc.matieuchi ASC
      `,
        [maPhong],
      ),
    ]);

    const taiSan = taiSanResult.rows.map((row) => ({
      MaTaiSan: row.mataisan,
      TenTaiSan: row.tentaisan,
    }));

    const tieuChi = tieuChiResult.rows.map((row) => ({
      MaTieuChi: row.matieuchi,
      TenTieuChi: row.tentieuchi,
    }));

    return {
      MaPhong: row.maphong,
      TenPhong: row.tenphong,
      LoaiPhong: row.loai_phong_ten || row.maloai,
      SucChuaToiDa: row.succhuatoida,
      GioiTinhChoPhep: row.gioitinhchophep,
      TrangThai: row.trangthai,
      ChiNhanh: new ChiNhanhBUS(row.machinhanh, row.machinhanh, row.machinhanh, ""),
      TaiSan: taiSan,
      TieuChi: tieuChi,
    };
  }
}
