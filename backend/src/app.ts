import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import TaiKhoanNVRoute from "./routes/TaiKhoanNV.routes.ts";
import KhachHangRoute from "./routes/KhachHang.route.ts";
import PhongRoute from "./routes/phong.routes.ts";
import NhuCauThueRoute from "./routes/NhuCauThue.routes.ts";
import LoaiPhongRoute from "./routes/LoaiPhong.routes.ts";
import TieuChiRoute from "./routes/TieuChi.routes.ts";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5173"] }));
app.use(cors())
app.use(express.json());
app.use("/TaiKhoanNV", TaiKhoanNVRoute);
app.use("/KhachHang", KhachHangRoute);
app.use("/api/phong", PhongRoute);
app.use("/NhuCauThue", NhuCauThueRoute);
app.use("/LoaiPhong", LoaiPhongRoute);
app.use("/TieuChi", TieuChiRoute);

app.listen(port, () => {
  console.log(`Server running: http://localhost:${port}`);
});
