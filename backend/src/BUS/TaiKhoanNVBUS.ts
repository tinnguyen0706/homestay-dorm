import TaiKhoanNVDAO from "../DAO/TaiKhoanNVDAO.ts";

export default class TaiKhoanNVBUS {
  private _Username: string;
  private _Password: string;

  constructor(Username: string = "", Password: string = "") {
    this._Username = Username;
    this._Password = Password;
  }

  get Username(): string {
    return this._Username;
  }

  set Username(value: string) {
    this._Username = value;
  }

  get Password(): string {
    return this._Password;
  }

  set Password(value: string) {
    this._Password = value;
  }

  async KTraTK(): Promise<boolean> {
    const result = await TaiKhoanNVDAO.LayTTTK(this);
    return result?.length === 1;
  }
}
