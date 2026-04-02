# 1. Giới thiệu

Project này sử dụng:

* **Frontend:** React + TypeScript + TailwindCSS
* **Backend:** Node.js + TypeScript + Express (MVC)
* **Database:** Oracle
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
│   │   │   └── db.ts        # Kết nối Oracle
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
├── database/
│   ├── scripts/             # File SQL (tạo bảng, insert,...)
│   │   └── init.sql
│   ├── migrations/          # Thay đổi schema (optional)
│   └── seeds/               # Dữ liệu mẫu (optional)
│
├── .env                     # Biến môi trường
└── README.md
```

---

# 3. Database (Oracle)

`database/scripts/init.sql`

Nơi viết:

* CREATE TABLE
* INSERT DATA
* PROCEDURE / FUNCTION

```sql
CREATE TABLE USERS (
    ID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    NAME VARCHAR2(100),
    EMAIL VARCHAR2(100)
);

INSERT INTO USERS (NAME, EMAIL) VALUES ('Tin', 'tin@gmail.com');

-- PROCEDURE: trả về danh sách user
CREATE OR REPLACE PROCEDURE GET_ALL_USERS (
    p_cursor OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN p_cursor FOR
    SELECT * FROM USERS;
END;
/
```

---

# 4. Backend (MVC)

---

## config/

Cấu hình hệ thống (DB, env)

```ts
// db.ts
import oracledb from "oracledb";

export const getConnection = async () => {
  return await oracledb.getConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECTION_STRING,
  });
};
```

---

## models/

👉 Định nghĩa kiểu dữ liệu

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
import oracledb from "oracledb";
import { getConnection } from "../config/db";

export const getAllUsers = async () => {
  const conn = await getConnection();

  const result = await conn.execute(
    `BEGIN GET_ALL_USERS(:cursor); END;`,
    {
      cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
    }
  );

  const rs = (result.outBinds as any).cursor;
  const rows = await rs.getRows(100);

  await rs.close();
  await conn.close();

  return rows;
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

👉 Nhận request → trả response

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

👉 Định nghĩa API

```ts
import { Router } from "express";
import { getUsers } from "../controllers/user.controller";

const router = Router();
router.get("/", getUsers);

export default router;
```

---

## app.ts

👉 Entry server

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
  ID: number;
  NAME: string;
  EMAIL: string;
}
```

---

## pages/

👉 UI chính

```tsx
import { useEffect, useState } from "react";
import { getUsers } from "../services/user.service";

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <div>
      {users.map((u) => (
        <div key={u.ID}>
          {u.NAME} - {u.EMAIL}
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