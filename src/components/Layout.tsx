import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Topbar />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}