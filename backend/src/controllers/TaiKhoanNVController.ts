import TaiKhoanNVBUS from "../BUS/TaiKhoanNVBUS.ts";
import type { Request, Response } from "express";

export async function DangNhap(req: Request, res: Response) {
  try {
    const { Username, Password } = req.body;
    if (!Username || !Password) {
      return res.status(400).json({ message: "Thiếu tham số!" });
    }
    const result = await TaiKhoanNVBUS.DangNhap(Username, Password);
    if (!result) {
      return res.status(401).json({ message: "Tên đăng nhập hoặc mật khẩu không đúng" });
    }
    res.cookie("token", result.token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 8 * 60 * 60 * 1000,
    });
    return res.json({ username: result.username });
  } catch (error) {
    console.log("-------Lỗi đăng nhập: ", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
}

export async function KiemTraDangNhap(req: Request, res: Response) {
  const user = (req as any).user as { username: string };
  return res.json({ username: user.username });
}

export async function DangXuat(_req: Request, res: Response) {
  res.clearCookie("token", { httpOnly: true, sameSite: "strict" });
  return res.json({ message: "Đăng xuất thành công" });
}
