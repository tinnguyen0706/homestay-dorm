import ChiNhanhDAO from "../DAO/ChiNhanhDAO.ts";
import DichVuDAO from "../DAO/DichVuDAO.ts";
import DichVuBUS from "./DichVuBUS.ts";

export default class ChiNhanhBUS {
  private MaCN: string;
  private TenCN: string;
  private TenChiNhanh: string;
  private DiaChi: string;
  private DichVu: DichVuBUS[];

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

  // Getters
  get _MaCN(): string {
    return this.MaCN;
  }

  get _TenCN(): string {
    return this.TenCN;
  }

  get _TenChiNhanh(): string {
    return this.TenChiNhanh;
  }

  get _DiaChi(): string {
    return this.DiaChi;
  }

  get _DichVu(): DichVuBUS[] {
    return this.DichVu;
  }

  // Setters
  set _MaCN(value: string) {
    this.MaCN = value;
  }

  set _TenCN(value: string) {
    this.TenCN = value;
  }

  set _TenChiNhanh(value: string) {
    this.TenChiNhanh = value;
  }

  set _DiaChi(value: string) {
    this.DiaChi = value;
  }

  set _DichVu(value: DichVuBUS[]) {
    this.DichVu = value;
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
