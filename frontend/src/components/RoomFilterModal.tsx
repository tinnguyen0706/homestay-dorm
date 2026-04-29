import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Filter } from "lucide-react";

interface RoomFilterModalProps {
  onApplyFilter: (filters: any) => void;
}

export function RoomFilterModal({ onApplyFilter }: RoomFilterModalProps) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    ChiNhanh: "",
    LoaiPhong: "",
    SucChua: "",
    GioiTinh: "",
    TrangThai: ""
  });

  const handleApply = () => {
    const finalFilters = { ...filters };
    if (finalFilters.ChiNhanh === "all") finalFilters.ChiNhanh = "";
    if (finalFilters.LoaiPhong === "all") finalFilters.LoaiPhong = "";
    if (finalFilters.GioiTinh === "all") finalFilters.GioiTinh = "";
    if (finalFilters.TrangThai === "all") finalFilters.TrangThai = "";
    
    onApplyFilter(finalFilters);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 h-10 px-4 rounded-[12px] border-[#BFCAba]/20 text-[#40493D] font-semibold hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          Bộ lọc
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[672px] p-0 overflow-hidden bg-white border-0 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] rounded-[12px]">
        {/* For screen readers */}
        <DialogTitle className="sr-only">Tìm kiếm hoàn hảo</DialogTitle>
        
        <div className="flex h-[520px]">
          {/* Decorative Left Panel */}
          <div className="w-[224px] h-full bg-gradient-to-br from-[#0D631B] to-[#2E7D32] p-8 flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <Filter className="w-8 h-8 text-white opacity-80" />
              <h2 className="text-white font-manrope text-[24px] font-[800] leading-[30px]">
                Tìm kiếm<br/>hoàn hảo
              </h2>
              <p className="text-white/70 font-inter text-[14px] font-[300] leading-[20px]">
                Tinh chỉnh không gian sống của bạn với các tiêu chí khắt khe nhất.
              </p>
            </div>
            <p className="text-white/50 font-inter text-[10px] tracking-widest font-semibold">
              ELITE STAY MANAGER
            </p>
          </div>

          {/* Main Filter Form */}
          <div className="flex-1 flex flex-col justify-between p-8">
            <div className="flex flex-col gap-6">
              <h3 className="text-[#181C22] font-manrope text-[20px] font-bold">Bộ lọc</h3>
              
              <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="branch" className="text-[#40493D] font-inter text-[12px] font-semibold uppercase">Chi nhánh</Label>
                  <Select value={filters.ChiNhanh || "all"} onValueChange={(val) => setFilters(prev => ({...prev, ChiNhanh: val}))}>
                    <SelectTrigger id="branch" className="h-11 rounded-[16px] bg-[#F1F3FC] border-0 focus:ring-0">
                      <SelectValue placeholder="Tất cả chi nhánh" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả chi nhánh</SelectItem>
                      <SelectItem value="CN001">Chi nhánh Tân Phú</SelectItem>
                      <SelectItem value="CN002">Chi nhánh Quận 1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor="roomType" className="text-[#40493D] font-inter text-[12px] font-semibold uppercase">Loại phòng</Label>
                  <Select value={filters.LoaiPhong || "all"} onValueChange={(val) => setFilters(prev => ({...prev, LoaiPhong: val}))}>
                    <SelectTrigger id="roomType" className="h-11 rounded-[16px] bg-[#F1F3FC] border-0 focus:ring-0">
                      <SelectValue placeholder="Tất cả loại phòng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả loại phòng</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Dorm">Dorm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="capacity" className="text-[#40493D] font-inter text-[12px] font-semibold uppercase">Sức chứa</Label>
                  <Input 
                    id="capacity" 
                    type="number" 
                    value={filters.SucChua}
                    placeholder="Ví dụ: 1" 
                    onChange={(e) => setFilters(prev => ({...prev, SucChua: e.target.value}))}
                    className="h-11 rounded-[16px] bg-[#F1F3FC] border-0 focus-visible:ring-0 text-[#181C22]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="gender" className="text-[#40493D] font-inter text-[12px] font-semibold uppercase">Giới tính</Label>
                  <Select value={filters.GioiTinh || "all"} onValueChange={(val) => setFilters(prev => ({...prev, GioiTinh: val}))}>
                    <SelectTrigger id="gender" className="h-11 rounded-[16px] bg-[#F1F3FC] border-0 focus:ring-0">
                      <SelectValue placeholder="Tất cả" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Cả hai</SelectItem>
                      <SelectItem value="Nam">Nam</SelectItem>
                      <SelectItem value="Nữ">Nữ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="status" className="text-[#40493D] font-inter text-[12px] font-semibold uppercase">Trạng thái</Label>
                  <Select value={filters.TrangThai || "all"} onValueChange={(val) => setFilters(prev => ({...prev, TrangThai: val}))}>
                    <SelectTrigger id="status" className="h-11 rounded-[16px] bg-[#F1F3FC] border-0 focus:ring-0">
                      <SelectValue placeholder="Tất cả trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả trạng thái</SelectItem>
                      <SelectItem value="Còn trống">Còn trống</SelectItem>
                      <SelectItem value="Đã đầy">Đã đầy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button onClick={handleApply} className="w-full h-12 bg-[#0D631B] text-white hover:bg-[#0D631B]/90 rounded-[12px] font-semibold mt-8">
              Áp dụng bộ lọc
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
