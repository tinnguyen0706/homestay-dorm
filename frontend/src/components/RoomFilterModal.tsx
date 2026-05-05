import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Filter } from "lucide-react";
import apiClient from "../apiClient";

interface RoomFilterModalProps {
  onApplyFilter: (filters: any) => void;
}

interface FilterOptionResponse {
  ChiNhanh: Array<{ MaCN: string; TenCN: string }>;
  LoaiPhong: Array<{ MaLoai: string; TenLoai: string }>;
  GioiTinh: string[];
  TrangThai: string[];
}

export function RoomFilterModal({ onApplyFilter }: RoomFilterModalProps) {
  const [open, setOpen] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [options, setOptions] = useState<FilterOptionResponse>({
    ChiNhanh: [],
    LoaiPhong: [],
    GioiTinh: [],
    TrangThai: []
  });

  const [filters, setFilters] = useState({
    ChiNhanh: "",
    LoaiPhong: "",
    SucChua: "",
    GioiTinh: "",
    TrangThai: ""
  });

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setLoadingOptions(true);
        const res = await apiClient.get("/api/phong/filter-options");
        setOptions(res.data);
      } catch (error) {
        console.error("Loi lay filter options:", error);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchFilterOptions();
  }, []);

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
        <Button variant="outline" className="gap-2 h-10 px-5 rounded-[12px] bg-[#F1F3FC] border-none text-[#40493D] font-bold hover:bg-gray-200 shadow-sm transition-all">
          <Filter className="w-4 h-4" />
          {"B\u1ed9 l\u1ecdc"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[672px] p-0 overflow-hidden bg-white border-0 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] rounded-[12px]">
        <DialogTitle className="sr-only">{"T\u00ecm ki\u1ebfm ho\u00e0n h\u1ea3o"}</DialogTitle>

        <div className="flex h-[520px]">
          <div className="w-[224px] h-full bg-gradient-to-br from-[#0D631B] to-[#2E7D32] p-8 flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <Filter className="w-8 h-8 text-white opacity-80" />
              <h2 className="text-white font-manrope text-[24px] font-[800] leading-[30px]">
                {"T\u00ecm ki\u1ebfm"}
                <br />
                {"ho\u00e0n h\u1ea3o"}
              </h2>
              <p className="text-white/70 font-inter text-[14px] font-[300] leading-[20px]">
                {"Tinh ch\u1ec9nh kh\u00f4ng gian s\u1ed1ng c\u1ee7a b\u1ea1n v\u1edbi c\u00e1c ti\u00eau ch\u00ed kh\u1eaft khe nh\u1ea5t."}
              </p>
            </div>
            <p className="text-white/50 font-inter text-[10px] tracking-widest font-semibold">ELITE STAY MANAGER</p>
          </div>

          <div className="flex-1 flex flex-col justify-between p-8">
            <div className="flex flex-col gap-6">
              <h3 className="text-[#181C22] font-manrope text-[20px] font-bold">{"B\u1ed9 l\u1ecdc"}</h3>

              <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="branch" className="text-[#40493D] font-inter text-[12px] font-semibold uppercase">{"Chi nh\u00e1nh"}</Label>
                  <Select value={filters.ChiNhanh || "all"} onValueChange={(val) => setFilters((prev) => ({ ...prev, ChiNhanh: val }))}>
                    <SelectTrigger id="branch" className="h-11 rounded-[16px] bg-[#F1F3FC] border-0 focus:ring-0">
                      <SelectValue placeholder={"T\u1ea5t c\u1ea3 chi nh\u00e1nh"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{"T\u1ea5t c\u1ea3 chi nh\u00e1nh"}</SelectItem>
                      {options.ChiNhanh.map((cn) => (
                        <SelectItem key={cn.MaCN} value={cn.MaCN}>
                          {cn.TenCN}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="roomType" className="text-[#40493D] font-inter text-[12px] font-semibold uppercase">{"Lo\u1ea1i ph\u00f2ng"}</Label>
                  <Select value={filters.LoaiPhong || "all"} onValueChange={(val) => setFilters((prev) => ({ ...prev, LoaiPhong: val }))}>
                    <SelectTrigger id="roomType" className="h-11 rounded-[16px] bg-[#F1F3FC] border-0 focus:ring-0">
                      <SelectValue placeholder={"T\u1ea5t c\u1ea3 lo\u1ea1i ph\u00f2ng"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{"T\u1ea5t c\u1ea3 lo\u1ea1i ph\u00f2ng"}</SelectItem>
                      {options.LoaiPhong.map((lp) => (
                        <SelectItem key={lp.MaLoai} value={lp.TenLoai}>
                          {lp.TenLoai}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="capacity" className="text-[#40493D] font-inter text-[12px] font-semibold uppercase">{"S\u1ee9c ch\u1ee9a"}</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={filters.SucChua}
                    placeholder={"V\u00ed d\u1ee5: 1"}
                    onChange={(e) => setFilters((prev) => ({ ...prev, SucChua: e.target.value }))}
                    className="h-11 rounded-[16px] bg-[#F1F3FC] border-0 focus-visible:ring-0 text-[#181C22]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="gender" className="text-[#40493D] font-inter text-[12px] font-semibold uppercase">{"Gi\u1edbi t\u00ednh"}</Label>
                  <Select value={filters.GioiTinh || "all"} onValueChange={(val) => setFilters((prev) => ({ ...prev, GioiTinh: val }))}>
                    <SelectTrigger id="gender" className="h-11 rounded-[16px] bg-[#F1F3FC] border-0 focus:ring-0">
                      <SelectValue placeholder={"T\u1ea5t c\u1ea3"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{"T\u1ea5t c\u1ea3"}</SelectItem>
                      {options.GioiTinh.map((gt) => (
                        <SelectItem key={gt} value={gt}>
                          {gt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="status" className="text-[#40493D] font-inter text-[12px] font-semibold uppercase">{"Tr\u1ea1ng th\u00e1i"}</Label>
                  <Select value={filters.TrangThai || "all"} onValueChange={(val) => setFilters((prev) => ({ ...prev, TrangThai: val }))}>
                    <SelectTrigger id="status" className="h-11 rounded-[16px] bg-[#F1F3FC] border-0 focus:ring-0">
                      <SelectValue placeholder={"T\u1ea5t c\u1ea3 tr\u1ea1ng th\u00e1i"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{"T\u1ea5t c\u1ea3 tr\u1ea1ng th\u00e1i"}</SelectItem>
                      {options.TrangThai.map((tt) => (
                        <SelectItem key={tt} value={tt}>
                          {tt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button
              onClick={handleApply}
              disabled={loadingOptions}
              className="w-full h-12 bg-[#0D631B] text-white hover:bg-[#0D631B]/90 rounded-[12px] font-semibold mt-8"
            >
              {loadingOptions ? "\u0110ang t\u1ea3i b\u1ed9 l\u1ecdc..." : "\u00c1p d\u1ee5ng b\u1ed9 l\u1ecdc"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
