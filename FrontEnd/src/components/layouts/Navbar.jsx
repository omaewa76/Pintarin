import { useEffect, useRef, useState } from "react";

import { Bell, LogOut, Menu, Search, Settings, User } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function Navbar({ setSidebarOpen }) {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [showNotif, setShowNotif] = useState(false);

  const [showProfile, setShowProfile] = useState(false);

  const notifRef = useRef(null);

  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotif(false);
      }

      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="flex h-[64px] items-center justify-between px-4 md:px-6 xl:px-8">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white lg:hidden"
          >
            <Menu size={20} />
          </button>

          {/* Logo */}
          <div>
            <h1 className="text-[18px] font-bold tracking-tight text-blue-900">
              PINTARIN
            </h1>

            <p className="text-xs text-slate-500">
              Education Intelligence Dashboard
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Search */}
          <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 md:flex">
            <Search size={18} className="text-slate-400" />

            <input
              type="text"
              placeholder="Cari sekolah..."
              className="w-[220px] bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 xl:w-[280px]"
            />
          </div>

          {/* Notification */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setShowNotif(!showNotif)}
              className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white transition hover:bg-slate-50"
            >
              <Bell size={20} className="text-slate-700" />

              {/* Badge */}
              <div className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500"></div>
            </button>

            {/* Dropdown */}
            {showNotif && (
              <div className="absolute right-0 mt-3 w-[340px] rounded-3xl border border-slate-200 bg-white p-4 shadow-lg">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-slate-800">
                    Notifikasi
                  </h2>

                  <button className="text-xs font-medium text-blue-700 hover:text-blue-800">
                    Tandai Dibaca
                  </button>
                </div>

                {/* Items */}
                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm font-medium text-slate-800">
                      Data sekolah menunggu verifikasi
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      SD Negeri Coblong 01 baru submit data.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm font-medium text-slate-800">
                      Pengajuan bantuan CSR baru
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      PT Maju Jaya mengajukan bantuan pendidikan.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm font-medium text-slate-800">
                      Risk score meningkat
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Kecamatan Coblong masuk prioritas tinggi.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 transition hover:bg-slate-50"
            >
              {/* Avatar */}
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 font-semibold text-blue-700">
                A
              </div>

              {/* Info */}
              <div className="hidden text-left md:block">
                <h3 className="text-sm font-semibold text-slate-800">
                  {user?.name || "User Dinas"}
                </h3>

                <p className="text-xs text-slate-500">Dinas Pendidikan</p>
              </div>
            </button>

            {/* Dropdown */}
            {showProfile && (
              <div className="absolute right-0 mt-3 w-[240px] rounded-3xl border border-slate-200 bg-white p-3 shadow-lg">
                <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                  <User size={18} />
                  Profil
                </button>

                <button className="mt-1 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                  <Settings size={18} />
                  Pengaturan
                </button>

                <button
                  onClick={handleLogout}
                  className="mt-1 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
