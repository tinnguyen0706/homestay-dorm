# Database - Oracle SQL Scripts

Thư mục này chứa các scripts để thiết lập cấu trúc cơ sở dữ liệu.

## Danh mục file
- `/scripts/init.sql`: Chứa các câu lệnh `CREATE TABLE`, `SEQUENCE`, `TRIGGER`.
- `/seeds`: Các câu lệnh `INSERT` dữ liệu mẫu để test.
- `/migrations`: Các script thay đổi cấu trúc bảng theo thời gian (nếu có).

## Hướng dẫn thiết lập
1. Đăng nhập vào SQL Plus hoặc Oracle SQL Developer.
2. Chạy file `init.sql` trước để tạo bảng.
3. Chạy các file trong `/seeds` để có dữ liệu ban đầu.
