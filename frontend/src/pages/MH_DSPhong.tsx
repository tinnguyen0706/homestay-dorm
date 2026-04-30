import { useEffect, useState } from "react";
import apiClient from "../apiClient.ts";
import { Link } from "react-router";
import { RoomFilterModal } from "../components/RoomFilterModal.tsx";
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

interface Phong {
  MaPhong: string;
  TenPhong: string;
  LoaiPhong: string;
  SucChuaToiDa: number;
  GioiTinhChoPhep: string;
  TrangThai: string;
  MaCN: string;
  TenChiNhanh?: string;
}

export const MH_DSPhong = () => {
  const [phongs, setPhongs] = useState<Phong[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchPhongs = async (filters = {}) => {
    try {
      setLoading(true);
      const res = await apiClient.get("/api/phong", { params: filters });
      setPhongs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhongs();
  }, []);

  const handleApplyFilter = (filters: any) => {
    setCurrentPage(1);
    fetchPhongs(filters);
  };

  const totalPages = Math.ceil(phongs.length / itemsPerPage);
  const currentPhongs = phongs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-[#F9F9FF] min-h-screen w-full">
      <div className="max-w-[1024px] mx-auto p-8 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1
            className="text-[36px] leading-[40px] font-[800] text-[#181C22]"
            style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
          >
            Danh sách phòng
          </h1>
          <RoomFilterModal onApplyFilter={handleApplyFilter} />
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
                      <TableHead className="font-manrope font-bold text-[12px] text-[#40493D] h-[72px] uppercase px-6">MÃ PHÒNG</TableHead>
                      <TableHead className="font-manrope font-bold text-[12px] text-[#40493D] uppercase">TÊN PHÒNG</TableHead>
                      <TableHead className="font-manrope font-bold text-[12px] text-[#40493D] uppercase">LOẠI PHÒNG</TableHead>
                      <TableHead className="font-manrope font-bold text-[12px] text-[#40493D] uppercase">CHI NHÁNH</TableHead>
                      <TableHead className="font-manrope font-bold text-[12px] text-[#40493D] text-center uppercase">SỨC CHỨA</TableHead>
                      <TableHead className="font-manrope font-bold text-[12px] text-[#40493D] uppercase">GIỚI TÍNH</TableHead>
                      <TableHead className="font-manrope font-bold text-[12px] text-[#40493D] text-center uppercase">TRẠNG THÁI</TableHead>
                      <TableHead className="font-manrope font-bold text-[12px] text-[#40493D] text-center uppercase px-6">THAO TÁC</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {phongs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-20 text-gray-500">Không tìm thấy phòng nào.</TableCell>
                      </TableRow>
                    ) : (
                      currentPhongs.map((phong) => (
                        <TableRow key={phong.MaPhong} className="border-b border-[#BFCAba]/10 h-[81px] hover:bg-gray-50/50">
                          <TableCell className="font-manrope font-bold text-[16px] text-[#00490E] px-6">{phong.MaPhong}</TableCell>
                          <TableCell className="font-semibold text-[16px] text-[#181C22]">{phong.TenPhong}</TableCell>
                          <TableCell className="text-[14px] text-[#40493D]">{phong.LoaiPhong}</TableCell>
                          <TableCell className="text-[14px] text-[#40493D] font-medium">{phong.TenChiNhanh || phong.MaCN}</TableCell>
                          <TableCell className="text-[14px] text-[#40493D] text-center">{phong.SucChuaToiDa} người</TableCell>
                          <TableCell className="text-[14px] text-[#40493D]">{phong.GioiTinhChoPhep}</TableCell>
                          <TableCell className="text-center">
                            <span className={`px-4 py-1.5 rounded-full text-[12px] font-semibold tracking-wide ${phong.TrangThai === "Còn trống" ? "bg-[#00490E]/15 text-[#00490E]" : "bg-[#B91C1C]/15 text-[#B91C1C]"}`}>
                              {phong.TrangThai}
                            </span>
                          </TableCell>
                          <TableCell className="text-center px-6">
                            <Link to={`/ChiTietPhong/${phong.MaPhong}`} className="text-[14px] font-semibold text-[#047857] hover:underline">
                              Xem chi tiết
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {phongs.length > 0 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-[#BFCAba]/10 bg-white">
                  <span className="text-[14px] text-gray-500 font-medium">
                    Hiển thị {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, phongs.length)} trong số {phongs.length} phòng
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
