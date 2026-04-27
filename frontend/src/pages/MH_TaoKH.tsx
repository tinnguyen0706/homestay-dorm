// frontend/src/pages/MH_TaoKH.tsx
import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import apiClient from "@/apiClient";
import { toast } from "sonner"; 

export const MH_TaoKH = () => {
  const [formData, setFormData] = useState({
    HoTen: "",
    GioiTinh: "Nam",
    QuocTich: "Việt Nam",
    Email: "",
    SDT: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await apiClient.post("/KhachHang/TaoKH", formData);
      alert(`Tạo thành công khách hàng mã: ${res.data.MaKH}`);
      // Reset form
      setFormData({ HoTen: "", GioiTinh: "Nam", QuocTich: "Việt Nam", Email: "", SDT: "" });
    } catch (error: any) {
      alert(error.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F9F9FF] p-10 font-inter">
      <div className="max-w-[896px] mx-auto">
        {/* Title */}
        <h1 className="text-[#064E3B] text-[30px] font-extrabold font-manrope mb-10">
          Tạo khách hàng mới
        </h1>

        {/* Card Form */}
        <div className="relative bg-white rounded-[16px] shadow-[0px_4px_40px_-15px_rgba(13,99,27,0.08)] p-10 overflow-hidden">
          <div className="grid grid-cols-2 gap-x-10 gap-y-6">
            {/* Họ và tên - Full width */}
            <div className="col-span-2 flex flex-col gap-2">
              <label className="text-[rgba(6,78,59,0.80)] text-sm font-semibold">Họ và tên</label>
              <input
                type="text"
                placeholder="Nguyễn Văn A"
                className="w-full bg-[#F1F3FC] rounded-[16px] px-5 py-4 outline-none text-[#181C22] placeholder:text-[#94A3B8]"
                value={formData.HoTen}
                onChange={(e) => setFormData({ ...formData, HoTen: e.target.value })}
              />
            </div>

            {/* Giới tính */}
            <div className="flex flex-col gap-2">
              <label className="text-[rgba(6,78,59,0.80)] text-sm font-semibold">Giới tính</label>
              <div className="flex bg-[#F1F3FC] p-1 rounded-[16px] gap-2">
                <button
                  onClick={() => setFormData({ ...formData, GioiTinh: "Nam" })}
                  className={`flex-1 py-3 rounded-[6px] text-sm font-medium transition-all ${
                    formData.GioiTinh === "Nam" 
                    ? "bg-white text-[#064E3B] shadow-sm" 
                    : "text-[#64748B]"
                  }`}
                >
                  Nam
                </button>
                <button
                  onClick={() => setFormData({ ...formData, GioiTinh: "Nữ" })}
                  className={`flex-1 py-3 rounded-[6px] text-sm font-medium transition-all ${
                    formData.GioiTinh === "Nữ" 
                    ? "bg-white text-[#064E3B] shadow-sm" 
                    : "text-[#64748B]"
                  }`}
                >
                  Nữ
                </button>
              </div>
            </div>

            {/* Quốc tịch */}
            <div className="flex flex-col gap-2">
              <label className="text-[rgba(6,78,59,0.80)] text-sm font-semibold">Quốc tịch</label>
              <div className="relative">
                <select
                  className="w-full bg-[#F1F3FC] rounded-[16px] px-5 py-4 outline-none text-[#181C22] appearance-none cursor-pointer"
                  value={formData.QuocTich}
                  onChange={(e) => setFormData({ ...formData, QuocTich: e.target.value })}
                >
                  <option value="Việt Nam">Việt Nam</option>
                  <option value="Khác">Khác</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" size={20} />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-[rgba(6,78,59,0.80)] text-sm font-semibold">Email</label>
              <input
                type="email"
                placeholder="example@homestay.com"
                className="w-full bg-[#F1F3FC] rounded-[16px] px-5 py-4 outline-none text-[#181C22] placeholder:text-[#94A3B8]"
                value={formData.Email}
                onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
              />
            </div>

            {/* Số điện thoại */}
            <div className="flex flex-col gap-2">
              <label className="text-[rgba(6,78,59,0.80)] text-sm font-semibold">Số điện thoại</label>
              <input
                type="text"
                placeholder="090 1234 567"
                className="w-full bg-[#F1F3FC] rounded-[16px] px-5 py-4 outline-none text-[#181C22] placeholder:text-[#94A3B8]"
                value={formData.SDT}
                onChange={(e) => setFormData({ ...formData, SDT: e.target.value })}
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-2 flex justify-end mt-4">
              <button
                disabled={loading}
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-[#0D631B] text-white px-10 py-4 rounded-[16px] font-bold text-base hover:bg-[#0a4d15] transition-all shadow-[0px_10px_15px_-3px_rgba(13,99,27,0.20)] active:scale-95"
              >
                {loading ? "Đang xử lý..." : "Tạo khách hàng"}
                <ArrowRight size={18} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};