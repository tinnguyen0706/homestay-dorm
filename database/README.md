# Database - PostgreSQL Scripts

Thư mục này chứa các scripts để thiết lập cấu trúc cơ sở dữ liệu.

## Danh mục file
- `/scripts/init.sql`: Chứa các câu lệnh `CREATE TABLE IF NOT EXISTS`.
- `/seeds`: Các câu lệnh `INSERT` dữ liệu mẫu để test.
- `/migrations`: Các script thay đổi cấu trúc bảng theo thời gian (nếu có).

## Cách hoạt động

Backend tự động đọc và chạy `init.sql` khi server khởi động.
Không cần tạo bảng thủ công trên Neon dashboard.

```
backend/src/app.ts
  └── initDB()                        ← gọi khi server start
       └── backend/src/config/db.ts
            └── đọc database/scripts/init.sql
                 └── chạy SQL trên Neon
```

## Thêm bảng mới

Thêm `CREATE TABLE IF NOT EXISTS ...` vào `scripts/init.sql`, restart server là xong.
