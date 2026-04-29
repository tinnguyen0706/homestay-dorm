import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import {
  Filter,
  Users,
  Calendar,
  Map,
  DoorOpen,
  SlidersHorizontal,
  X,
} from "lucide-react";
import apiClient from "../apiClient.ts";

interface NCTFilterModalProps {
  onApplyFilter: (filters: any) => void;
}

export function NCTFilterModal({ onApplyFilter }: NCTFilterModalProps) {
  const [open, setOpen] = useState(false);
  const [loaiPhongs, setLoaiPhongs] = useState<
    { MaLoai: string; TenLoai: string }[]
  >([]);

  const [filters, setFilters] = useState({
    SoNguoiDuKien: "",
    HinhThucThue: "",
    GiaMin: "",
    GiaMax: "",
    ThoiDiemVao: "",
    ThoiHanThue: "",
    KhuVuc: "",
    LoaiPhong: "",
    TrangThai: "",
  });

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const res = await apiClient.get("/api/nhucauthue/filter-options");
        if (res.data.success) {
          // Chỉ lấy loaiPhongs, không lấy khuVucs nữa
          setLoaiPhongs(res.data.data.loaiPhongs);
        }
      } catch (err) {
        console.error("Lỗi tải option bộ lọc:", err);
      }
    };
    if (open) {
      loadOptions();
    }
  }, [open]);

  const handleApply = () => {
    const finalFilters = { ...filters };

    if (finalFilters.HinhThucThue === "all") finalFilters.HinhThucThue = "";
    if (finalFilters.LoaiPhong === "all") finalFilters.LoaiPhong = "";

    onApplyFilter(finalFilters);
    setOpen(false);
  };

  const statusOptions = [
    "Chờ duyệt",
    "Đang tìm",
    "Đã khớp",
    "Đã hủy",
    "Hết hạn",
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 h-10 px-5 rounded-[12px] bg-[#F1F3FC] border-none text-[#40493D] font-bold hover:bg-gray-200 shadow-sm transition-all"
        >
          <Filter className="w-4 h-4" />
          Bộ lọc
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-[700px] p-0 bg-white border border-gray-100 shadow-2xl rounded-[20px] overflow-hidden"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Bộ lọc</DialogTitle>

        {/* Header Modal */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#0D631B]">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <h2 className="text-[#181C22] font-manrope text-[20px] font-bold">
              Bộ lọc
            </h2>
          </div>
          <DialogClose className="text-gray-400 hover:text-gray-700 transition-colors">
            <X className="w-6 h-6" />
          </DialogClose>
        </div>

        {/* Body Modal */}
        <div className="px-8 py-6 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {/* SỐ NGƯỜI DỰ KIẾN */}
            <div className="flex flex-col gap-2">
              <Label className="text-[#181C22] font-inter text-[12px] font-bold uppercase tracking-wide">
                Số người dự kiến
              </Label>
              <div className="flex items-center bg-[#F9FAFB] rounded-[12px] px-4 h-12 border border-transparent focus-within:border-[#0D631B] transition-colors">
                <Users className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
                <input
                  type="number"
                  placeholder="Ví dụ: 2"
                  value={filters.SoNguoiDuKien}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      SoNguoiDuKien: e.target.value,
                    }))
                  }
                  className="bg-transparent outline-none flex-1 text-[#181C22] font-medium text-[15px] placeholder:text-gray-400 placeholder:font-normal"
                />
              </div>
            </div>

            {/* HÌNH THỨC THUÊ */}
            <div className="flex flex-col gap-2">
              <Label className="text-[#181C22] font-inter text-[12px] font-bold uppercase tracking-wide">
                Hình thức thuê
              </Label>
              <Select
                value={filters.HinhThucThue || "all"}
                onValueChange={(val) =>
                  setFilters((prev) => ({ ...prev, HinhThucThue: val }))
                }
              >
                <SelectTrigger className="h-12 rounded-[12px] bg-[#F9FAFB] border-0 focus:ring-1 focus:ring-[#0D631B] text-[15px] font-medium px-4">
                  <SelectValue placeholder="Tất cả hình thức" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả hình thức</SelectItem>
                  <SelectItem value="Thuê phòng">Thuê phòng</SelectItem>
                  <SelectItem value="Thuê giường">Thuê giường</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* KHOẢNG GIÁ (VNĐ) */}
            <div className="col-span-2 flex flex-col gap-2">
              <Label className="text-[#181C22] font-inter text-[12px] font-bold uppercase tracking-wide">
                Khoảng giá (VNĐ)
              </Label>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-[#F9FAFB] rounded-[12px] px-4 h-12 flex-1 border border-transparent focus-within:border-[#0D631B] transition-colors">
                  <span className="text-[13px] font-bold text-gray-800 mr-3">
                    MIN
                  </span>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.GiaMin}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        GiaMin: e.target.value,
                      }))
                    }
                    className="bg-transparent outline-none flex-1 text-[#181C22] font-medium text-[15px] placeholder:text-gray-400"
                  />
                </div>
                <span className="text-gray-300 font-bold">—</span>
                <div className="flex items-center bg-[#F9FAFB] rounded-[12px] px-4 h-12 flex-1 border border-transparent focus-within:border-[#0D631B] transition-colors">
                  <span className="text-[13px] font-bold text-gray-800 mr-3">
                    MAX
                  </span>
                  <input
                    type="number"
                    placeholder="50.000.000"
                    value={filters.GiaMax}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        GiaMax: e.target.value,
                      }))
                    }
                    className="bg-transparent outline-none flex-1 text-[#181C22] font-medium text-[15px] placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* THỜI GIAN DỌN VÀO */}
            <div className="flex flex-col gap-2">
              <Label className="text-[#181C22] font-inter text-[12px] font-bold uppercase tracking-wide">
                Thời gian dọn vào
              </Label>
              <div className="flex items-center bg-[#F9FAFB] rounded-[12px] px-4 h-12 border border-transparent focus-within:border-[#0D631B] transition-colors relative">
                <Calendar className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
                <input
                  type="date"
                  value={filters.ThoiDiemVao}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      ThoiDiemVao: e.target.value,
                    }))
                  }
                  className="bg-transparent outline-none flex-1 text-[#181C22] font-medium text-[15px] text-gray-500 w-full"
                />
              </div>
            </div>

            {/* THỜI HẠN THUÊ */}
            <div className="flex flex-col gap-2">
              <Label className="text-[#181C22] font-inter text-[12px] font-bold uppercase tracking-wide">
                Thời hạn thuê (Tháng)
              </Label>
              <div className="flex items-center bg-[#F9FAFB] rounded-[12px] px-4 h-12 border border-transparent focus-within:border-[#0D631B] transition-colors">
                <input
                  type="number"
                  placeholder="Ví dụ: 5"
                  value={filters.ThoiHanThue}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      ThoiHanThue: e.target.value,
                    }))
                  }
                  className="bg-transparent outline-none flex-1 text-[#181C22] font-medium text-[15px] placeholder:text-gray-400 placeholder:font-normal"
                />
              </div>
            </div>

            {/* KHU VỰC (Đã đổi thành Textbox) */}
            <div className="flex flex-col gap-2 relative">
              <Label className="text-[#181C22] font-inter text-[12px] font-bold uppercase tracking-wide">
                Khu vực
              </Label>
              <div className="flex items-center bg-[#F9FAFB] rounded-[12px] px-4 h-12 border border-transparent focus-within:border-[#0D631B] transition-colors relative">
                <Map className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Ví dụ: Quận 1, Quận 9..."
                  value={filters.KhuVuc}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, KhuVuc: e.target.value }))
                  }
                  className="bg-transparent outline-none flex-1 text-[#181C22] font-medium text-[15px] placeholder:text-gray-400 placeholder:font-normal w-full"
                />
              </div>
            </div>

            {/* LOẠI PHÒNG (Select từ DB) */}
            <div className="flex flex-col gap-2 relative">
              <Label className="text-[#181C22] font-inter text-[12px] font-bold uppercase tracking-wide">
                Loại phòng
              </Label>
              <div className="relative flex items-center">
                <DoorOpen className="w-5 h-5 text-gray-400 absolute left-4 z-10" />
                <Select
                  value={filters.LoaiPhong || "all"}
                  onValueChange={(val) =>
                    setFilters((prev) => ({ ...prev, LoaiPhong: val }))
                  }
                >
                  <SelectTrigger className="pl-12 h-12 rounded-[12px] bg-[#F9FAFB] border-0 focus:ring-1 focus:ring-[#0D631B] text-[15px] font-medium w-full">
                    <SelectValue placeholder="Tất cả loại phòng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả loại phòng</SelectItem>
                    {loaiPhongs.map((lp) => (
                      <SelectItem key={lp.MaLoai} value={lp.MaLoai}>
                        {lp.TenLoai}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* TRẠNG THÁI NHU CẦU */}
            <div className="col-span-2 flex flex-col gap-3 mt-1">
              <Label className="text-[#181C22] font-inter text-[12px] font-bold uppercase tracking-wide">
                Trạng thái nhu cầu
              </Label>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        TrangThai: prev.TrangThai === status ? "" : status,
                      }))
                    }
                    className={`px-5 py-2.5 rounded-full text-[14px] font-medium transition-all duration-200 border ${
                      filters.TrangThai === status
                        ? "bg-[#E8F5E9] text-[#0D631B] border-[#0D631B] font-bold"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Modal */}
        <div className="px-8 py-5 border-t border-gray-100 flex justify-end bg-gray-50/50">
          <Button
            onClick={handleApply}
            className="h-11 px-8 bg-[#0D631B] text-white hover:bg-[#0D631B]/90 rounded-[10px] font-bold text-[15px] transition-all"
          >
            Áp dụng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
