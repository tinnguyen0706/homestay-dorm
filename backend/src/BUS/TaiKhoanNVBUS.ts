import type { ITaiKhoanNV } from "../types/ITaiKhoanNV.ts";
import TaiKhoanNVDAO from "../DAO/TaiKhoanNVDAO.ts";

export default class TaiKhoanNVBUS {
  static async KTraTK(TaiKhoanNV: ITaiKhoanNV): Promise<boolean> {
    let result = await TaiKhoanNVDAO.LayTTTK(TaiKhoanNV);
    if (result?.length === 1) return true;
    return false;
  }
}
