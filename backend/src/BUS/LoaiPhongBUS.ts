import { LoaiPhongDAO } from "../DAO/LoaiPhongDAO.ts";

export class LoaiPhongBUS {
  MaLoai!: string;
  TenLoai!: string;

  constructor(data?: Partial<LoaiPhongBUS>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  static async LayDSLoaiPhong(): Promise<LoaiPhongBUS[]> {
    return await LoaiPhongDAO.LayDSLoaiPhong();
  }
}
