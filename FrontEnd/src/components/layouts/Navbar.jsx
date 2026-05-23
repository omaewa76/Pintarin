import { Bell, Search } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import getInitials from "../../utils/getInitials";

export default function Navbar({ role = "dinas" }) {
  const { user } = useAuth();

  /* ================= ROLE CONFIG ================= */

  const roleConfig = {
    dinas: {
      label: "Dinas Pendidikan Kota Bandung",
      avatarBg: "bg-blue-100",
      avatarText: "text-blue-700",
    },

    school: {
      label: user?.name || "Sekolah",
      avatarBg: "bg-emerald-100",
      avatarText: "text-emerald-700",
    },

    csr: {
      label: user?.name || "CSR Company",
      avatarBg: "bg-orange-100",
      avatarText: "text-orange-700",
    },
  };

  const currentRole = roleConfig[role] || roleConfig.dinas;

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="flex items-center justify-between gap-6 px-6 py-4">
        {/* Left */}
        <div>
          <h1 className="text-2xl font-black tracking-tight text-blue-900">
            PINTARIN
          </h1>

          <p className="text-sm text-slate-500">
            Education Intelligence Dashboard
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 lg:flex">
            <Search size={18} className="text-slate-400" />

            <input
              type="text"
              placeholder="Cari..."
              className="w-64 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Notification */}
          <button
            aria-label="Notifikasi"
            className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
          >
            <Bell size={20} />

            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2">
            {/* Avatar */}
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl font-bold
              
              ${currentRole.avatarBg}
              ${currentRole.avatarText}
              
              `}
            >
              {getInitials(user?.name || "User")}
            </div>

            {/* Info */}
            <div className="hidden sm:block">
              <h3 className="text-sm font-bold text-slate-800">
                {user?.name || "User"}
              </h3>

              <p className="text-xs text-slate-500">{currentRole.label}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
