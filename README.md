# 1. Giới thiệu

Project này sử dụng:

* **Frontend:** React + TypeScript + TailwindCSS
* **Backend:** Node.js + TypeScript + Express (MVC)
* **Database:** PostgreSQL (Neon)
* **Kiến trúc:** MVC (áp dụng cho backend)

---

# 2. Cấu trúc thư mục

```
project-root/
│
├── frontend/                # Frontend (React)
│   ├── public/              # File tĩnh (favicon, index.html)
│   ├── src/
│   │   ├── assets/          # Ảnh, font, static resources
│   │   ├── components/      # Component tái sử dụng (Button, Card,...)
│   │   ├── pages/           # Page chính (Home, Login,...)
│   │   ├── layouts/         # Layout chung (Navbar, Sidebar,...)
│   │   ├── services/        # Gọi API backend (axios config)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Helper functions
│   │   ├── types/           # TypeScript types/interfaces
│   │   ├── App.tsx          # Root component
│   │   └── main.tsx         # Entry point React
│   ├── tailwind.config.js   # Cấu hình Tailwind
│   └── package.json         # Dependencies frontend
│
├── backend/                 # Backend (Node.js + TS)
│   ├── src/
│   │   ├── config/          # Cấu hình (DB, env,...)
│   │   │   └── db.ts        # Kết nối PostgreSQL (Neon)
│   │   │
│   │   ├── models/          # Định nghĩa dữ liệu (type/interface)
│   │   │   └── user.model.ts
│   │   │
│   │   ├── repositories/    # Làm việc trực tiếp với DB (SQL)
│   │   │   └── user.repo.ts
│   │   │
│   │   ├── services/        # Business logic
│   │   │   └── user.service.ts
│   │   │
│   │   ├── controllers/     # Xử lý request/response
│   │   │   └── user.controller.ts
│   │   │
│   │   ├── routes/          # Định nghĩa API endpoint
│   │   │   └── user.route.ts
│   │   │
│   │   ├── middlewares/     # Middleware (auth, error,...)
│   │   ├── utils/           # Helper backend
│   │   ├── types/           # TypeScript types
│   │   │
│   │   └── app.ts           # Entry server
│   │
│   ├── dist/                # Build output
│   ├── package.json         # Dependencies backend
│   └── tsconfig.json        # Config TypeScript
│
├── .env                     # Biến môi trường (DATABASE_URL,...)
└── README.md
```

---

# 3. Database (PostgreSQL + Neon)

## Setup Neon

1. Tạo tài khoản tại [neon.tech](https://neon.tech) (free)
2. Tạo project mới
3. Vào **Dashboard → Connection Details** → copy **Connection string**

## Tạo file .env

Tạo file `.env` ở root project, **không commit file này lên git**:

```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
```

Thêm vào `.gitignore`:

```
.env
```

## Cài đặt thư viện

```bash
cd backend
npm install pg dotenv
npm install -D @types/pg
```

## Tạo bảng

Chạy SQL sau trên Neon dashboard (tab **SQL Editor**):

```sql
CREATE TABLE users (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

INSERT INTO users (name, email) VALUES ('Tin', 'tin@gmail.com');
```

---

# 4. Backend (MVC)

---

## config/

Cấu hình kết nối database

```ts
// db.ts
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
```

---

## models/

Định nghĩa kiểu dữ liệu

```ts
export interface User {
  id: number;
  name: string;
  email: string;
}
```

---

## repositories/

Nơi DUY NHẤT làm việc với DB

```ts
import { pool } from "../config/db";

export const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};
```

---

## services/

Business logic (xử lý dữ liệu)

```ts
import { getAllUsers } from "../repositories/user.repo";

export const fetchUsers = async () => {
  return await getAllUsers();
};
```

---

## controllers/

Nhận request → trả response

```ts
import { Request, Response } from "express";
import { fetchUsers } from "../services/user.service";

export const getUsers = async (req: Request, res: Response) => {
  const users = await fetchUsers();
  res.json(users);
};
```

---

## routes/

Định nghĩa API

```ts
import { Router } from "express";
import { getUsers } from "../controllers/user.controller";

const router = Router();
router.get("/", getUsers);

export default router;
```

---

## app.ts

Entry server

```ts
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(3000, () => {
  console.log("Server running...");
});
```

---

# 5. Frontend (React)

---

## services/

Gọi API

```ts
// api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});
```

```ts
// user.service.ts
import { api } from "./api";

export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};
```

---

## types/

Kiểu dữ liệu từ backend

```ts
export interface User {
  id: number;
  name: string;
  email: string;
}
```

---

## pages/

UI chính

```tsx
import { useEffect, useState } from "react";
import { getUsers } from "../services/user.service";
import { User } from "../types";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <div>
      {users.map((u) => (
        <div key={u.id}>
          {u.name} - {u.email}
        </div>
      ))}
    </div>
  );
}
```

---

## App.tsx

```tsx
import Home from "./pages/Home";

export default function App() {
  return <Home />;
}
```
