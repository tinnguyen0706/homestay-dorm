import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";
import apiClient from "@/apiClient";

interface AuthUser {
  username: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get("/TaiKhoanNV/KiemTraDangNhap")
      .then((res) => setUser({ username: res.data.username }))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const login = (username: string) => setUser({ username });

  const logout = () => {
    setUser(null);
    navigate("/");
    apiClient.post("/TaiKhoanNV/DangXuat").catch(() => {});
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth phải được dùng trong AuthProvider");
  return ctx;
};
