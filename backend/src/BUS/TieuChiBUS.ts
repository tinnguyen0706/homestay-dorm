import TieuChiDAO from "../DAO/TieuChiDAO.ts";

export default class TieuChiBUS {
  private MaTieuChi: string;
  private TenTieuChi: string;

  constructor(MaTieuChi: string = "", TenTieuChi: string = "") {
    this.MaTieuChi = MaTieuChi;
    this.TenTieuChi = TenTieuChi;
  }

  // Getters
  get _MaTieuChi(): string {
    return this.MaTieuChi;
  }

  get _TenTieuChi(): string {
    return this.TenTieuChi;
  }

  // Setters
  set _MaTieuChi(value: string) {
    this.MaTieuChi = value;
  }

  set _TenTieuChi(value: string) {
    this.TenTieuChi = value;
  }

  static async LayDSTC(): Promise<TieuChiBUS[]> {
    return await TieuChiDAO.LayDSTC();
  }
}
