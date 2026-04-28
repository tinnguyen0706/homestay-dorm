import TieuChiDAO from "../DAO/TieuChiDAO.ts";

export default class TieuChiBUS {
  MaTieuChi: string;
  TenTieuChi: string;

  constructor(MaTieuChi: string = "", TenTieuChi: string = "") {
    this.MaTieuChi = MaTieuChi;
    this.TenTieuChi = TenTieuChi;
  }

  static async LayDSTC(): Promise<TieuChiBUS[]> {
    return await TieuChiDAO.LayDSTC();
  }
}
