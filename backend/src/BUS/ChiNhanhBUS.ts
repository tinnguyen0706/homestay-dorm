import ChiNhanhDAO from "../DAO/ChiNhanhDAO.ts";
import DichVuDAO from "../DAO/DichVuDAO.ts";
import DichVuBUS from "./DichVuBUS.ts";

export default class ChiNhanhBUS {
  MaCN: string;
  TenCN: string;
  TenChiNhanh: string;
  DiaChi: string;
  DichVu: DichVuBUS[];

  constructor(
    MaCN: string = "",
    TenCN: string = "",
    TenChiNhanh: string = "",
    DiaChi: string = "",
    DichVu: DichVuBUS[] = [],
  ) {
    this.MaCN = MaCN;
    this.TenCN = TenCN;
    this.TenChiNhanh = TenChiNhanh;
    this.DiaChi = DiaChi;
    this.DichVu = DichVu;
  }

  static async LayDSChiNhanh(): Promise<ChiNhanhBUS[]> {
    return ChiNhanhDAO.LayDSChiNhanh();
  }

  static async LayThongTinChiNhanh(maCN: string): Promise<ChiNhanhBUS | null> {
    return ChiNhanhDAO.LayThongTinChiNhanh(maCN);
  }

  static async LayDSDichVuTaiChiNhanh(maChiNhanh: string) {
    return DichVuDAO.LayDSDV_ChiNhanh(maChiNhanh);
  }
}
