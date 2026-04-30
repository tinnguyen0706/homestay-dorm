import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = (req as any).cookies?.token;
  if (!token) {
    return res.status(401).json({ message: "Chưa đăng nhập" });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as { username: string };
    (req as any).user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
}
