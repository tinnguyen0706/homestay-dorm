import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import apiClient from "../apiClient.ts";

interface IDetailNCT {
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
  TieuChi: Array<{ MaTieuChi: string; TenTieuChi: string }>;
  TenKhachHang: string;
  TenLoaiPhong: string;
}

interface NCTDetailModalProps {
  MaNCT: string | null;
  open: boolean;
  onClose: () => void;
}

export function NCTDetailModal({ MaNCT, open, onClose }: NCTDetailModalProps) {
  const [data, setData] = useState<IDetailNCT | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && MaNCT) {
      const fetchDetail = async () => {
        try {
          setLoading(true);
          const res = await apiClient.get(`/NhuCauThue/${MaNCT}`);
          if (res.data.success) {
            setData(res.data.data);
          }
        } catch (err) {
          console.error("Lỗi khi lấy chi tiết:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchDetail();
    } else {
      setData(null);
    }
  }, [open, MaNCT]);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {/* Header */}
      <DialogContent className="sm:max-w-180 p-0 bg-white border-none shadow-2xl rounded-[24px] overflow-hidden [&>button.absolute]:hidden">
        <div className="flex items-center justify-between px-8 py-6">
          <DialogTitle className="text-[#181C22] font-manrope text-[22px] font-extrabold">
            Chi tiết nhu cầu thuê
          </DialogTitle>
          <DialogClose className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </DialogClose>
        </div>

        {loading ? (
          <div className="p-20 text-center text-gray-500 font-medium">
            Đang tải chi tiết...
          </div>
        ) : data ? (
          <div className="px-8 pb-8 flex flex-col gap-8">
            {/* Grid Thông tin */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              <InfoItem label="MÃ NHU CẦU THUÊ" value={data.MaNCT} />
              <InfoItem
                label="KHÁCH HÀNG ĐẠI DIỆN"
                value={data.TenKhachHang || "N/A"}
              />
              <InfoItem
                label="MÃ NHÓM THUÊ"
                value={data.NhomThue.MaNhomThue || "GRP_A1"}
              />
              <InfoItem
                label="LOẠI PHÒNG"
                value={data.TenLoaiPhong || "Phòng Studio"}
              />
              <InfoItem
                label="SỐ NGƯỜI"
                value={
                  data.SoNguoiDuKien < 10
                    ? `0${data.SoNguoiDuKien}`
                    : data.SoNguoiDuKien
                }
              />
              <InfoItem label="HÌNH THỨC THUÊ" value={data.HinhThucThue} />

              <InfoItem
                label="GIÁ TỐI THIỂU"
                value={`${(data.GiaMin / 1000000).toFixed(1)} Tr`}
                valueClassName="text-[#181C22]"
              />
              <InfoItem
                label="GIÁ TỐI ĐA"
                value={`${(data.GiaMax / 1000000).toFixed(1)} Tr`}
                valueClassName="text-[#181C22]"
              />

              <InfoItem
                label="THỜI ĐIỂM VÀO"
                value={new Date(data.ThoiDiemVao).toLocaleDateString("vi-VN")}
              />
              <InfoItem
                label="THỜI HẠN THUÊ"
                value={`${data.ThoiHanThue} tháng`}
              />
              <InfoItem label="KHU VỰC" value={data.KhuVuc || "N/A"} />

              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  TRẠNG THÁI
                </span>
                <div>
                  <Badge className="bg-[#E8F5E9] text-[#0D631B] border-none px-4 py-1 rounded-full font-bold text-[12px]">
                    {data.TrangThai}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Tiêu chí */}
            <div className="flex flex-col gap-4">
              <span className="text-[13px] font-bold text-[#181C22] uppercase tracking-wide">
                Tiêu chí
              </span>
              <div className="flex flex-wrap gap-2">
                {data.TieuChi && data.TieuChi.length > 0 ? (
                  data.TieuChi.map((tc) => (
                    <div
                      key={tc.MaTieuChi}
                      className="px-5 py-2.5 bg-[#F1F3FC] text-[#40493D] rounded-[12px] text-[14px] font-medium transition-colors hover:bg-gray-200 cursor-default"
                    >
                      {tc.TenTieuChi}
                    </div>
                  ))
                ) : (
                  <div className="px-5 py-2.5 bg-[#F1F3FC] text-[#40493D] rounded-[12px] text-[14px] font-medium cursor-default">
                    Không có tiêu chí
                  </div>
                )}
              </div>
            </div>

            {/* Footer Nút Đóng */}
            <div className="flex justify-end mt-2">
              <Button
                onClick={onClose}
                className="bg-[#0D631B] hover:bg-[#0D631B]/90 text-white px-10 h-12 rounded-[12px] font-bold text-[16px] transition-all"
              >
                Đóng
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-20 text-center text-red-500">
            Không tìm thấy dữ liệu.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function InfoItem({
  label,
  value,
  valueClassName = "",
}: {
  label: string;
  value: any;
  valueClassName?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
        {label}
      </span>
      <span
        className={`text-[16px] font-bold text-[#181C22] font-manrope ${valueClassName}`}
      >
        {value}
      </span>
    </div>
  );
}
