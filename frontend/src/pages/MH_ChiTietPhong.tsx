import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import apiClient from "../apiClient.ts";
import {
  ArrowLeft,
  MapPin,
  CheckCircle,
  Wifi,
  Wind,
  Waves,
  Dumbbell,
  BedDouble,
  Lamp,
  Box,
  Users,
  User,
  ConciergeBell,
  Banknote,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const MH_ChiTietPhong = () => {
  const { id } = useParams();
  const [phong, setPhong] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhong = async () => {
      try {
        const res = await apiClient.get(`/api/phong/${id}`);
        setPhong(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPhong();
  }, [id]);

  if (loading)
    return <div className="p-8 text-center">Đang tải thông tin phòng...</div>;
  if (!phong)
    return (
      <div className="p-8 text-center text-red-500">Không tìm thấy phòng</div>
    );

  const formatGiaThueMoiGiuong = (giaThue?: number) => {
    if (!giaThue || Number.isNaN(giaThue)) return "Chưa cập nhật";
    if (giaThue >= 1_000_000) {
      const trieu = giaThue / 1_000_000;
      const formatted = Number.isInteger(trieu)
        ? trieu.toString()
        : trieu.toFixed(1);
      return `${formatted} triệu/tháng`;
    }
    return `${giaThue.toLocaleString("vi-VN")} đ/tháng`;
  };

  return (
    <div className="p-8 flex flex-col gap-8 max-w-6xl mx-auto bg-[#F9F9FF] min-h-screen">
      <div className="flex items-center gap-4 pb-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full shadow-sm"
          asChild
        >
          <Link to="/DSPhong">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
        </Button>
        <h1 className="text-[20px] font-bold text-[#181C22]">Chi tiết phòng</h1>
      </div>

      <div className="grid grid-cols-1 gap-8 items-start lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)] lg:items-stretch">
        <div className="flex flex-col gap-8 lg:col-span-1 lg:h-full">
          <div className="flex flex-col gap-4">
            <div className="flex items-end gap-3">
              <h2 className="text-[36px] font-extrabold text-[#0D631B] leading-none">
                {phong.TenPhong}
              </h2>
              <span className="text-[20px] font-semibold text-[#40493D] leading-none pb-1">
                (Mã: {phong.MaPhong})
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-[#0D631B]/10 px-4 py-1.5 rounded-full">
                <Users className="w-4 h-4 text-[#0D631B]" />
                <span className="text-[12px] font-semibold text-[#0D631B]">
                  Sức chứa:{" "}
                  {phong.SucChuaToiDa < 10
                    ? `0${phong.SucChuaToiDa}`
                    : phong.SucChuaToiDa}{" "}
                  Người
                </span>
              </div>
              <div className="flex items-center gap-2 bg-[#EBEDF7] px-4 py-1.5 rounded-full">
                <User className="w-4 h-4 text-[#40493D]" />
                <span className="text-[12px] font-semibold text-[#40493D]">
                  Giới tính: {phong.GioiTinhChoPhep}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-[#EBEDF7] px-4 py-1.5 rounded-full">
                <BedDouble className="w-4 h-4 text-[#40493D]" />
                <span className="text-[12px] font-semibold text-[#40493D]">
                  Loại phòng: {phong.LoaiPhong}
                </span>
              </div>
            </div>
          </div>

          <Card className="rounded-[16px] shadow-sm border border-[#BFCAba]/30 bg-white overflow-hidden lg:flex lg:flex-col lg:flex-1">
            <CardHeader className="flex flex-row items-center justify-between bg-white border-b px-8 py-6">
              <div className="flex flex-col gap-1">
                <CardTitle className="text-[20px] font-bold text-[#181C22]">
                  Sơ đồ giường
                </CardTitle>
                <p className="text-[12px] text-[#40493D]">
                  Trạng thái thời gian thực
                </p>
              </div>
              <div className="flex items-center gap-4 bg-[#F1F3FC] px-4 py-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]"></div>
                  <span className="text-[12px] font-bold text-[#181C22]">
                    Trống
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]"></div>
                  <span className="text-[12px] font-bold text-[#181C22]">
                    Đã cọc
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></div>
                  <span className="text-[12px] font-bold text-[#181C22]">
                    Đã thuê
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 lg:flex-1">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                {phong.Giuong?.map((g: any, index: number) => {
                  let bgColor = "bg-[#F1F5F9]/80 border-[#E2E8F0]";
                  let textColor = "text-[#475569]";
                  let shadow = "";

                  if (g.TrangThai === "Đã thuê") {
                    bgColor = "bg-white border-red-100";
                    textColor = "text-red-500";
                    shadow =
                      "shadow-[0_4px_6px_-4px_rgba(254,202,202,0.5),0_10px_15px_-3px_rgba(254,202,202,0.5)]";
                  }
                  if (g.TrangThai === "Đã cọc") {
                    bgColor = "bg-white border-yellow-100";
                    textColor = "text-yellow-600";
                    shadow =
                      "shadow-[0_4px_6px_-4px_rgba(253,230,138,0.5),0_10px_15px_-3px_rgba(253,230,138,0.5)]";
                  }

                  return (
                    <div
                      key={index}
                      className={`border rounded-[16px] h-25 flex flex-col items-center justify-center gap-3 transition-all ${bgColor} ${shadow}`}
                    >
                      <span className={`font-bold text-[18px] ${textColor}`}>
                        {g.MaTaiSan?.replace("TS00", "B") || `B${index + 1}`}
                      </span>
                    </div>
                  );
                })}

                {(!phong.Giuong || phong.Giuong.length === 0) &&
                  Array.from({ length: phong.SucChuaToiDa }).map((_, i) => (
                    <div
                      key={i}
                      className="border rounded-[16px] h-25 flex flex-col items-center justify-center gap-3 bg-[#F1F5F9]/80 border-[#E2E8F0]"
                    >
                      <span className="font-bold text-[18px] text-[#475569]">
                        B{i + 1}
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-8 lg:h-full">
          <Card className="rounded-[28px] shadow-sm border border-[#DDE1EB] overflow-hidden bg-white">
            <CardHeader className="pt-8 pb-3 px-10">
              <CardTitle
                className="text-[20px] text-[#1F2937] flex items-center gap-3 font-extrabold"
                style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
              >
                <MapPin className="w-6 h-6 text-emerald-700" />
                {phong.TenChiNhanh}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-10 pb-8 pt-1">
              <p className="text-[12px] tracking-[0.18em] text-[#4B5563] font-bold uppercase mb-2">
                Địa chỉ
              </p>
              <p
                className="text-[14px] leading-normal text-[#1F2937] font-medium"
                style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
              >
                {phong.DiaChi || "Chưa cập nhật địa chỉ"}
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] shadow-sm border border-[#E5E7EB] overflow-hidden bg-white">
            <CardHeader className="pt-8 pb-3 px-10">
              <CardTitle
                className="text-[20px] text-[#1F2937] flex items-center gap-3 font-extrabold"
                style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
              >
                <Banknote className="w-5 h-5 text-emerald-700" />
                <span className="font-inter">Giá thuê mỗi giường</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-10 pb-9 pt-0">
              <p
                className="text-[24px] font-bold text-[#111827] leading-tight"
                style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
              >
                {formatGiaThueMoiGiuong(phong.GiaThue)}
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] shadow-sm border border-[#E5E7EB] bg-white">
            <CardHeader className="pt-8 pb-2 px-10">
              <CardTitle
                className="text-[20px] text-[#1F2937] flex items-center gap-3 font-extrabold"
                style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
              >
                <CheckCircle className="w-6 h-6 text-emerald-700" />
                Tiêu chí phòng
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 px-10 pb-10 pt-3">
              {phong.TieuChi && phong.TieuChi.length > 0 ? (
                phong.TieuChi.map((tc: any) => (
                  <div
                    key={tc.MaTieuChi}
                    className="flex items-center gap-3 text-[#1F2937]"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-700" />
                    <span
                      className="text-[14px] font-medium"
                      style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
                    >
                      {tc.TenTieuChi}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-[14px] text-gray-500 italic">
                  Chưa có tiêu chí nào
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
        <Card className="rounded-[16px] shadow-sm border border-[#BFCAba]/30 overflow-hidden bg-white">
          <CardHeader className="px-8 pt-8 pb-4 flex flex-row items-center gap-3">
            <Box className="w-6 h-6 text-[#0D631B]" />
            <CardTitle className="text-[20px] font-bold text-[#0D631B]">
              Tài sản trong phòng
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="grid grid-cols-2 gap-4">
              {phong.TaiSan && phong.TaiSan.length > 0 ? (
                phong.TaiSan.map((ts: any) => {
                  let Icon = Box;
                  if (ts.TenTaiSan.toLowerCase().includes("đèn")) Icon = Lamp;
                  if (ts.TenTaiSan.toLowerCase().includes("giường"))
                    Icon = BedDouble;
                  return (
                    <div
                      key={ts.MaTaiSan}
                      className="flex items-center gap-3 bg-white border border-[#BFCAba]/30 px-5 py-4 rounded-[16px] shadow-sm"
                    >
                      <Icon className="w-5 h-5 text-[#181C22]" />
                      <span className="text-[14px] text-[#181C22] font-semibold">
                        {ts.TenTaiSan}
                      </span>
                    </div>
                  );
                })
              ) : (
                <span className="text-[14px] text-gray-500 italic col-span-2">
                  Chưa có tài sản được ghi nhận
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[16px] shadow-sm border border-[#BFCAba]/30 overflow-hidden bg-white">
          <CardHeader className="px-8 pt-8 pb-4 flex flex-row items-center gap-3">
            <ConciergeBell className="w-6 h-6 text-[#0D631B]" />
            <CardTitle className="text-[20px] font-bold text-[#0D631B]">
              Dịch vụ tại chi nhánh
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="flex flex-wrap gap-3">
              {phong.DichVu && phong.DichVu.length > 0 ? (
                phong.DichVu.map((dv: any) => {
                  let Icon = CheckCircle;
                  if (dv.TenDV.toLowerCase().includes("wifi")) Icon = Wifi;
                  if (
                    dv.TenDV.toLowerCase().includes("máy lạnh") ||
                    dv.TenDV.toLowerCase().includes("điều hòa")
                  )
                    Icon = Wind;
                  if (dv.TenDV.toLowerCase().includes("giặt")) Icon = Waves;
                  if (dv.TenDV.toLowerCase().includes("gym")) Icon = Dumbbell;
                  return (
                    <div
                      key={dv.MaDV}
                      className="flex items-center gap-2 bg-[#F1F3FC] px-5 py-3 rounded-[16px]"
                    >
                      <Icon className="w-5 h-5 text-[#181C22]" />
                      <span className="text-[14px] text-[#181C22] font-semibold">
                        {dv.TenDV}
                      </span>
                    </div>
                  );
                })
              ) : (
                <span className="text-[14px] text-gray-500 italic">
                  Chưa có dịch vụ
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
