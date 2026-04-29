import jwt from "jsonwebtoken";
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

  static async DangNhap(Username: string, Password: string): Promise<{ token: string; username: string } | null> {
    const instance = new TaiKhoanNVBUS(Username, Password);
    const result = await TaiKhoanNVDAO.LayTTTK(instance);
    if (result?.length !== 1) return null;
    const token = jwt.sign(
      { username: result[0]!.Username },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "8h" },
    );
    return { token, username: result[0]!.Username };
  }
}
