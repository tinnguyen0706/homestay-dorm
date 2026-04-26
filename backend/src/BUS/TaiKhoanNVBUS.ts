import TaiKhoanNVDAO from "../DAO/TaiKhoanNVDAO.ts";

export default class TaiKhoanNVBUS {
  Username: string;
  Password: string;

  constructor(TaiKhoanNV: { Username: string; Password: string }) {
    this.Username = TaiKhoanNV.Username;
    this.Password = TaiKhoanNV.Password;
  }

  async KTraTK(): Promise<boolean> {
    const result = await TaiKhoanNVDAO.LayTTTK(this);
    return result?.length === 1;
  }
}
