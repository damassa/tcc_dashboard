import React, { useState } from "react";
import { LogOut, PlusCircle, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LogoImage from "../assets/images/logo.png";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <nav
      className="bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-md px-6 py-4 z-50 relative"
      aria-label="Menu"
      role="button"
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 text-purple-500 font-bold text-xl tracking-wide">
          <Link to="/">
            <img src={LogoImage} className="w-8 h-8" />
          </Link>
          <span>Toku Dashboard</span>
        </div>

        {/* Botão mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-purple-400 transition"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Itens do menu (desktop) */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <Link
            to="/addSerie"
            className="flex items-center gap-2 hover:text-purple-400 transition cursor-pointer"
          >
            <PlusCircle className="w-5 h-5" />
            Nova Série
          </Link>

          <Link
            to="/addCategory"
            className="flex items-center gap-2 hover:text-purple-400 transition cursor-pointer"
          >
            <PlusCircle className="w-5 h-5" />
            Nova Categoria
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Menu mobile agrupado */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-zinc-900 rounded-lg p-4 shadow-inner flex flex-col gap-4 text-sm font-medium animate-fade-in-down">
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className="flex items-center gap-2 hover:text-purple-400 transition"
          >
            <PlusCircle className="w-5 h-5" />
            Nova Série
          </button>

          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className="flex items-center gap-2 hover:text-purple-400 transition"
          >
            <PlusCircle className="w-5 h-5" />
            Nova Categoria
          </button>

          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
