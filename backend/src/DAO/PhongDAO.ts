import pool from "../config/db.js";

import { PhongBUS } from "../BUS/PhongBUS.js";

export class PhongDAO {
  static async LayFilterOptions() {
    const [chiNhanhResult, loaiPhongResult, gioiTinhResult, trangThaiResult] = await Promise.all([
      pool.query(`
        SELECT machinhanh, tenchinhanh
        FROM ChiNhanh
        ORDER BY machinhanh ASC
      `),
      pool.query(`
        SELECT maloai, tenloai
        FROM LoaiPhong
        ORDER BY tenloai ASC
      `),
      pool.query(`
        SELECT DISTINCT gioitinhchophep
        FROM Phong
        WHERE gioitinhchophep IS NOT NULL AND gioitinhchophep <> ''
        ORDER BY gioitinhchophep ASC
      `),
      pool.query(`
        SELECT DISTINCT trangthai
        FROM Phong
        WHERE trangthai IS NOT NULL AND trangthai <> ''
        ORDER BY trangthai ASC
      `)
    ]);

    return {
      ChiNhanh: chiNhanhResult.rows.map((row) => ({
        MaCN: row.machinhanh,
        TenCN: row.tenchinhanh ?? row.machinhanh
      })),
      LoaiPhong: loaiPhongResult.rows.map((row) => ({
        MaLoai: row.maloai,
        TenLoai: row.tenloai ?? row.maloai
      })),
      GioiTinh: gioiTinhResult.rows.map((row) => row.gioitinhchophep),
      TrangThai: trangThaiResult.rows.map((row) => row.trangthai)
    };
  }

  static async LayDSPhong(filters: any): Promise<PhongBUS[]> {
    let query = `
      SELECT p.*, l.tenloai as loai_phong_ten, cn.tenchinhanh
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
    return result.rows.map(row => ({
      MaPhong: row.maphong,
      TenPhong: row.tenphong,
      LoaiPhong: row.loai_phong_ten || row.maloai,
      SucChuaToiDa: row.succhuatoida,
      GioiTinhChoPhep: row.gioitinhchophep,
      TrangThai: row.trangthai,
      MaCN: row.machinhanh,
      TenChiNhanh: row.tenchinhanh
    }));
  }

  static async LayTTPhong(maPhong: string): Promise<PhongBUS | null> {
    const query = `
      SELECT p.*, l.tenloai as loai_phong_ten, cn.tenchinhanh, cn.diachi
      FROM Phong p
      LEFT JOIN ChiNhanh cn ON p.machinhanh = cn.machinhanh
      LEFT JOIN LoaiPhong l ON p.maloai = l.maloai
      WHERE p.maphong = $1
    `;
    const result = await pool.query(query, [maPhong]);
    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    const phong: PhongBUS = {
      MaPhong: row.maphong,
      TenPhong: row.tenphong,
      LoaiPhong: row.loai_phong_ten || row.maloai,
      SucChuaToiDa: row.succhuatoida,
      GioiTinhChoPhep: row.gioitinhchophep,
      TrangThai: row.trangthai,
      MaCN: row.machinhanh,
      TenChiNhanh: row.tenchinhanh,
      DiaChi: row.diachi
    };

    // Lấy thông tin giường
    const giuongQuery = `
      SELECT g.mataisan, g.trangthai 
      FROM Giuong g
      JOIN TaiSan ts ON g.mataisan = ts.mataisan
      WHERE ts.maphong = $1
      ORDER BY g.mataisan ASC
    `;
    const giuongResult = await pool.query(giuongQuery, [maPhong]);
    phong.Giuong = giuongResult.rows.map(g => ({
      MaTaiSan: g.mataisan,
      TrangThai: g.trangthai
    }));

    // Lấy thông tin tài sản khác (không phải giường)
    const taisanQuery = `
      SELECT mataisan, tentaisan 
      FROM TaiSan 
      WHERE maphong = $1 AND loai = 'Tài sản khác'
    `;
    const taisanResult = await pool.query(taisanQuery, [maPhong]);
    phong.TaiSan = taisanResult.rows.map(ts => ({
      MaTaiSan: ts.mataisan,
      TenTaiSan: ts.tentaisan
    }));

    // Lấy thông tin tiêu chí phòng
    const tieuchiQuery = `
      SELECT tc.matieuchi, tc.tentieuchi 
      FROM TieuChi tc
      JOIN Phong_TieuChi ptc ON tc.matieuchi = ptc.matieuchi
      WHERE ptc.maphong = $1
    `;
    const tieuchiResult = await pool.query(tieuchiQuery, [maPhong]);
    phong.TieuChi = tieuchiResult.rows.map(tc => ({
      MaTieuChi: tc.matieuchi,
      TenTieuChi: tc.tentieuchi
    }));

    // Lấy thông tin dịch vụ tại chi nhánh
    const dichvuQuery = `
      SELECT dv.madv, dv.tendv 
      FROM DichVu dv
      JOIN ChiNhanh_DichVu cndv ON dv.madv = cndv.madv
      WHERE cndv.machinhanh = $1
    `;
    const dichvuResult = await pool.query(dichvuQuery, [row.machinhanh]);
    phong.DichVu = dichvuResult.rows.map(dv => ({
      MaDV: dv.madv,
      TenDV: dv.tendv
    }));

    return phong;
  }
}
