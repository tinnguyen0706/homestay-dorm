import { useEffect, useState } from "react";
import apiClient from "../apiClient.ts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NCTFilterModal } from "@/components/NCTFilterModal.tsx";
import { NCTDetailModal } from "@/components/NCTDetailModal.tsx";

// Update Interface chuẩn khớp với backend
export interface INhuCauThue {
  MaNCT: string;
  MaKH_DaiDien: string;
  NhomThue: any;
  LoaiPhong: string;
  SoNguoiDuKien: number;
  HinhThucThue: string;
  GiaMin: number;
  GiaMax: number;
  ThoiDiemVao: Date;
  ThoiHanThue: number;
  KhuVuc: string;
  TrangThai: string;
  TieuChi: string[];
  TenKhachHang: string;
  TenLoaiPhong: string;
}

// Map màu trạng thái theo đúng DB Check Constraint ('Chờ duyệt', 'Đang tìm', 'Đã khớp', 'Đã hủy', 'Hết hạn')
const getStatusStyles = (status: string) => {
  switch (status) {
    case "Chờ duyệt":
      return "bg-[#F59E0B]/15 text-[#D97706]"; // Cam
    case "Đang tìm":
      return "bg-[#3B82F6]/15 text-[#2563EB]"; // Xanh dương
    case "Đã khớp":
      return "bg-[#10B981]/15 text-[#059669]"; // Xanh lá
    case "Đã hủy":
      return "bg-[#EF4444]/15 text-[#DC2626]"; // Đỏ
    case "Hết hạn":
      return "bg-gray-500/15 text-gray-600"; // Xám
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const MH_DSNhuCauThue = () => {
  const [danhSach, setDanhSach] = useState<INhuCauThue[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilters, setCurrentFilters] = useState({});
  const [selectedMaNCT, setSelectedMaNCT] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const itemsPerPage = 8;

  const fetchNhuCauThue = async (filters = {}) => {
    try {
      setLoading(true);
      const res = await apiClient.get("/api/nhucauthue", { params: filters });
      if (res.data.success) {
        setDanhSach(res.data.data);
      }
    } catch (err) {
      console.error("Lỗi khi tải danh sách nhu cầu thuê:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNhuCauThue();
  }, []);

  const handleApplyFilter = (filters: any) => {
    setCurrentFilters(filters); // Lưu lại filter đang áp dụng
    setCurrentPage(1); // Reset về trang 1 khi lọc
    fetchNhuCauThue(filters); // Gọi API mới
  };

  // Hàm xử lý khi nhấn Xem chi tiết
  const handleOpenDetail = (maNCT: string) => {
    setSelectedMaNCT(maNCT);
    setIsDetailOpen(true);
  };

  const totalPages = Math.ceil(danhSach.length / itemsPerPage);
  const currentItems = danhSach.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="bg-[#F9F9FF] min-h-screen w-full">
      <div className="max-w-[1024px] mx-auto p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-[36px] leading-[40px] font-[800] text-[#181C22] font-manrope">
            Danh sách nhu cầu thuê
          </h1>
          <NCTFilterModal onApplyFilter={handleApplyFilter} />
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[24px] shadow-[0px_8px_30px_0px_rgba(0,0,0,0.04)] border border-[#BFCAba]/10 mt-2 overflow-hidden flex flex-col min-h-[588px]">
          {loading ? (
            <div className="py-20 text-center text-[#40493D] flex-1 font-medium">
              Đang tải dữ liệu...
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-x-auto">
                <Table className="min-w-[900px]">
                  <TableHeader className="bg-[#F1F3FC]/50 border-b border-[#BFCAba]/10">
                    <TableRow className="border-b-0 hover:bg-transparent">
                      <TableHead className="font-manrope font-bold text-[12px] text-[#40493D] h-[72px] uppercase px-6">
                        MÃ NCT
                      </TableHead>
                      <TableHead className="font-manrope font-bold text-[12px] text-[#40493D] uppercase">
                        KHÁCH HÀNG
                      </TableHead>
                      <TableHead className="font-manrope font-bold text-[12px] text-[#40493D] uppercase">
                        LOẠI PHÒNG
                      </TableHead>
                      <TableHead className="font-manrope font-bold text-[12px] text-[#40493D] text-center uppercase">
                        SỐ NGƯỜI
                      </TableHead>
                      <TableHead className="font-manrope font-bold text-[12px] text-[#40493D] uppercase">
                        HÌNH THỨC
                      </TableHead>
                      <TableHead className="font-manrope font-bold text-[12px] text-[#40493D] uppercase">
                        THỜI HẠN
                      </TableHead>
                      <TableHead className="font-manrope font-bold text-[12px] text-[#40493D] uppercase">
                        KHU VỰC
                      </TableHead>
                      <TableHead className="font-manrope font-bold text-[12px] text-[#40493D] text-center uppercase">
                        TRẠNG THÁI
                      </TableHead>
                      <TableHead className="font-manrope font-bold text-[12px] text-[#40493D] text-center uppercase px-6">
                        THAO TÁC
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {danhSach.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={9}
                          className="text-center py-20 text-gray-500 font-medium"
                        >
                          Chưa có nhu cầu thuê nào.
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentItems.map((item) => (
                        <TableRow
                          key={item.MaNCT}
                          className="border-b border-[#BFCAba]/10 h-[81px] hover:bg-gray-50/50 transition-colors"
                        >
                          <TableCell className="font-manrope font-bold text-[16px] text-[#00490E] px-6">
                            #{item.MaNCT}
                          </TableCell>
                          <TableCell className="font-semibold text-[16px] text-[#181C22]">
                            {item.TenKhachHang || "N/A"}
                          </TableCell>
                          <TableCell className="text-[14px] text-[#40493D]">
                            {item.TenLoaiPhong || item.LoaiPhong}
                          </TableCell>
                          <TableCell className="text-[14px] text-[#40493D] text-center font-medium">
                            {item.SoNguoiDuKien}
                          </TableCell>
                          <TableCell className="text-[14px] text-[#40493D]">
                            {item.HinhThucThue}
                          </TableCell>
                          <TableCell className="text-[14px] text-[#40493D]">
                            {item.ThoiHanThue} tháng
                          </TableCell>
                          <TableCell className="text-[14px] text-[#40493D]">
                            {item.KhuVuc || "N/A"}
                          </TableCell>
                          <TableCell className="text-center">
                            <span
                              className={`px-4 py-1.5 rounded-full text-[12px] font-bold tracking-wide whitespace-nowrap ${getStatusStyles(item.TrangThai)}`}
                            >
                              {item.TrangThai}
                            </span>
                          </TableCell>
                          <TableCell className="text-center px-6">
                            <button
                              onClick={() => handleOpenDetail(item.MaNCT)}
                              className="text-[14px] font-bold text-[#047857] hover:text-[#0D631B] hover:underline underline-offset-2 transition-colors whitespace-nowrap"
                            >
                              Xem chi tiết
                            </button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {danhSach.length > 0 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-[#BFCAba]/10 bg-white">
                  <span className="text-[14px] text-gray-500 font-medium">
                    Hiển thị {(currentPage - 1) * itemsPerPage + 1} -{" "}
                    {Math.min(currentPage * itemsPerPage, danhSach.length)}{" "}
                    trong số {danhSach.length} kết quả
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
                          className={`w-8 h-8 rounded-lg text-[14px] font-semibold transition-colors ${
                            currentPage === i + 1
                              ? "bg-[#0D631B] text-white hover:bg-[#0D631B]/90"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
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
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
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
      <NCTDetailModal
        maNCT={selectedMaNCT}
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </div>
  );
};