# Hướng dẫn code trang Đăng nhập

Tài liệu này hướng dẫn cách xây dựng trang đăng nhập hoàn chỉnh cho dự án Homestay Dorm, bao gồm giao diện React và gọi API `KTraTK` từ backend.

---

## Tổng quan luồng dữ liệu

```
LoginPage (GUI)
  └─ nhập Username + Password
       └─ gọi GET /TaiKhoanNV/KTraTK?Username=...&Password=...
            └─ TaiKhoanNVController.KTraTK (backend)
                 └─ TaiKhoanNVBUS.KTraTK
                      └─ trả về kết quả đăng nhập
```

---

## Bước 1 — Tạo service gọi API

Tạo file `GUI/src/services/taiKhoanNV.service.ts`:

```ts
// Gọi API kiểm tra tài khoản nhân viên
export async function KTraTK(username: string, password: string) {
  const params = new URLSearchParams({ Username: username, Password: password });
  const res = await fetch(`http://localhost:3000/TaiKhoanNV/KTraTK?${params}`);

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message ?? "Đăng nhập thất bại");
  }

  return res.json();
}
```

**Lưu ý:**
- Backend chạy ở `http://localhost:3000` (xem `backend/src/app.ts`).
- API nhận `Username` và `Password` qua **query string** (GET), không phải body.
- Nếu server trả status không phải 2xx, ném lỗi để component xử lý.

---

## Bước 2 — Viết trang LoginPage

Thay toàn bộ nội dung `GUI/src/pages/LoginPage.tsx`:

```tsx
import { useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { KTraTK } from "@/services/taiKhoanNV.service"

export const LoginPage = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username.trim() || !password.trim()) {
      toast.error("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu")
      return
    }

    setLoading(true)
    try {
      const result = await KTraTK(username, password)
      toast.success("Đăng nhập thành công!")
      // TODO: lưu thông tin session / token từ result nếu cần
      navigate("/dashboard")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Đăng nhập thất bại")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-md p-10 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-green-800 mb-1">
          Chào mừng trở lại
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Quản lý chỗ ở của bạn một cách chuyên nghiệp.
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase text-gray-600">
              Tên đăng nhập
            </label>
            <Input
              placeholder="Nhập tên đăng nhập của bạn..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase text-gray-600">
              Mật khẩu
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 text-white mt-2"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </form>
      </div>
    </div>
  )
}
```

---

## Bước 3 — Giải thích từng phần

### State

| Biến | Mục đích |
|------|----------|
| `username` | Lưu giá trị input tên đăng nhập |
| `password` | Lưu giá trị input mật khẩu |
| `loading` | Disable nút và hiện text "Đang đăng nhập..." khi đang chờ API |

### `handleLogin`

1. Gọi `e.preventDefault()` để trang không reload khi submit form.
2. Kiểm tra input rỗng trước khi gọi API — tránh request thừa.
3. Gọi `KTraTK(username, password)` từ service.
4. Thành công → `toast.success` + điều hướng tới `/dashboard`.
5. Thất bại → `toast.error` hiện thông báo lỗi từ server.
6. `finally` → luôn tắt trạng thái loading dù thành công hay thất bại.

### Component UI

- `<form onSubmit={handleLogin}>` — cho phép nhấn **Enter** để submit.
- `<Input type="password">` — ẩn ký tự mật khẩu, kích hoạt password manager trên trình duyệt.
- `disabled={loading}` trên Button — ngăn người dùng click nhiều lần khi đang chờ.

---

## Bước 4 — Xử lý CORS (nếu cần)

Nếu trình duyệt báo lỗi CORS khi gọi API, thêm middleware vào `backend/src/app.ts`:

```ts
import cors from "cors"

app.use(cors({ origin: "http://localhost:5173" })) // port mặc định của Vite
```

Cài package:

```bash
cd backend
npm install cors
npm install -D @types/cors
```

---

## Bước 5 — Chạy thử

```bash
# Terminal 1 — chạy backend
cd backend
npm run dev

# Terminal 2 — chạy frontend
cd GUI
npm run dev
```

Mở trình duyệt tại `http://localhost:5173`, nhập tài khoản hợp lệ và bấm **Đăng nhập**.

---

## Cấu trúc file liên quan

```
GUI/
  src/
    pages/
      LoginPage.tsx          ← component trang đăng nhập
    services/
      taiKhoanNV.service.ts  ← hàm gọi API KTraTK
    App.tsx                  ← định nghĩa route "/"

backend/
  src/
    app.ts                   ← đăng ký route /TaiKhoanNV
    routes/
      TaiKhoanNV.routes.ts   ← GET /KTraTK → controller
    controllers/
      TaiKhoanNVController.ts
    BUS/
      TaiKhoanNVBUS.ts
```
