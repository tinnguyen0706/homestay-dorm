import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import TaiKhoanNVRoute from "./routes/TaiKhoanNV.routes.ts";
import KhachHangRoute from "./routes/KhachHang.route.ts";
import PhongRoute from "./routes/phong.routes.ts";
import NhuCauThueRoute from "./routes/NhuCauThue.route.ts";
import LoaiPhongRoute from "./routes/LoaiPhong.route.ts";
import TieuChiRoute from "./routes/TieuChi.routes.ts";
import { authMiddleware } from "./middlewares/auth.middleware.ts";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Route công khai: chỉ /DangNhap là không cần xác thực
app.use("/TaiKhoanNV", TaiKhoanNVRoute);

// Tất cả route còn lại yêu cầu đăng nhập
app.use(authMiddleware);
app.use("/KhachHang", KhachHangRoute);
app.use("/api/phong", PhongRoute);
app.use("/NhuCauThue", NhuCauThueRoute);
app.use("/LoaiPhong", LoaiPhongRoute);
app.use("/TieuChi", TieuChiRoute);

app.listen(port, () => {
  console.log(`Server running: http://localhost:${port}`);
});
