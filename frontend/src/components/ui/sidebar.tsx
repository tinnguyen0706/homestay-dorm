import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  LayoutGrid,
  Users,
  List,
  UserPlus,
  BookOpen,
  CalendarDays,
  Banknote,
  Receipt,
  Building2,
  CircleUserRound,
  Menu,
  X,
  KeyRound,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export type SidebarMenuItem = {
  icon: React.ReactNode;
  label: string;
  path: string;
};

interface SidebarProps {
  menuItems?: SidebarMenuItem[];
}

const defaultMenuItems: SidebarMenuItem[] = [
  { icon: <LayoutGrid size={16} strokeWidth={2.5} />, label: "Danh sách phòng", path: "/DSPhong" },
  { icon: <Users size={16} strokeWidth={2.5} />, label: "Danh sách khách hàng", path: "/DSKH" },
  { icon: <List size={16} strokeWidth={2.5} />, label: "Danh sách nhu cầu thuê", path: "/DSNhuCauThue" },
  { icon: <UserPlus size={16} strokeWidth={2.5} />, label: "Tạo khách hàng", path: "/TaoKH" },
  { icon: <BookOpen size={16} strokeWidth={2.5} />, label: "Đăng ký nhu cầu thuê", path: "/DKNCThue" },
  { icon: <CalendarDays size={16} strokeWidth={2.5} />, label: "Sắp xếp lịch hẹn", path: "/DSPhong" },
  { icon: <Banknote size={16} strokeWidth={2.5} />, label: "Đặt cọc", path: "/DSPhong" },
  { icon: <Receipt size={16} strokeWidth={2.5} />, label: "Thanh toán", path: "/DSPhong" },
  { icon: <KeyRound size={16} strokeWidth={2.5} />, label: "Trả phòng", path: "/DSPhong" },
];

const inter = { fontFamily: "Inter, sans-serif" };
const manrope = { fontFamily: "Manrope, sans-serif" };

export const Sidebar = ({
  menuItems = defaultMenuItems,
}: SidebarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const username = user?.username ?? "";

  const defaultActive =
    menuItems.find((item) => item.path === pathname)?.label ??
    menuItems[0]?.label ??
    "";

  const [activeLabel, setActiveLabel] = useState(defaultActive);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleNavigate = (item: SidebarMenuItem) => {
    if (navigating) return;
    setActiveLabel(item.label);
    setNavigating(true);
    setTimeout(() => {
      navigate(item.path);
      setMobileOpen(false);
      setNavigating(false);
    }, 160);
  };

  const NavItem = ({ item, collapsed }: { item: SidebarMenuItem; collapsed: boolean }) => {
    const active = activeLabel === item.label;
    return (
      <button
        title={collapsed ? item.label : undefined}
        onClick={() => handleNavigate(item)}
        className={[
          "group flex items-center gap-3 w-full text-left transition-all duration-200 outline-none",
          collapsed
            ? "justify-center w-12 h-12 rounded-xl"
            : "px-4 py-3 rounded-2xl",
          active
            ? "bg-white shadow-[0_2px_12px_0_rgba(0,0,0,0.10)] scale-[1.02]"
            : "hover:bg-slate-100 active:scale-95",
        ].join(" ")}
      >
        <span className={["shrink-0 transition-colors duration-200", active ? "text-emerald-700" : "text-slate-600 group-hover:text-slate-700"].join(" ")}>
          {item.icon}
        </span>
        {!collapsed && (
          <span
            className={["text-sm font-semibold leading-6 transition-colors duration-200", active ? "text-emerald-700" : "text-slate-600 group-hover:text-slate-700"].join(" ")}
            style={{ ...inter, fontWeight: 600 }}
          >
            {item.label}
          </span>
        )}
      </button>
    );
  };

  const UserMenu = ({ collapsed }: { collapsed: boolean }) => (
    <div
      className={[
        "relative w-full border-t border-slate-200 flex items-center gap-3 pt-4 pb-3 shrink-0",
        collapsed ? "justify-center px-0" : "px-4",
      ].join(" ")}
    >
      <button
        onClick={() => setShowUserMenu((v) => !v)}
        className="shrink-0 text-slate-500 hover:text-emerald-700 transition-colors"
      >
        <CircleUserRound size={32} strokeWidth={2} />
      </button>
      {!collapsed && (
        <span className="text-zinc-800 text-sm font-semibold leading-5 truncate flex-1" style={inter}>
          {username}
        </span>
      )}
      {showUserMenu && (
        <div className="absolute bottom-full left-0 mb-2 w-44 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
          <button
            onClick={() => { setShowUserMenu(false); logout(); }}
            className="w-full flex items-center gap-2.5 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
            style={inter}
          >
            <LogOut size={15} strokeWidth={2.5} />
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );

  const SidebarContent = ({ collapsed }: { collapsed: boolean }) => (
    <div
      className={[
        "h-full flex flex-col justify-between bg-slate-50 transition-all duration-300",
        collapsed ? "w-16 items-center" : "w-64 items-start",
      ].join(" ")}
    >
      {/* Logo */}
      <div className={["flex items-center gap-3 py-5 shrink-0", collapsed ? "justify-center px-0" : "px-4"].join(" ")}>
        <div className="w-10 h-10 bg-green-900 rounded-xl flex justify-center items-center shrink-0">
          <Building2 size={22} strokeWidth={2.5} color="white" />
        </div>
        {!collapsed && (
          <span className="text-emerald-900 text-lg font-extrabold leading-7 whitespace-nowrap" style={manrope}>
            HomeStay Dorm
          </span>
        )}
      </div>

      {/* Menu */}
      <div className={["flex-1 flex flex-col justify-start gap-1 w-full overflow-y-auto", collapsed ? "items-center px-1" : "items-stretch px-2"].join(" ")}>
        {menuItems.map((item) => (
          <NavItem key={item.label} item={item} collapsed={collapsed} />
        ))}
      </div>

      <UserMenu collapsed={collapsed} />
    </div>
  );

  return (
    <>
      {/* Backdrop đóng user menu khi click ra ngoài */}
      {showUserMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
      )}

      {/* Desktop lg+: full | md–lg: icon-only */}
      <aside className="hidden md:flex h-screen border-r border-slate-200 shrink-0">
        <div className="lg:hidden h-full">
          <SidebarContent collapsed={true} />
        </div>
        <div className="hidden lg:block h-full">
          <SidebarContent collapsed={false} />
        </div>
      </aside>

      {/* Mobile: hamburger + drawer */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md text-slate-600"
          aria-label="Mở menu"
        >
          <Menu size={22} />
        </button>

        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <div
          className={[
            "fixed top-0 left-0 z-50 h-full shadow-xl transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
        >
          <div className="relative h-full">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 z-10"
              aria-label="Đóng menu"
            >
              <X size={20} />
            </button>
            <SidebarContent collapsed={false} />
          </div>
        </div>
      </div>
    </>
  );
};
