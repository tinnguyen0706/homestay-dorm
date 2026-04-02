# Backend — Node.js + Express + TypeScript

API server xử lý logic nghiệp vụ và tương tác với PostgreSQL Database.

---

## Công nghệ sử dụng

| Thư viện | Phiên bản | Mục đích |
|---|---|---|
| express | ^5.2.1 | HTTP server / routing |
| pg | ^8.20.0 | Kết nối PostgreSQL |
| dotenv | ^17.4.0 | Đọc biến môi trường |
| cors | ^2.8.6 | Cấu hình CORS |
| tsx | ^4.21.0 | Chạy TypeScript trực tiếp (dev) |
| typescript | ^6.0.2 | Static typing |

---

## Cài đặt & Chạy

```bash
# Cài dependencies
npm install

# Tạo file .env từ mẫu
cp .env.example .env
# Sau đó chỉnh sửa .env với thông tin database thực tế

# Khởi tạo database (chạy init.sql)
npm run db:init

# Chạy server ở chế độ development (tự reload khi đổi file)
npm run dev
```

Server mặc định chạy tại: `http://localhost:3000`

---

## Biến môi trường (`.env`)

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/homestay_dorm
```

---

## Kiến trúc thư mục

```
src/
├── app.ts              ← Entry point: khởi tạo Express, mount routes
├── config/
│   └── db.ts           ← Cấu hình kết nối PostgreSQL (Pool)
├── routes/             ← Định nghĩa URL endpoint, map vào Controller
├── controllers/        ← Nhận Request → gọi Service → trả Response
├── services/           ← Xử lý business logic
├── repositories/       ← Truy vấn SQL trực tiếp với database
├── models/             ← Định nghĩa kiểu dữ liệu (TypeScript interfaces)
├── middlewares/        ← Xử lý xác thực, lỗi, logging...
├── types/              ← Type/interface dùng chung toàn project
├── utils/              ← Hàm tiện ích (hash, format, validate...)
└── scripts/
    └── initDB.ts       ← Script khởi tạo database từ file SQL
```

Luồng xử lý request:

```
HTTP Request
    → Routes         (định tuyến)
    → Middlewares    (xác thực, validate)
    → Controllers    (nhận & trả dữ liệu)
    → Services       (logic nghiệp vụ)
    → Repositories   (truy vấn database)
    → PostgreSQL
```

---

## Hướng dẫn từng folder

---

### `src/app.ts` — Entry point

Khởi tạo Express app, mount tất cả routes và middleware toàn cục.

```typescript
// src/app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { roomRoutes } from "./routes/roomRoutes.ts";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/rooms", roomRoutes);

app.listen(port, () => {
    console.log(`Server running: http://localhost:${port}`);
});
```

---

### `src/config/` — Cấu hình kết nối database

Khởi tạo một `Pool` kết nối PostgreSQL dùng chung cho toàn bộ ứng dụng.
Không tạo kết nối mới mỗi lần query — pool tự quản lý.

```typescript
// src/config/db.ts
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});
```

**Cách dùng ở nơi khác:**
```typescript
import { pool } from "../config/db.ts";

const result = await pool.query("SELECT * FROM rooms");
```

---

### `src/routes/` — Định nghĩa URL

Khai báo các endpoint HTTP và map chúng đến đúng hàm controller.
Mỗi tài nguyên (room, user, booking...) có một file route riêng.

```typescript
// src/routes/roomRoutes.ts
import { Router } from "express";
import { getAllRooms, getRoomById, createRoom } from "../controllers/roomController.ts";
import { authenticate } from "../middlewares/authMiddleware.ts";

export const roomRoutes = Router();

roomRoutes.get("/",    getAllRooms);
roomRoutes.get("/:id", getRoomById);
roomRoutes.post("/",   authenticate, createRoom);
```

**Quy tắc đặt tên file:** `<tên tài nguyên>Routes.ts`
Ví dụ: `userRoutes.ts`, `bookingRoutes.ts`, `dormRoutes.ts`

---

### `src/controllers/` — Nhận & trả dữ liệu

Nhận `Request`, gọi `Service` để lấy kết quả, trả `Response`.
Controller **không** chứa logic nghiệp vụ hay SQL — chỉ điều phối.

```typescript
// src/controllers/roomController.ts
import type { Request, Response } from "express";
import { RoomService } from "../services/roomService.ts";

const roomService = new RoomService();

export async function getAllRooms(req: Request, res: Response) {
    const rooms = await roomService.getAll();
    res.json(rooms);
}

export async function getRoomById(req: Request, res: Response) {
    const room = await roomService.getById(Number(req.params.id));
    if (!room) {
        res.status(404).json({ message: "Room not found" });
        return;
    }
    res.json(room);
}

export async function createRoom(req: Request, res: Response) {
    const newRoom = await roomService.create(req.body);
    res.status(201).json(newRoom);
}
```

**Quy tắc đặt tên file:** `<tên tài nguyên>Controller.ts`

---

### `src/services/` — Business Logic

Chứa toàn bộ logic nghiệp vụ: kiểm tra điều kiện, tính toán, kết hợp nhiều repository.
Service **không** biết về `Request`/`Response` và **không** viết SQL trực tiếp.

```typescript
// src/services/roomService.ts
import { RoomRepository } from "../repositories/roomRepository.ts";
import type { Room } from "../models/Room.ts";

export class RoomService {
    private repo = new RoomRepository();

    async getAll(): Promise<Room[]> {
        return this.repo.findAll();
    }

    async getById(id: number): Promise<Room | null> {
        return this.repo.findById(id);
    }

    async create(data: Omit<Room, "id">): Promise<Room> {
        if (!data.name || data.capacity <= 0) {
            throw new Error("Invalid room data");
        }
        return this.repo.create(data);
    }
}
```

**Quy tắc đặt tên file:** `<tên tài nguyên>Service.ts`

---

### `src/repositories/` — Truy vấn Database

Tầng duy nhất được phép viết SQL.
Mỗi method thực hiện một tác vụ cụ thể với database (findAll, findById, create...).

```typescript
// src/repositories/roomRepository.ts
import { pool } from "../config/db.ts";
import type { Room } from "../models/Room.ts";

export class RoomRepository {
    async findAll(): Promise<Room[]> {
        const { rows } = await pool.query<Room>("SELECT * FROM rooms ORDER BY id");
        return rows;
    }

    async findById(id: number): Promise<Room | null> {
        const { rows } = await pool.query<Room>(
            "SELECT * FROM rooms WHERE id = $1",
            [id]
        );
        return rows[0] ?? null;
    }

    async create(data: Omit<Room, "id">): Promise<Room> {
        const { rows } = await pool.query<Room>(
            "INSERT INTO rooms (name, capacity, price) VALUES ($1, $2, $3) RETURNING *",
            [data.name, data.capacity, data.price]
        );
        return rows[0]!;
    }
}
```

**Quy tắc đặt tên file:** `<tên tài nguyên>Repository.ts`

---

### `src/models/` — Định nghĩa kiểu dữ liệu

Khai báo `interface` hoặc `type` đại diện cho từng bảng/thực thể trong database.
Dùng để TypeScript kiểm tra kiểu xuyên suốt các tầng.

```typescript
// src/models/Room.ts
export interface Room {
    id: number;
    name: string;
    capacity: number;
    price: number;
    status: "available" | "occupied" | "maintenance";
    created_at: Date;
}
```

```typescript
// src/models/User.ts
export interface User {
    id: number;
    full_name: string;
    email: string;
    password_hash: string;
    role: "admin" | "student";
    created_at: Date;
}
```

**Quy tắc đặt tên file:** `<TênTàiNguyên>.ts` (PascalCase)

---

### `src/middlewares/` — Middleware

Các hàm chạy **trước** khi request đến controller.
Dùng để xác thực token, phân quyền, validate dữ liệu đầu vào, xử lý lỗi tập trung...

```typescript
// src/middlewares/authMiddleware.ts
import type { Request, Response, NextFunction } from "express";

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    // TODO: verify JWT token
    next();
}
```

```typescript
// src/middlewares/errorMiddleware.ts
import type { Request, Response, NextFunction } from "express";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
}
```

**Đăng ký error middleware ở cuối `app.ts`:**
```typescript
import { errorHandler } from "./middlewares/errorMiddleware.ts";
app.use(errorHandler);
```

---

### `src/types/` — Shared Types

Chứa các TypeScript type/interface dùng chung, **không** gắn với tầng cụ thể nào.
Ví dụ: kiểu request có auth, kiểu phản hồi chuẩn, kiểu pagination...

```typescript
// src/types/express.d.ts — Mở rộng kiểu Request của Express
import type { User } from "../models/User.ts";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
```

```typescript
// src/types/api.ts — Kiểu response chuẩn cho toàn API
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
}
```

---

### `src/utils/` — Hàm tiện ích

Các hàm thuần túy, **không** phụ thuộc framework, dùng được ở bất kỳ tầng nào.

```typescript
// src/utils/hash.ts
import crypto from "crypto";

export function hashPassword(password: string): string {
    return crypto.createHash("sha256").update(password).digest("hex");
}

export function comparePassword(plain: string, hash: string): boolean {
    return hashPassword(plain) === hash;
}
```

```typescript
// src/utils/paginate.ts
export interface PaginationParams {
    page: number;
    limit: number;
    offset: number;
}

export function parsePagination(query: Record<string, unknown>): PaginationParams {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
    return { page, limit, offset: (page - 1) * limit };
}
```

---

### `src/scripts/` — Script tiện ích

Các file chạy một lần, không phải một phần của server.
Dùng để khởi tạo database, seed dữ liệu mẫu, migrate schema...

```typescript
// src/scripts/initDB.ts — Chạy: npm run db:init
import { pool } from "../config/db.ts";
import fs from "fs";
import path from "path";

const sql = fs.readFileSync(
    path.join(process.cwd(), "../database/scripts/init.sql"),
    "utf-8"
);

await pool.query(sql);
console.log("Database initialized successfully");
await pool.end();
```

**Thêm script mới vào `package.json`:**
```json
"scripts": {
    "dev":      "tsx watch src/app.ts",
    "db:init":  "tsx src/scripts/initDB.ts",
    "db:seed":  "tsx src/scripts/seedDB.ts"
}
```
