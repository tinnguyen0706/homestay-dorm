import { useState } from "react";
import { User, Lock } from "lucide-react";
import { toast } from "sonner";
import apiClient from "@/apiClient";
import { useNavigate } from "react-router";

export const MH_DangNhap = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const btn_DangNhap_click = async () => {
    try {
      const res = await apiClient.get("/TaiKhoanNV/KTraTK", {
        params: { Username: username, Password: password },
      });
      console.log("Kết quả: ", res.data);
      if (res.data == true) {
        toast.success("Đăng nhập thành công!");
        setTimeout(() => {
          navigate("/DSPhong");
        }, 1000);
      }
      else toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.")
    } catch (error) {
      console.log("--------Lỗi ở trang đăng nhập: ", error);
      toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#eef2f7" }}>
      {/* Header */}
      <header className="px-8 py-4">
        <span className="text-lg font-semibold" style={{ color: "#1a6b3c" }}>
          Homestay Dorm
        </span>
      </header>

      {/* Center content */}
      <div className="flex flex-1 items-center justify-center">
        <div
          className="bg-white rounded-2xl shadow-md px-10 py-10 w-full"
          style={{ maxWidth: 420 }}
        >
          {/* Title */}
          <h1
            className="text-2xl font-bold text-center mb-1"
            style={{ color: "#1a6b3c" }}
          >
            Chào mừng trở lại
          </h1>
          <p className="text-center text-sm text-gray-400 mb-8">
            Quản lý chỗ ở của bạn một cách chuyên nghiệp.
          </p>

          {/* Username */}
          <div className="mb-5">
            <label
              className="block text-xs font-semibold text-gray-500 mb-2 tracking-widest uppercase"
            >
              Tên đăng nhập
            </label>
            <div
              className="flex items-center rounded-lg px-3 py-2 gap-2"
              style={{ backgroundColor: "#f0f4f8" }}
            >
              <User size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Nhập tên đăng nhập của bạn"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-8">
            <label
              className="block text-xs font-semibold text-gray-500 mb-2 tracking-widest uppercase"
            >
              Mật khẩu
            </label>
            <div
              className="flex items-center rounded-lg px-3 py-2 gap-2"
              style={{ backgroundColor: "#f0f4f8" }}
            >
              <Lock size={16} className="text-gray-400 shrink-0" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
              />
            </div>
          </div>

          {/* Button */}
          <button
            onClick={() => btn_DangNhap_click()}
            className="w-full py-3 rounded-lg text-white font-semibold text-sm transition-opacity hover:opacity-90 active:opacity-75"
            style={{ backgroundColor: "#1a6b3c" }}
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};
