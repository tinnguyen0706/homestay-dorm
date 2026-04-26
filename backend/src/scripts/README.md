# Đây là nơi tạo script thay đổi database trên Neon

## Các bước để thao tác trên database

1. Tạo `file.sql` cần chạy trong folder `database/scripts` hoặc `database/seeds`<br>

```sql
--database/scripts/dropRecords.sql

-- =============================================================================
-- Xóa toàn bộ dữ liệu mẫu và reset sequences
-- Encoding: UTF-8
-- =============================================================================
SET client_encoding TO 'UTF8';

-- Phá vòng circular FK (KHACHHANG ↔ NHOMTHUE) trước khi TRUNCATE
UPDATE KHACHHANG SET MaNhomThue = NULL;

-- Xóa dữ liệu theo thứ tự từ lá → gốc, CASCADE xử lý phần còn lại
TRUNCATE TABLE
    TIEUCHI_NHUCAU,
    PHONG_TIEUCHI,
    GIUONG,
    TAISAN,
    LICHXEMPHONG,
    NHUCAUTHUE,
    TAIKHOAN_NV,
    CHINHANH_DICHVU,
    NHOMTHUE,
    PHONG,
    KHACHHANG,
    NHANVIEN,
    TIEUCHI,
    DICHVU,
    CHINHANH,
    LOAIPHONG
CASCADE;

-- Reset tất cả sequences về 1
ALTER SEQUENCE seq_loaiphong    RESTART WITH 1;
ALTER SEQUENCE seq_chinhanh     RESTART WITH 1;
ALTER SEQUENCE seq_dichvu       RESTART WITH 1;
ALTER SEQUENCE seq_tieuchi      RESTART WITH 1;
ALTER SEQUENCE seq_nhanvien     RESTART WITH 1;
ALTER SEQUENCE seq_khachhang    RESTART WITH 1;
ALTER SEQUENCE seq_nhomthue     RESTART WITH 1;
ALTER SEQUENCE seq_phong        RESTART WITH 1;
ALTER SEQUENCE seq_taikhoan_nv  RESTART WITH 1;
ALTER SEQUENCE seq_nhucauthue   RESTART WITH 1;
ALTER SEQUENCE seq_lichxemphong RESTART WITH 1;
ALTER SEQUENCE seq_taisan       RESTART WITH 1;
```

2. Tạo `file.ts` thao tác với `file.sql` đã tạo sẵn trước đó trong folder `database/scripts` hoặc `database/seeds`<br>

```typescript
// src/scripts/dropRecords.ts
import pool from "../config/db.ts";
import path from "node:path";
import fs from "fs";
import { cwd } from "node:process";

const sql = fs.readFileSync(
  path.join(cwd(), "../database/scripts/dropRecords.sql"),
  "utf-8",
);

await pool.query(sql);
console.log("---------Drop Records successfully------------");
await pool.end();
```

3. Tạo câu lệnh cmd trong file `backend/package.json`

```json
"scripts": {
    "db:dropRecords": "tsx src/scripts/dropRecords.ts"
  }
```

4. Chạy cmd để execute query lên NEON database

```cmd
npm run db:dropRecords
```
