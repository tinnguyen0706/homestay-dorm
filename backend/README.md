# Backend - Node.js + Express + TypeScript

Hệ thống API xử lý logic nghiệp vụ và tương tác với Oracle Database.

## ⚙️ Kiến trúc (Layered Architecture)
Dự án tuân thủ mô hình 3 lớp:
1. **Controller:** Tiếp nhận Request và phản hồi Response.
2. **Service:** Xử lý Business Logic chính.
3. **Repository:** Thực thi các câu lệnh SQL trực tiếp với Oracle.

## 🗄 Kết nối Database
Để chạy được backend, bạn cần cài đặt **Oracle Instant Client** (nếu dùng thư viện `node-oracledb` chế độ Thick).
Cấu hình trong `.env`:
- `DB_USER`: Tên đăng nhập Oracle.
- `DB_PASSWORD`: Mật khẩu.
- `DB_CONNECTION_STRING`: Ví dụ `localhost:1521/xe`.

## 🛠 Lệnh chạy
- `npm run dev`: Chạy server với nodemon.
- `npm run build`: Compile TypeScript sang JavaScript trong thư mục `/dist`.