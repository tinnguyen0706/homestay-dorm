import { Outlet } from "react-router";
import { Sidebar } from "@/components/ui/sidebar";

export const MainLayout = () => (
  <div className="flex h-screen">
    <Sidebar />
    <main className="flex-1 overflow-auto animate-page-enter">
      <Outlet />
    </main>
  </div>
);
