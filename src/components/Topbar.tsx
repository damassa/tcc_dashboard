import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Topbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-20 flex items-center justify-between bg-black/60 backdrop-blur w-full h-14 px-4 md:hidden">
        <button onClick={() => setOpen(!open)} aria-label="toggle sidebar">
          <Menu className="w-6 h-6 text-white" />
        </button>
        <Link to="/series" className="text-white font-bold tracking-wide">
          Admin Toku
        </Link>
        <span />
      </header>
      {open && (
        <div
          className="fixed inset-0 z-40 flex md:hidden"
          onClick={() => setOpen(false)}
        >
          <Sidebar />
          <div className="flex-1 bg-black/70" />
        </div>
      )}
    </>
  );
}