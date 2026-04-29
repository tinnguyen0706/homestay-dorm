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
  TablePagination,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import apiClient from "@/apiClient";

const ITEMS_PER_PAGE = 5;

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
      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm ${
        isMale
          ? "bg-blue-100 text-blue-800"
          : "bg-orange-100 text-orange-800"
      }`}
    >
      {gender}
    </span>
  );
};

const Avatar = ({ initials, gender }: { initials: string; gender: string }) => {
  const normalizedGender = (gender ?? "").trim().toLowerCase();

  let bgColor = "bg-green-100";
  if (normalizedGender === "nữ" || normalizedGender === "nu") {
    bgColor = "bg-orange-100";
  } else {
    bgColor = "bg-indigo-100";
  }

  let textColor = "text-green-800";
  if (normalizedGender === "nữ" || normalizedGender === "nu") {
    textColor = "text-orange-800";
  } else {
    textColor = "text-indigo-800";
  }

  return (
    <div
      className={`w-8 h-8 rounded-full flex justify-center items-center ${bgColor}`}
    >
      <span className={`text-xs font-bold ${textColor}`}>{initials}</span>
    </div>
  );
};

export const MH_DSKH = () => {
  const [danhSachKhachHang, setDanhSachKhachHang] = useState<APICustomer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchField, setSearchField] = useState<SearchField>("HoTen");
  const [searchValue, setSearchValue] = useState("");

  const HienThi = async (field?: string, value?: string) => {
    try {
      const response = await apiClient.get<APICustomer[]>("/KhachHang/LayDSKH", {
        params: field && value ? { [field]: value } : undefined,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching customers:", error);
      return [];
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
    const maxPage = Math.max(
      1,
      Math.ceil(danhSachKhachHang.length / ITEMS_PER_PAGE)
    );
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  }, [danhSachKhachHang.length, currentPage]);

  const khachHangHienTai = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return danhSachKhachHang.slice(startIndex, endIndex);
  }, [danhSachKhachHang, currentPage]);

  const handleSearch = async (
    field: string,
    value: string
  ) => {
    const data = await HienThi(field, value);
    setDanhSachKhachHang(data);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    const maxPage = Math.max(
      1,
      Math.ceil(danhSachKhachHang.length / ITEMS_PER_PAGE)
    );
    if (page >= 1 && page <= maxPage) {
      setCurrentPage(page);
    }
  };

  const getInitials = (HoTen?: string) =>
    (HoTen ?? "")
      .trim()
      .split(/\s+/)
      .slice(-2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-inter">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-800 mb-6 font-inter">
          Danh sách khách hàng
        </h1>

        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Tìm kiếm theo tên, số điện thoại hoặc ID khách hàng..."
              className="pl-10 h-11 rounded-lg bg-white border-gray-200 shadow-sm font-inter"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  void handleSearch(searchField, searchValue);
                }
              }}
            />
          </div>
          <Select
            value={searchField}
            onValueChange={(value) => setSearchField(value as SearchField)}
          >
            <SelectTrigger className="w-55">
              <SelectValue placeholder="Tìm kiếm theo tên" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="HoTen">Tìm kiếm theo tên</SelectItem>
                <SelectItem value="MaKH">Tìm kiếm theo ID</SelectItem>
                <SelectItem value="SDT">Tìm kiếm theo SĐT</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow className="border-b-gray-200">
                <TableHead className="px-6 py-4 text-gray-500 text-xs font-semibold uppercase tracking-wider font-inter">
                  ID
                </TableHead>
                <TableHead className="px-6 py-4 text-gray-500 text-xs font-semibold uppercase tracking-wider font-inter">
                  Họ tên
                </TableHead>
                <TableHead className="px-6 py-4 text-gray-500 text-xs font-semibold uppercase tracking-wider font-inter">
                  Giới tính
                </TableHead>
                <TableHead className="px-6 py-4 text-gray-500 text-xs font-semibold uppercase tracking-wider font-inter">
                  Thông tin liên hệ
                </TableHead>
                <TableHead className="px-6 py-4 text-gray-500 text-xs font-semibold uppercase tracking-wider font-inter">
                  Quốc tịch
                </TableHead>
                <TableHead className="px-6 py-4 text-gray-500 text-xs font-semibold uppercase tracking-wider font-inter">
                  Mã nhóm
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {khachHangHienTai.map((khachHang) => (
                <TableRow key={khachHang.MaKH} className="border-b-gray-100">
                  <TableCell className="px-6 py-4 font-mono text-sm text-gray-500">
                    {khachHang.MaKH}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <Avatar
                        initials={getInitials(khachHang.HoTen)}
                        gender={khachHang.GioiTinh}
                      />
                      <span className="font-semibold text-emerald-800 font-inter">
                        {khachHang.HoTen}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <GenderBadge gender={khachHang.GioiTinh} />
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="font-medium text-emerald-800 font-inter">
                      {khachHang.Email}
                    </div>
                    <div className="text-sm text-gray-500 font-inter">
                      {khachHang.SDT}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-600 font-inter">
                    {khachHang.QuocTich}
                  </TableCell>
                  <TableCell className="px-6 py-4 font-mono text-sm text-gray-500">
                    {khachHang.MaNhomThue}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TablePagination
              currentPage={currentPage}
              totalItems={danhSachKhachHang.length}
              itemsPerPage={ITEMS_PER_PAGE}
              currentItemsCount={khachHangHienTai.length}
              colSpan={6}
              onPageChange={handlePageChange}
            />
          </Table>
        </div>
      </div>
    </div>
  );
};
