import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router";
import { MH_DangNhap } from "./pages/MH_DangNhap.tsx";
import { NotFound } from "./pages/NotFound.tsx";
import { MH_DSPhong } from "./pages/MH_DSPhong.tsx";

function App() {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MH_DangNhap />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/DSPhong" element={<MH_DSPhong />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
