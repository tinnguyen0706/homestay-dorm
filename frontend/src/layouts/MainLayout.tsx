import { Outlet } from "react-router";
import { Sidebar } from "@/components/ui/sidebar";

export const MainLayout = () => (
  <div className="flex h-screen bg-[#F9F9FF]">
    <Sidebar />
    <main className="flex-1 min-w-0 overflow-auto bg-[#F9F9FF] animate-page-enter">
      <Outlet />
    </main>
  </div>
);
