import type { INhomThue } from "./INhomThue.ts";

export interface INhuCauThue {
    MaNCT: string,
    TenKHDaiDien: string,
    NhomThue: INhomThue,
    LoaiPhong: string,
    SoNguoiDuKien: Int16Array,
    HinhThucThue: 'Thuê phòng' | 'Thuê giường',
    GiaMin: Int16Array,
    GiaMax: Int16Array,
    ThoiDiemVao: Date,
    ThoiHanThue: Int16Array,
    KhuVuc: string,
    TrangThai: 'Chờ duyệt' | 'Đang tìm' | 'Đã khớp' | 'Đã hủy' | 'Hết hạn',
    TieuChi: string[]
}