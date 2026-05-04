// frontend/src/pages/MH_TaoKH.tsx
import { toast } from "sonner";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import apiClient from "@/apiClient";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/combobox";

export const MH_TaoKH = () => {
  const [formData, setFormData] = useState({
    HoTen: "",
    GioiTinh: "Nam",
    QuocTich: "Việt Nam",
    Email: "",
    SDT: "",
  });
  const [loading, setLoading] = useState(false);

  // Bước 1.0: NhapThongTin() - Cập nhật dữ liệu từ các TextBox/ComboBox
  const NhapThongTin = (truong: string, giaTri: string) => {
    setFormData((prev) => ({ ...prev, [truong]: giaTri }));
  };

  // Bước 2.0: btnTaoKH() - Khi nhân viên nhấn nút Tạo
  const btn_TaoKH_click = async () => {
    try {
      setLoading(true);
      // Gửi yêu cầu sang hệ thống (bước 2.1, 2.2, 2.3 diễn ra ở Backend)
      const res = await apiClient.post("/KhachHang/ThemKH", formData);
      toast.success(`Tạo thành công khách hàng mã: ${res.data.MaKH}`);
      // alert(`Tạo thành công khách hàng mã: ${res.data.MaKH}`);
      setFormData({
        HoTen: "",
        GioiTinh: "Nam",
        QuocTich: "Việt Nam",
        Email: "",
        SDT: "",
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 p-10 font-inter">
      <div className="max-w-[896px] mx-auto mt-12">
        <h1 className="text-emerald-900 text-3xl font-extrabold font-manrope leading-9 mb-10">
          Tạo khách hàng mới
        </h1>
        <Card className="relative border-none bg-white rounded-2xl shadow-[0px_4px_40px_-15px_rgba(13,99,27,0.08)] p-10 overflow-hidden">
          <div className="w-64 h-64 -right-32 -top-32 absolute bg-green-900/5 rounded-full pointer-events-none" />
          <div className="grid grid-cols-2 gap-x-10 gap-y-8 relative z-10">
            <div className="col-span-2 flex flex-col gap-2">
              <Label className="text-emerald-900/80 text-sm font-semibold">
                Họ và tên
              </Label>
              <Input
                placeholder="Nguyễn Văn A"
                className="h-14 bg-slate-100 border-none rounded-2xl px-5"
                value={formData.HoTen}
                onChange={(e) => NhapThongTin("HoTen", e.target.value)} // Gọi NhapThongTin()
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Label className="text-emerald-900/80 text-sm font-semibold">
                Giới tính
              </Label>
              <Tabs
                value={formData.GioiTinh}
                onValueChange={(v) => NhapThongTin("GioiTinh", v)}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 w-full bg-slate-100 p-1 rounded-2xl h-14 border-none">
                  <TabsTrigger
                    value="Nam"
                    className="h-12 rounded-lg data-[state=active]:bg-white"
                  >
                    Nam
                  </TabsTrigger>
                  <TabsTrigger
                    value="Nữ"
                    className="h-12 rounded-lg data-[state=active]:bg-white"
                  >
                    Nữ
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Label className="text-emerald-900/80 text-sm font-semibold">
                Quốc tịch
              </Label>
              <Select
                value={formData.QuocTich}
                onValueChange={(v) => NhapThongTin("QuocTich", v)}
              >
                <SelectTrigger className="h-14 w-full bg-slate-100 border-none rounded-2xl px-5 focus:ring-0">
                  <SelectValue placeholder="Chọn quốc tịch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Việt Nam">Việt Nam</SelectItem>
                  <SelectItem value="Khác">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-emerald-900/80 text-sm font-semibold">
                Email
              </Label>
              <Input
                type="email"
                placeholder="example@homestay.com"
                className="h-14 bg-slate-100 border-none rounded-2xl px-5"
                value={formData.Email}
                onChange={(e) => NhapThongTin("Email", e.target.value)} // Gọi NhapThongTin()
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-emerald-900/80 text-sm font-semibold">
                Số điện thoại
              </Label>
              <Input
                placeholder="090 1234 567"
                className="h-14 bg-slate-100 border-none rounded-2xl px-5"
                value={formData.SDT}
                onChange={(e) => NhapThongTin("SDT", e.target.value)} // Gọi NhapThongTin()
              />
            </div>

            <div className="col-span-2 flex justify-end mt-6">
              <Button
                disabled={loading}
                onClick={btn_TaoKH_click} // Bước 2.0
                className="h-14 px-10 bg-green-900 hover:bg-emerald-950 text-white rounded-2xl font-bold shadow-lg flex items-center gap-2"
              >
                {loading ? "Đang xử lý..." : "Tạo khách hàng"}
                <ArrowRight className="w-5 h-5" strokeWidth={3} />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
