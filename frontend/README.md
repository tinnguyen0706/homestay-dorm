### 2. Frontend README (`/frontend/README.md`)
*Mục tiêu: Quy ước phát triển giao diện và quản lý state.*

```markdown
# Frontend - React + TypeScript

Thư mục này chứa toàn bộ mã nguồn giao diện của dự án.

## Cấu trúc thư mục chính
- `/components`: Các thành phần UI có thể tái sử dụng (Atomic components).
- `/pages`: Các trang chính của ứng dụng tương ứng với các route.
- `/services`: Chứa các hàm gọi API (sử dụng Axios).
- `/hooks`: Các Custom Hooks để xử lý logic UI.
- `/types`: Định nghĩa Interface/Type của TypeScript cho dữ liệu từ API.

## Quy ước viết code
- **Component:** Đặt tên theo PascalCase (ví dụ: `UserCard.tsx`).
- **Thư mục:** Đặt tên theo kebab-case (ví dụ: `auth-buttons/`).
- **Styling:** Sử dụng Tailwind CSS trực tiếp trong class.

## Lệnh chạy
- `npm run dev`: Chạy môi trường phát triển (Vite).
- `npm run build`: Build dự án để deploy.