import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router";
import { MH_DangNhap } from "./pages/MH_DangNhap.tsx";
import { NotFound } from "./pages/NotFound.tsx";
import { MH_DSPhong } from "./pages/MH_DSPhong.tsx";
import { MH_DKNCThue } from "./pages/MH_DKNCThue.tsx";
import { MH_DSNhuCauThue } from "./pages/MH_DSNhuCauThue.tsx";
import { MH_DSKH } from "./pages/MH_DSKH.tsx";
import { MH_TaoKH } from "./pages/MH_TaoKH.tsx";
import { MainLayout } from "./layouts/MainLayout.tsx";

function App() {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MH_DangNhap />} />
          <Route element={<MainLayout />}>
            <Route path="/DSPhong"      element={<MH_DSPhong />} />
            <Route path="/DSKH"         element={<MH_DSKH />} />
            <Route path="/TaoKH"        element={<MH_TaoKH />} />
            <Route path="/DKNCThue"     element={<MH_DKNCThue />} />
            <Route path="/DSNhuCauThue" element={<MH_DSNhuCauThue />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
