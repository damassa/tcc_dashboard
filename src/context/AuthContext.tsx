import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api, setAuthToken } from "../api";

interface User {
  id: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("jwt");
    const storedUser = sessionStorage.getItem("user");
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setAuthToken(storedToken);
      } catch (e) {
        console.error("Erro ao fazer parse do usuário:", storedUser);
        sessionStorage.removeItem("user"); // remove inválido para não quebrar de novo
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await api.post(
        "/api/v1/login",
        { email, senha: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token: t, user: u } = res.data;
      setToken(t);
      setUser(u);
      sessionStorage.setItem("jwt", t);
      setAuthToken(t);

      sessionStorage.setItem("user", JSON.stringify(u)); // ← corrigido
    } catch (err: any) {
      console.error("Erro ao fazer login", err.response?.data || err.message);
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("user");
    setAuthToken();
  }, []);

  const value = useMemo(
    () => ({ user, token, login, logout, loading }),
    [user, token, login, logout, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
