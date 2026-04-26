import type { IChiNhanh } from "./IChiNhanh.ts";
import type { IGiuong } from "./IGiuong.ts";

export interface IPhong {
    MaPhong: string,
    TenPhong: string,
    SucChuaToiDa: Int16Array,
    GioiTinhChoPhep: 'Nam' | 'Nữ' | 'Cả hai',
    LoaiPhong: string,
    TrangThai: 'Còn trống' | 'Đã đầy',
    ChiNhanh: IChiNhanh,
    Giuong: IGiuong[],
    TaiSan: string[],
    TieuChi: string[]
}