import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import apiClient from "@/apiClient";

const ITEMS_PER_PAGE = 8;

type APICustomer = {
  MaKH: string;
  HoTen: string;
  GioiTinh: string;
  Email: string;
  SDT: string;
  QuocTich: string;
  MaNhomThue: string;
};

type SearchField = "MaKH" | "HoTen" | "SDT";

const GenderBadge = ({ gender }: { gender: string }) => {
  const normalizedGender = (gender ?? "").trim().toLowerCase();
  const isMale = normalizedGender === "nam";
  return (
    <span
      className={`px-3 py-1 rounded-full text-[12px] font-semibold tracking-wide ${
        isMale ? "bg-[#00490E]/15 text-[#00490E]" : "bg-[#B91C1C]/15 text-[#B91C1C]"
      }`}
    >
      {gender}
    </span>
  );
};

export const MH_DSKH = () => {
  const [danhSachKhachHang, setDanhSachKhachHang] = useState<APICustomer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchField, setSearchField] = useState<SearchField>("HoTen");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);

  const HienThi = async (field?: string, value?: string) => {
    try {
      setLoading(true);
      const response = await apiClient.get<APICustomer[]>("/KhachHang/LayDSKH", {
        params: field && value ? { [field]: value } : undefined,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching customers:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      const data = await HienThi(searchField, searchValue);
      setDanhSachKhachHang(data);
    };

    load();
  }, []);

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(danhSachKhachHang.length / ITEMS_PER_PAGE));
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  }, [danhSachKhachHang.length, currentPage]);

  const khachHangHienTai = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return danhSachKhachHang.slice(startIndex, endIndex);
  }, [danhSachKhachHang, currentPage]);

  const handleSearch = async (field: string, value: string) => {
    const data = await HienThi(field, value);
    setDanhSachKhachHang(data);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(danhSachKhachHang.length / ITEMS_PER_PAGE);

  return (
    <div className="bg-[#F9F9FF] min-h-screen w-full">
      <div className="max-w-[1024px] mx-auto p-8 flex flex-col gap-6">
        <h1
          className="text-[36px] leading-[40px] font-[800] text-[#181C22]"
          style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
        >
          Danh sách khách hàng
        </h1>

        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm theo tên, SĐT hoặc mã khách hàng"
              className="pl-9 h-11 rounded-[16px] bg-[#F1F3FC] border-0 focus-visible:ring-0"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  void handleSearch(searchField, searchValue);
                }
              }}
            />
          </div>
          <Select value={searchField} onValueChange={(value) => setSearchField(value as SearchField)}>
            <SelectTrigger className="w-[190px] h-11 rounded-[16px] bg-[#F1F3FC] border-0 focus:ring-0">
              <SelectValue placeholder="Tìm theo tên" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="HoTen">Tìm theo tên</SelectItem>
                <SelectItem value="MaKH">Tìm theo mã KH</SelectItem>
                <SelectItem value="SDT">Tìm theo SĐT</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-white rounded-[24px] shadow-[0px_8px_30px_0px_rgba(0,0,0,0.04)] border border-[#BFCAba]/10 mt-2 overflow-hidden flex flex-col min-h-[588px]">
          {loading ? (
            <div className="py-20 text-center text-[#40493D] flex-1">Đang tải dữ liệu...</div>
          ) : (
            <>
              <div className="flex-1">
                <Table>
                  <TableHeader className="bg-[#F1F3FC]/50 border-b border-[#BFCAba]/10">
                    <TableRow className="border-b-0 hover:bg-transparent">
                      <TableHead className="font-manrope font-bold text-[12px] text-[#40493D] h-[72px] uppercase px-6">MÃ KHÁCH HÀNG</TableHead>
                      <TableHead className="font-manrope font-bold text-[12px] text-[#40493D] uppercase">HỌ TÊN</TableHead>
                      <TableHead className="font-manrope font-bold text-[12px] text-[#40493D] uppercase">GIỚI TÍNH</TableHead>
                      <TableHead className="font-manrope font-bold text-[12px] text-[#40493D] uppercase">THÔNG TIN LIÊN HỆ</TableHead>
                      <TableHead className="font-manrope font-bold text-[12px] text-[#40493D] uppercase">QUỐC TỊCH</TableHead>
                      <TableHead className="font-manrope font-bold text-[12px] text-[#40493D] uppercase">MÃ NHÓM THUÊ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {khachHangHienTai.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-20 text-gray-500">Không tìm thấy khách hàng nào.</TableCell>
                      </TableRow>
                    ) : (
                      khachHangHienTai.map((khachHang) => (
                        <TableRow key={khachHang.MaKH} className="border-b border-[#BFCAba]/10 h-[81px] hover:bg-gray-50/50">
                          <TableCell className="font-manrope font-bold text-[16px] text-[#00490E] px-6">{khachHang.MaKH}</TableCell>
                          <TableCell className="font-semibold text-[16px] text-[#181C22]">{khachHang.HoTen}</TableCell>
                          <TableCell className="text-[14px] text-[#40493D]"><GenderBadge gender={khachHang.GioiTinh} /></TableCell>
                          <TableCell className="text-[14px] text-[#40493D]">
                            <div className="font-semibold text-[#00490E]">{khachHang.Email}</div>
                            <div>{khachHang.SDT}</div>
                          </TableCell>
                          <TableCell className="text-[14px] text-[#40493D]">{khachHang.QuocTich}</TableCell>
                          <TableCell className="text-[14px] text-[#40493D]">{khachHang.MaNhomThue || "-"}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {danhSachKhachHang.length > 0 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-[#BFCAba]/10 bg-white">
                  <span className="text-[14px] text-gray-500 font-medium">
                    Hiển thị {(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, danhSachKhachHang.length)} trong số {danhSachKhachHang.length} khách hàng
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8 rounded-lg border-gray-200"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <Button
                          key={i}
                          variant={currentPage === i + 1 ? "default" : "ghost"}
                          size="icon"
                          className={`w-8 h-8 rounded-lg text-[14px] font-semibold ${currentPage === i + 1 ? "bg-[#0D631B] text-white hover:bg-[#0D631B]/90" : "text-gray-600 hover:bg-gray-100"}`}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8 rounded-lg border-gray-200"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
