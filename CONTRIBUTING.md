## Bắt đầu

### Yêu cầu hệ thống

- Node.js: v20.x trở lên (LTS)
- Package Manager: npm v10.x+
- Git

### Cài đặt

```bash
# 1. Clone dự án
git clone https://github.com/YourTeam/project-repo.git
cd project-repo

# 2. Cài đặt dependencies (cả frontend và backend)
cd frontend && npm install
cd ../backend && npm install

# 3. Cấu hình biến môi trường
cp .env.example .env
```

## Quy trình phát triển

### 1. Tạo nhánh mới

Luôn tạo nhánh mới cho mỗi tính năng hoặc sửa lỗi:

```bash
git checkout dev
git pull origin dev
git checkout -b feature/ten-tinh-nang
# hoặc
git checkout -b fix/ten-loi
```

### 2. Thực hiện thay đổi

- Viết code sạch, dễ đọc
- Tuân thủ quy tắc code style (xem bên dưới)
- Cập nhật tài liệu nếu cần

### 3. Commit changes

Sử dụng commit messages rõ ràng và mô tả:

```
feat: add emoji support

- Add emoji_data.h
- Update generate_emoji_header.py
```

## Quy tắc code style

## Quy trình Pull Request

### 1. Chạy test

```bash
# Build C++ code
cd build
cmake .. && make
```

### 2. Rebase với nhánh dev

```bash
git checkout dev
git pull origin dev
git checkout feature/ten-tinh-nang
git rebase dev
```

### 3. Push và tạo PR

```bash
git push origin feature/ten-tinh-nang
```

Tạo Pull Request trên GitHub với:

- Tiêu đề mô tả rõ ràng
- Mô tả chi tiết thay đổi
- Screenshot cho UI changes

## Lưu ý quan trọng về nhánh

### QUAN TRỌNG: TẤT CẢ PR MERGE VÀO NHÁNH DEV

**KHÔNG BAO GIỜ tạo Pull Request vào nhánh `main`**

- Nhánh `main` chỉ chứa bản release ổn định
- Tất cả Pull Request phải nhắm vào nhánh `dev`
- Sau khi pass tất cả các bài CI/CD test và được review, code sẽ được merge vào `dev`
- Khi đủ điều kiện, code sẽ được merge từ `dev` sang `main`

### Cấu trúc nhánh

```
main    ← Bản release ổn định
  ↑
dev     ← Nhánh phát triển chính (tất cả PR merge vào đây)
  ↑
feature/*, fix/*, hotfix/*  ← Nhánh cá nhân cho mỗi PR
```

### Quy trình merge

1. Developer tạo PR vào `dev`
2. Code review bởi maintainer
3. Merge vào `dev`
4. Test trên `dev`
5. Khi ổn định → merge `dev` → `main` (bởi maintainer)

---

Cảm ơn bạn đã đóng góp!
