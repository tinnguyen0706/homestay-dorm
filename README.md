# 1. Giới thiệu

Project quản lý homestay/dorm sử dụng:

- **Frontend:** React 19 + TypeScript + TailwindCSS + Shadcn UI + Vite
- **Backend:** Node.js + TypeScript + Express 5 (kiến trúc BUS/DAO)
- **Database:** PostgreSQL (Neon)
- **Kiến trúc backend:** BUS/DAO (Business Layer / Data Access Object)

---

# 2. Cấu trúc thư mục

```
homestay-dorm/
│
├── frontend/                   # Frontend (React + Vite)
│   └── src/
│       ├── assets/             # Ảnh, font, static resources
│       ├── components/
│       │   └── ui/             # Shadcn UI components (Button, Card, Table,...)
│       ├── hooks/              # Custom React hooks
│       ├── lib/
│       │   └── utils.ts        # Helper chung (cn, classnames,...)
│       ├── pages/              # Màn hình chính (prefix MH_)
│       ├── apiClient.ts        # Cấu hình Axios gọi backend
│       ├── App.tsx             # Root component + React Router
│       └── main.tsx            # Entry point React
│
├── backend/                    # Backend (Node.js + Express)
│   └── src/
│       ├── config/
│       │   └── db.ts           # Kết nối PostgreSQL
│       ├── DAO/                # Truy vấn SQL trực tiếp (Data Access Object)
│       ├── BUS/                # Business logic (Business Unit Service)
│       ├── controllers/        # Nhận request, gọi BUS, trả response
│       ├── routes/             # Định nghĩa API endpoint
│       ├── middlewares/        # Middleware (error handler,...)
│       ├── utils/              # Helper backend
│       ├── scripts/            # Script tiện ích (init DB, seed data, test)
│       └── app.ts              # Entry point server
│
└── database/
    ├── scripts/
    │   ├── init.sql            # Tạo toàn bộ bảng
    │   ├── drop.sql            # Xóa toàn bộ bảng
    │   └── dropRecords.sql     # Xóa dữ liệu (giữ cấu trúc)
    └── seeds/
        └── data.sql            # Dữ liệu mẫu
```

---

# 3. Kiến trúc Backend (BUS/DAO)

Luồng xử lý một request:

```
Client → Route → Controller → BUS → DAO → Database
```

| Layer | Thư mục | Nhiệm vụ |
|---|---|---|
| **Route** | `routes/` | Định nghĩa endpoint, gắn controller |
| **Controller** | `controllers/` | Nhận req/res, gọi BUS |
| **BUS** | `BUS/` | Xử lý business logic, validate dữ liệu |
| **DAO** | `DAO/` | Truy vấn SQL thuần, không chứa logic |

---

# 4. Hướng dẫn từng layer

## DAO/

Làm việc trực tiếp với database. **Chỉ chứa SQL, không chứa business logic.** Mỗi entity là một class với các static method.

Type của tham số được định nghĩa **inline** ngay tại chỗ dùng, không cần file types riêng.

```ts
// DAO/PhongDAO.ts
import pool from "../config/db.ts";

export default class PhongDAO {
  static async getAll(): Promise<Array<{ maPhong: string; tenPhong: string; giaThue: number }>> {
    const result = await pool.query("SELECT * FROM Phong");
    return result.rows;
  }

  static async getById(maPhong: string): Promise<{ maPhong: string; tenPhong: string } | null> {
    const result = await pool.query("SELECT * FROM Phong WHERE maPhong = $1", [maPhong]);
    return result.rows[0] ?? null;
  }

  static async insert(data: {
    tenPhong: string;
    loaiPhong: string;
    giaThue: number;
    trangThai: string;
  }): Promise<{ maPhong: string }> {
    const { tenPhong, loaiPhong, giaThue, trangThai } = data;
    const result = await pool.query(
      "INSERT INTO Phong (tenPhong, loaiPhong, giaThue, trangThai) VALUES ($1,$2,$3,$4) RETURNING *",
      [tenPhong, loaiPhong, giaThue, trangThai]
    );
    return result.rows[0];
  }
}
```

> **Quy tắc:**
> - Dùng `$1, $2,...` cho parameterized query (chống SQL injection).
> - Không validate, không throw lỗi nghiệp vụ ở đây.
> - Đặt tên method: `getAll`, `getById`, `insert`, `update`, `delete`.
> - Type trả về và tham số khai báo inline trong chữ ký hàm.

---

## BUS/

Xử lý nghiệp vụ. Nhận dữ liệu qua constructor, gọi DAO, throw lỗi nếu vi phạm rule.

```ts
// BUS/PhongBUS.ts
import PhongDAO from "../DAO/PhongDAO.ts";

export default class PhongBUS {
  tenPhong: string;
  loaiPhong: string;
  giaThue: number;
  trangThai: string;

  constructor(data: { tenPhong: string; loaiPhong: string; giaThue: number; trangThai: string }) {
    this.tenPhong = data.tenPhong;
    this.loaiPhong = data.loaiPhong;
    this.giaThue = data.giaThue;
    this.trangThai = data.trangThai;
  }

  async TaoPhong(): Promise<{ maPhong: string }> {
    if (!this.tenPhong || !this.giaThue) {
      throw new Error("Thiếu thông tin bắt buộc");
    }
    if (this.giaThue <= 0) {
      throw new Error("Giá thuê phải lớn hơn 0");
    }
    return await PhongDAO.insert(this);
  }

  static async LayDSPhong() {
    return await PhongDAO.getAll();
  }
}
```

> **Quy tắc:**
> - Validate trong method và throw `Error` có message rõ ràng nếu sai.
> - Không gọi `pool.query` trực tiếp, chỉ gọi qua DAO.
> - Dùng `static` cho những thao tác không cần khởi tạo đối tượng (ví dụ: lấy danh sách).

---

## controllers/

Nhận `req`, tạo instance BUS (hoặc gọi static), trả `res`. Không chứa logic nghiệp vụ.

```ts
// controllers/PhongController.ts
import { Request, Response } from "express";
import PhongBUS from "../BUS/PhongBUS.ts";

export const getAllPhong = async (req: Request, res: Response) => {
  try {
    const data = await PhongBUS.LayDSPhong();
    res.json(data);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const createPhong = async (req: Request, res: Response) => {
  try {
    const bus = new PhongBUS(req.body);
    const phong = await bus.TaoPhong();
    res.status(201).json(phong);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
```

> **Quy tắc:**
> - Luôn bọc trong `try/catch`.
> - Lỗi từ BUS → trả `400` kèm `{ message }`.
> - Thành công GET → `200`, POST mới → `201`.

---

## routes/

Khai báo endpoint và gắn controller tương ứng.

```ts
// routes/phong.route.ts
import { Router } from "express";
import * as PhongController from "../controllers/PhongController";

const router = Router();

router.get("/", PhongController.getAllPhong);
router.post("/", PhongController.createPhong);

export default router;
```

Sau đó đăng ký route trong `app.ts`:

```ts
// app.ts
import phongRoutes from "./routes/phong.route";
app.use("/Phong", phongRoutes);
// → GET /Phong    POST /Phong
```

---

## config/db.ts

Kết nối PostgreSQL dùng chung cho toàn bộ DAO.

```ts
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
```

---

## scripts/

Script tiện ích chạy độc lập, không phải API. Dùng để quản lý DB hoặc test nhanh.

```ts
// scripts/initDB.ts  → tạo bảng từ database/scripts/init.sql
// scripts/insertData.ts → insert dữ liệu từ database/seeds/data.sql
// scripts/testDAO.ts → test trực tiếp các hàm DAO
// scripts/testBUS.ts → test trực tiếp các hàm BUS
```

Chạy script:

```bash
npm run db:init       # Khởi tạo DB
npm run db:insert     # Insert dữ liệu mẫu
npm run db:drop       # Xóa toàn bộ bảng
npm run testDAO       # Test DAO layer
npm run testBUS       # Test BUS layer
```

---

# 5. Frontend (React + Vite)

## pages/

Mỗi màn hình là một file, đặt tên theo quy ước `MH_<TênMànHình>.tsx`.

```
MH_DangNhap.tsx       → /              (Màn hình đăng nhập)
MH_DSPhong.tsx        → /DSPhong       (Danh sách phòng)
MH_ChiTietPhong.tsx   → /ChiTietPhong  (Chi tiết phòng)
MH_DSKH.tsx           → /DSKH          (Danh sách khách hàng)
MH_TaoKH.tsx          → /TaoKH         (Tạo khách hàng mới)
```

Ví dụ cấu trúc một page:

```tsx
// pages/MH_DSPhong.tsx
import { useEffect, useState } from "react";
import { apiClient } from "../apiClient";
import { IPhong } from "../types/IPhong"; // nếu có types ở frontend

export default function MH_DSPhong() {
  const [danhSach, setDanhSach] = useState<IPhong[]>([]);

  useEffect(() => {
    apiClient.get("/Phong").then((res) => setDanhSach(res.data));
  }, []);

  return (
    <div>
      {danhSach.map((p) => (
        <div key={p.maPhong}>{p.tenPhong}</div>
      ))}
    </div>
  );
}
```

---

## apiClient.ts

Cấu hình Axios dùng chung cho toàn frontend.

```ts
// apiClient.ts
import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3000",
});
```

Import và dùng trực tiếp:

```ts
import { apiClient } from "../apiClient";

// GET
const res = await apiClient.get("/Phong");

// POST
const res = await apiClient.post("/Phong", { tenPhong: "Phòng A1", ... });
```

---

## components/ui/

Chứa các component từ **Shadcn UI**. Không sửa các file này trực tiếp. Thêm component mới bằng lệnh:

```bash
npx shadcn@latest add <component-name>
# Ví dụ:
npx shadcn@latest add dialog
npx shadcn@latest add select
```

Dùng trong page:

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
```

---

## App.tsx

Khai báo routing toàn app bằng React Router.

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MH_DangNhap from "./pages/MH_DangNhap";
import MH_DSPhong from "./pages/MH_DSPhong";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MH_DangNhap />} />
        <Route path="/DSPhong" element={<MH_DSPhong />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

Thêm route mới: thêm `<Route>` ở đây và tạo file page tương ứng trong `pages/`.

---

# 6. Setup môi trường

## Tạo file .env

Tạo file `.env` ở thư mục `backend/` (không commit lên git):

```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
PORT=3000
```

## Cài đặt và chạy

```bash
# Backend
cd backend
npm install
npm run db:init       # Khởi tạo database (chạy 1 lần)
npm run db:insert     # Insert dữ liệu mẫu (chạy 1 lần)
npm run dev           # Chạy server dev (port 3000)

# Frontend (terminal khác)
cd frontend
npm install
npm run dev           # Chạy Vite dev server (port 5173)
```

---

# 7. Quy ước đặt tên

| Loại | Quy ước | Ví dụ |
|---|---|---|
| File DAO | `<TênEntity>DAO.ts` | `PhongDAO.ts`, `TaiKhoanNVDAO.ts` |
| File BUS | `<TênEntity>BUS.ts` | `PhongBUS.ts`, `TaiKhoanNVBUS.ts` |
| File route | `<tenEntity>.route.ts` | `phong.route.ts` |
| File controller | `<TênEntity>Controller.ts` | `PhongController.ts` |
| File page frontend | `MH_<TênMànHình>.tsx` | `MH_DSPhong.tsx` |
| Method BUS/DAO | PascalCase tiếng Việt viết tắt | `LayDSPhong`, `TaoPhong`, `KTraTK` |
| Biến/thuộc tính | camelCase | `maPhong`, `tenPhong` |
