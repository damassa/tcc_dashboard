import { Link, useLocation } from "react-router-dom";
import { clsx } from "clsx";
import { Film, FolderGit2, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { pathname } = useLocation();
  const { logout } = useAuth();

  const nav = [
    { to: "/series", label: "Séries", icon: Film },
    { to: "/categories", label: "Categorias", icon: FolderGit2 },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto bg-black text-white hidden md:block">
      <div className="flex items-center justify-center h-16 border-b border-white/10">
        <span className="text-xl font-bold">Admin Toku</span>
      </div>
      <nav className="p-4 space-y-2">
        {nav.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={clsx(
              "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-primary-600/20",
              pathname.startsWith(to) && "bg-primary-600/40"
            )}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <button
        onClick={logout}
        className="absolute bottom-4 left-4 flex items-center gap-2 text-sm text-white/80 hover:text-white"
      >
        <LogOut className="w-4 h-4" /> Sair
      </button>
    </aside>
  );
}