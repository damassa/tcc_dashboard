import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const { token, loading } = useAuth();

  if (loading) {
    return <div className="text-white text-center p-8">Carregando...</div>;
  }

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};
