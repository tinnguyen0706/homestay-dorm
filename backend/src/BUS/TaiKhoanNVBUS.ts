import jwt from "jsonwebtoken";
import TaiKhoanNVDAO from "../DAO/TaiKhoanNVDAO.ts";

export default class TaiKhoanNVBUS {
  private Username: string;
  private Password: string;

  constructor(Username: string = "", Password: string = "") {
    this.Username = Username;
    this.Password = Password;
  }

  // Getters
  get _Username(): string {
    return this.Username;
  }

  get _Password(): string {
    return this.Password;
  }

  // Setters
  set _Username(value: string) {
    this.Username = value;
  }

  set _Password(value: string) {
    this.Password = value;
  }

  static async DangNhap(Username: string, Password: string): Promise<{ token: string; username: string } | null> {
    const instance = new TaiKhoanNVBUS(Username, Password);
    const result = await TaiKhoanNVDAO.LayTTTK(instance);
    if (result?.length !== 1) return null;
    const token = jwt.sign(
      { username: result[0]!.username },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "8h" },
    );
    return { token, username: result[0]!.username };
  }
}
