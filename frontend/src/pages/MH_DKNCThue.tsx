import { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Building2,
  Banknote,
  CalendarDays,
  Timer,
  Star,
  Users,
  Search,
  Plus,
  Trash2,
  Send,
  CreditCard,
  ChevronDown,
  Sofa,
} from "lucide-react";
import { toast } from "sonner";
import apiClient from "@/apiClient";

const inter = { fontFamily: "Inter, sans-serif" };

type Customer = { id: string; name: string; sdt: string };
type LoaiPhong = { MaLoai: string; TenLoai: string };
type TieuChi = { MaTieuChi: string; TenTieuChi: string };


function getInitials(name: string) {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "?";
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function FieldLabel({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <label
      className="flex items-center gap-1.5 mb-2 text-sm font-semibold text-slate-600"
      style={inter}
    >
      <span className="text-emerald-700">{icon}</span>
      {label}
    </label>
  );
}

const inputCls =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition placeholder:text-slate-400";

export const MH_DKNCThue = () => {
  const [tab, setTab] = useState<"ca-nhan" | "nhom">("ca-nhan");

  // Shared
  const [khuVuc, setKhuVuc] = useState("");
  const [hinhThucThue, setHinhThucThue] = useState("Thuê phòng");
  const [giaMin, setGiaMin] = useState("");
  const [giaMax, setGiaMax] = useState("");
  const [thoiDiemVao, setThoiDiemVao] = useState("");
  const [thoiHanThue, setThoiHanThue] = useState("");
  const [tieuChi, setTieuChi] = useState<string[]>([]);
  const [loaiPhong, setLoaiPhong] = useState("");
  const [dsLoaiPhong, setDsLoaiPhong] = useState<LoaiPhong[]>([]);
  const [dsTieuChi, setDsTieuChi] = useState<TieuChi[]>([]);

  // Cá nhân
  const [khachHang, setKhachHang] = useState("");
  const [selectedKHId, setSelectedKHId] = useState("");
  const [khachHangSuggestions, setKhachHangSuggestions] = useState<Customer[]>([]);

  // Nhóm
  const [members, setMembers] = useState<Customer[]>([]);
  const [representativeId, setRepresentativeId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Customer[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [showKHDropdown, setShowKHDropdown] = useState(false);
  const khachHangRef = useRef<HTMLDivElement>(null);
  const [searchTypeKH, setSearchTypeKH] = useState<"HoTen" | "MaKH" | "SDT">("HoTen");
  const [searchTypeNhom, setSearchTypeNhom] = useState<"HoTen" | "MaKH" | "SDT">("HoTen");

  // Load danh sách loại phòng và tiêu chí khi mount
  useEffect(() => {
    apiClient.get("/LoaiPhong/LayDSLoaiPhong")
      .then((r) => setDsLoaiPhong(r.data))
      .catch(console.error);
    apiClient.get("/TieuChi/LayDSTC")
      .then((r) => setDsTieuChi(r.data))
      .catch(console.error);
  }, []);

  // Debounce tìm kiếm khách hàng (cá nhân)
  useEffect(() => {
    if (!khachHang.trim()) { setKhachHangSuggestions([]); return; }
    const t = setTimeout(async () => {
      try {
        const res = await apiClient.get(`/KhachHang/LayDSKH?${searchTypeKH}=${encodeURIComponent(khachHang)}`);
        setKhachHangSuggestions(res.data.map((c: { MaKH: string; HoTen: string; SDT: string }) => ({ id: c.MaKH, name: c.HoTen, sdt: c.SDT })));
      } catch { setKhachHangSuggestions([]); }
    }, 300);
    return () => clearTimeout(t);
  }, [khachHang, searchTypeKH]);

  // Debounce tìm kiếm khách hàng (nhóm)
  useEffect(() => {
    if (!searchQuery.trim()) { setSuggestions([]); return; }
    const t = setTimeout(async () => {
      try {
        const res = await apiClient.get(`/KhachHang/LayDSKH?${searchTypeNhom}=${encodeURIComponent(searchQuery)}`);
        setSuggestions(
          res.data
            .map((c: { MaKH: string; HoTen: string; SDT: string }) => ({ id: c.MaKH, name: c.HoTen, sdt: c.SDT }))
            .filter((c: Customer) => !members.find((m) => m.id === c.id))
        );
      } catch { setSuggestions([]); }
    }, 300);
    return () => clearTimeout(t);
  }, [searchQuery, searchTypeNhom, members]);

  // Đóng dropdown khi click ngoài
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node))
        setShowDropdown(false);
      if (khachHangRef.current && !khachHangRef.current.contains(e.target as Node))
        setShowKHDropdown(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const btn_Them_click = (c: Customer) => {
    setMembers((prev) => {
      const next = [...prev, c];
      if (prev.length === 0) setRepresentativeId(c.id);
      return next;
    });
    setSearchQuery("");
    setShowDropdown(false);
  };

  const btn_XoaTV_click = (id: string) => {
    setMembers((prev) => {
      const next = prev.filter((m) => m.id !== id);
      if (representativeId === id && next.length > 0)
        setRepresentativeId(next[0].id);
      if (next.length === 0) setRepresentativeId("");
      return next;
    });
  };

  const toggleTieuChi = (maTieuChi: string) => {
    setTieuChi((prev) =>
      prev.includes(maTieuChi) ? prev.filter((t) => t !== maTieuChi) : [...prev, maTieuChi]
    );
  };

  const btn_DaiDien_click = (id: string) => setRepresentativeId(id);

  const btn_TaoYeuCauDK_click = async () => {
    try {
      const body = tab === "ca-nhan"
        ? {
          MaKH_DaiDien: selectedKHId,
          DanhSachKH: [selectedKHId],
          LoaiPhong: loaiPhong,
          SoNguoiDuKien: 1,
          HinhThucThue: hinhThucThue,
          GiaMin: Number(giaMin),
          GiaMax: Number(giaMax),
          ThoiDiemVao: thoiDiemVao,
          ThoiHanThue: Number(thoiHanThue),
          KhuVuc: khuVuc,
          TrangThai: "Chờ duyệt",
          TieuChi: tieuChi,
          LoaiDangKy: "ca-nhan",
        }
        : {
          MaKH_DaiDien: representativeId,
          DanhSachKH: members.map((m) => m.id),
          LoaiPhong: loaiPhong,
          SoNguoiDuKien: members.length,
          HinhThucThue: hinhThucThue,
          GiaMin: Number(giaMin),
          GiaMax: Number(giaMax),
          ThoiDiemVao: thoiDiemVao,
          ThoiHanThue: Number(thoiHanThue),
          KhuVuc: khuVuc,
          TrangThai: "Chờ duyệt",
          TieuChi: tieuChi,
          LoaiDangKy: "nhom",
        };

      const res = await apiClient.post("/NhuCauThue/ThemNCThue", body);
      if (res.status !== 201) throw new Error("Thêm thất bại");
      toast.success("Đăng ký nhu cầu thuê thành công!");
    } catch (error: any) {
      if (error.response?.status === 422 && Array.isArray(error.response?.data?.errors)) {
        error.response.data.errors.forEach((msg: string) => toast.error(msg));
      } else {
        toast.error("Đăng ký thất bại.");
      }
    }
  };


  const HienThi = () => (
    <div className="min-h-screen bg-slate-100 flex flex-col" style={inter}>
      {/* Header */}
      <div className="px-8 pt-7 pb-4">
        <h1 className="text-emerald-900 text-lg font-semibold" style={inter}>
          Đăng ký nhu cầu thuê
        </h1>
      </div>

      {/* Card */}
      <div className="mx-8 mb-8 bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col gap-6">
        <h2 className="text-xl font-bold text-slate-800" style={inter}>
          Thông tin đăng ký mới
        </h2>

        {/* Tab switcher */}
        <div className="flex bg-slate-100 rounded-full p-1 w-full">
          {(["ca-nhan", "nhom"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={[
                "flex-1 py-2.5 rounded-full text-sm font-semibold transition-all duration-200",
                tab === t
                  ? "bg-emerald-900 text-white shadow"
                  : "text-slate-500 hover:text-slate-700",
              ].join(" ")}
              style={inter}
            >
              {t === "ca-nhan" ? "Cá nhân" : "Nhóm"}
            </button>
          ))}
        </div>

        {/* ── Tab Cá nhân ── */}
        {tab === "ca-nhan" && (
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              {/* Khách hàng */}
              <div className="md:col-span-2">
                <FieldLabel icon={<CreditCard size={15} strokeWidth={2} />} label="Khách hàng" />
                <div className="relative" ref={khachHangRef}>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search
                        size={15}
                        strokeWidth={2}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                      <input
                        className={inputCls + " pl-9"}
                        style={inter}
                        placeholder={
                          searchTypeKH === "HoTen" ? "Nhập tên khách hàng..." :
                            searchTypeKH === "MaKH" ? "Nhập mã khách hàng..." :
                              "Nhập số điện thoại..."
                        }
                        value={khachHang}
                        onChange={(e) => { setKhachHang(e.target.value); setShowKHDropdown(true); }}
                        onFocus={() => khachHang.trim() && setShowKHDropdown(true)}
                      />
                    </div>
                    <div className="relative shrink-0">
                      <select
                        className="h-full rounded-2xl border border-slate-200 bg-slate-50 pl-3 pr-8 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 appearance-none cursor-pointer transition"
                        style={inter}
                        value={searchTypeKH}
                        onChange={(e) => {
                          setSearchTypeKH(e.target.value as "HoTen" | "MaKH" | "SDT");
                          setKhachHang("");
                          setKhachHangSuggestions([]);
                        }}
                      >
                        <option value="HoTen">Tìm theo tên</option>
                        <option value="MaKH">Tìm theo mã KH</option>
                        <option value="SDT">Tìm theo SDT</option>
                      </select>
                      <ChevronDown size={14} strokeWidth={2} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                  {showKHDropdown && khachHang.trim() && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
                      {khachHangSuggestions.length > 0 ? (
                        khachHangSuggestions.map((c) => (
                          <button
                            key={c.id}
                            onMouseDown={() => {
                              setSelectedKHId(c.id);
                              setKhachHang(`${c.id} - ${c.name} - ${c.sdt}`);
                              setShowKHDropdown(false);
                            }}
                            className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-center gap-2"
                            style={inter}
                          >
                            <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600 shrink-0">
                              {getInitials(c.name)}
                            </div>
                            {c.id} - {c.name} - {c.sdt}
                          </button>
                        ))
                      ) : (
                        <p className="px-4 py-3 text-sm text-slate-400 italic" style={inter}>
                          Không tìm thấy khách hàng
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Khu vực */}
              <div>
                <FieldLabel icon={<MapPin size={15} strokeWidth={2} />} label="Khu vực mong muốn" />
                <input
                  className={inputCls}
                  style={inter}
                  placeholder="Ví dụ: Quận 1, Quận Bình Thạnh..."
                  value={khuVuc}
                  onChange={(e) => setKhuVuc(e.target.value)}
                />
              </div>

              {/* Hình thức thuê */}
              <div>
                <FieldLabel icon={<Building2 size={15} strokeWidth={2} />} label="Hình thức thuê" />
                <div className="relative">
                  <select
                    className={inputCls + " appearance-none pr-10 cursor-pointer"}
                    style={inter}
                    value={hinhThucThue}
                    onChange={(e) => setHinhThucThue(e.target.value)}
                  >
                    <option>Thuê phòng</option>
                    <option>Thuê giường</option>
                  </select>
                  <ChevronDown
                    size={16}
                    strokeWidth={2}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Khoảng giá */}
              <div>
                <FieldLabel icon={<Banknote size={15} strokeWidth={2} />} label="Khoảng giá mong muốn" />
                <div className="flex items-center gap-2">
                  <input
                    className={inputCls}
                    style={inter}
                    type="number"
                    min={0}
                    placeholder="Từ"
                    value={giaMin}
                    onChange={(e) => setGiaMin(e.target.value)}
                  />
                  <span className="text-slate-400 shrink-0">—</span>
                  <input
                    className={inputCls}
                    style={inter}
                    type="number"
                    min={0}
                    placeholder="Đến"
                    value={giaMax}
                    onChange={(e) => setGiaMax(e.target.value)}
                  />
                </div>
              </div>

              {/* Loại phòng */}
              <div>
                <FieldLabel icon={<Sofa size={15} strokeWidth={2} />} label="Loại phòng" />
                <div className="relative">
                  <select
                    className={inputCls + " appearance-none pr-10 cursor-pointer"}
                    style={inter}
                    value={loaiPhong}
                    onChange={(e) => setLoaiPhong(e.target.value)}
                  >
                    <option value="">Chọn loại phòng</option>
                    {dsLoaiPhong.map((lp) => (
                      <option key={lp.MaLoai} value={lp.MaLoai}>{lp.TenLoai}</option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    strokeWidth={2}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Ngày vào ở + Thời hạn */}
              <div className="grid grid-cols-2 gap-3 md:col-span-2">
                <div>
                  <FieldLabel icon={<CalendarDays size={15} strokeWidth={2} />} label="Thời điểm vào ở" />
                  <input
                    className={inputCls}
                    style={inter}
                    type="date"
                    value={thoiDiemVao}
                    onChange={(e) => setThoiDiemVao(e.target.value)}
                  />
                </div>
                <div>
                  <FieldLabel icon={<Timer size={15} strokeWidth={2} />} label="Thời hạn thuê (tháng)" />
                  <input
                    className={inputCls}
                    style={inter}
                    type="number"
                    min={1}
                    placeholder="Ví dụ: 6"
                    value={thoiHanThue}
                    onChange={(e) => setThoiHanThue(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Tiêu chí */}
            <div>
              <FieldLabel icon={<Star size={15} strokeWidth={2} />} label="Tiêu chí ưu tiên" />
              <div className="flex flex-wrap gap-2 mt-1">
                {dsTieuChi.map(({ MaTieuChi, TenTieuChi }) => {
                  const active = tieuChi.includes(MaTieuChi);
                  return (
                    <button
                      key={MaTieuChi}
                      onClick={() => toggleTieuChi(MaTieuChi)}
                      className={[
                        "flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-150",
                        active
                          ? "bg-emerald-900 text-white border-emerald-900"
                          : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300",
                      ].join(" ")}
                      style={inter}
                    >
                      {TenTieuChi}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── Tab Nhóm ── */}
        {tab === "nhom" && (
          <div className="flex flex-col gap-5">
            {/* Label section */}
            <div>
              <p className="flex items-center gap-1.5 text-xs font-semibold tracking-widest text-slate-400 uppercase mb-3" style={inter}>
                <Users size={13} strokeWidth={2} />
                Danh sách thành viên nhóm
              </p>

              {/* Search row */}
              <div className="flex gap-2 mb-3" ref={searchRef}>
                <div className="relative flex-1">
                  <Search
                    size={15}
                    strokeWidth={2}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                  <input
                    className={inputCls + " pl-9"}
                    style={inter}
                    placeholder={
                      searchTypeNhom === "HoTen" ? "Nhập tên khách hàng..." :
                        searchTypeNhom === "MaKH" ? "Nhập mã khách hàng..." :
                          "Nhập số điện thoại..."
                    }
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setShowDropdown(true); }}
                    onFocus={() => searchQuery.trim() && setShowDropdown(true)}
                  />

                  {/* Dropdown suggestions */}
                  {showDropdown && searchQuery.trim() && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
                      {suggestions.length > 0 ? (
                        suggestions.map((c) => (
                          <button
                            key={c.id}
                            onMouseDown={() => btn_Them_click(c)}
                            className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-center gap-2"
                            style={inter}
                          >
                            <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600 shrink-0">
                              {getInitials(c.name)}
                            </div>
                            {c.id} - {c.name} - {c.sdt}
                          </button>
                        ))
                      ) : (
                        <p className="px-4 py-3 text-sm text-slate-400 italic" style={inter}>
                          Không tìm thấy khách hàng
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Combobox loại tìm kiếm nhóm */}
                <div className="relative shrink-0">
                  <select
                    className="h-full rounded-2xl border border-slate-200 bg-slate-50 pl-3 pr-8 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 appearance-none cursor-pointer transition"
                    style={inter}
                    value={searchTypeNhom}
                    onChange={(e) => {
                      setSearchTypeNhom(e.target.value as "HoTen" | "MaKH" | "SDT");
                      setSearchQuery("");
                      setSuggestions([]);
                    }}
                  >
                    <option value="HoTen">Tìm theo tên</option>
                    <option value="MaKH">Tìm theo mã KH</option>
                    <option value="SDT">Tìm theo SDT</option>
                  </select>
                  <ChevronDown size={14} strokeWidth={2} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                {/* Thêm button */}
                <button
                  onClick={() => {
                    const match = suggestions[0];
                    if (match) btn_Them_click(match);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-900 text-white text-sm font-semibold shrink-0 hover:bg-emerald-800 transition-colors"
                  style={inter}
                >
                  <Plus size={15} strokeWidth={2.5} />
                  Thêm
                </button>
              </div>

              {/* Member table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="w-20 px-4 py-2.5 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase" style={inter}>
                        Đại diện
                      </th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase" style={inter}>
                        Khách hàng
                      </th>
                      <th className="w-12" />
                    </tr>
                  </thead>
                  <tbody>
                    {members.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-4 py-6 text-center text-sm text-slate-400 italic" style={inter}>
                          Chưa có thành viên. Tìm kiếm và thêm khách hàng bên trên.
                        </td>
                      </tr>
                    ) : (
                      members.map((m, idx) => (
                        <tr
                          key={m.id}
                          className={idx < members.length - 1 ? "border-b border-slate-100" : ""}
                        >
                          <td className="px-4 py-3 text-center">
                            <input
                              type="radio"
                              name="representative"
                              checked={representativeId === m.id}
                              onChange={() => btn_DaiDien_click(m.id)}
                              className="w-4 h-4 accent-emerald-900 cursor-pointer"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600 shrink-0">
                                {getInitials(m.name)}
                              </div>
                              <span className="text-sm text-slate-700" style={inter}>
                                {m.id} - {m.name} - {m.sdt}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 py-3">
                            <button
                              onClick={() => btn_XoaTV_click(m.id)}
                              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={14} strokeWidth={2} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              {/* Khu vực */}
              <div>
                <FieldLabel icon={<MapPin size={15} strokeWidth={2} />} label="Khu vực mong muốn" />
                <input
                  className={inputCls}
                  style={inter}
                  placeholder="Ví dụ: Quận 1, Quận Bình Thạnh..."
                  value={khuVuc}
                  onChange={(e) => setKhuVuc(e.target.value)}
                />
              </div>

              {/* Hình thức thuê */}
              <div>
                <FieldLabel icon={<Building2 size={15} strokeWidth={2} />} label="Hình thức thuê" />
                <div className="relative">
                  <select
                    className={inputCls + " appearance-none pr-10 cursor-pointer"}
                    style={inter}
                    value={hinhThucThue}
                    onChange={(e) => setHinhThucThue(e.target.value)}
                  >
                    <option>Thuê phòng</option>
                    <option>Thuê giường</option>
                  </select>
                  <ChevronDown
                    size={16}
                    strokeWidth={2}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Khoảng giá */}
              <div>
                <FieldLabel icon={<Banknote size={15} strokeWidth={2} />} label="Khoảng giá mong muốn" />
                <div className="flex items-center gap-2">
                  <input
                    className={inputCls}
                    style={inter}
                    type="number"
                    min={0}
                    placeholder="Từ"
                    value={giaMin}
                    onChange={(e) => setGiaMin(e.target.value)}
                  />
                  <span className="text-slate-400 shrink-0">—</span>
                  <input
                    className={inputCls}
                    style={inter}
                    type="number"
                    min={0}
                    placeholder="Đến"
                    value={giaMax}
                    onChange={(e) => setGiaMax(e.target.value)}
                  />
                </div>
              </div>

              {/* Loại phòng */}
              <div>
                <FieldLabel icon={<Sofa size={15} strokeWidth={2} />} label="Loại phòng" />
                <div className="relative">
                  <select
                    className={inputCls + " appearance-none pr-10 cursor-pointer"}
                    style={inter}
                    value={loaiPhong}
                    onChange={(e) => setLoaiPhong(e.target.value)}
                  >
                    <option value="">Chọn loại phòng</option>
                    {dsLoaiPhong.map((lp) => (
                      <option key={lp.MaLoai} value={lp.MaLoai}>{lp.TenLoai}</option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    strokeWidth={2}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Ngày + thời hạn */}
              <div className="grid grid-cols-2 gap-3 md:col-span-2">
                <div>
                  <FieldLabel icon={<CalendarDays size={15} strokeWidth={2} />} label="Thời điểm vào ở" />
                  <input
                    className={inputCls}
                    style={inter}
                    type="date"
                    value={thoiDiemVao}
                    onChange={(e) => setThoiDiemVao(e.target.value)}
                  />
                </div>
                <div>
                  <FieldLabel icon={<Timer size={15} strokeWidth={2} />} label="Thời hạn thuê (tháng)" />
                  <input
                    className={inputCls}
                    style={inter}
                    type="number"
                    min={1}
                    placeholder="Ví dụ: 6"
                    value={thoiHanThue}
                    onChange={(e) => setThoiHanThue(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Tiêu chí ưu tiên */}
            <div>
              <FieldLabel icon={<Star size={15} strokeWidth={2} />} label="Tiêu chí ưu tiên" />
              <div className="flex flex-wrap gap-2 mt-1">
                {dsTieuChi.map(({ MaTieuChi, TenTieuChi }) => {
                  const active = tieuChi.includes(MaTieuChi);
                  return (
                    <button
                      key={MaTieuChi}
                      onClick={() => toggleTieuChi(MaTieuChi)}
                      className={[
                        "flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-150",
                        active
                          ? "bg-emerald-900 text-white border-emerald-900"
                          : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300",
                      ].join(" ")}
                      style={inter}
                    >
                      {TenTieuChi}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-slate-100" />

        {/* Submit */}
        <button
          onClick={btn_TaoYeuCauDK_click}
          className="w-full flex items-center justify-center gap-2 bg-emerald-900 hover:bg-emerald-800 active:scale-[0.99] text-white text-base font-semibold py-4 rounded-2xl transition-all duration-150 shadow-sm"
          style={inter}
        >
          Tạo yêu cầu đăng ký
          <Send size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  );

  return HienThi();
};
