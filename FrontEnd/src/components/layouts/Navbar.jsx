import { useState } from "react";

import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
  School,
  HandCoins,
  CircleCheckBig,
  User,
} from "lucide-react";

const notifications = [
  {
    title: "SD Negeri 01 Coblong mengirim data baru",
    time: "2 menit lalu",
    icon: School,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "CSR PT Maju Jaya mengajukan bantuan",
    time: "15 menit lalu",
    icon: HandCoins,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Verifikasi data SMPN 5 berhasil",
    time: "1 jam lalu",
    icon: CircleCheckBig,
    color: "bg-emerald-100 text-emerald-700",
  },
];

export default function Navbar() {
  const [openNotif, setOpenNotif] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-4 md:px-8">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu */}
        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white lg:hidden">

          <Menu size={20} />

        </button>

        {/* Logo */}
        <div className="leading-tight">

          <h1 className="text-[32px] font-extrabold tracking-tight text-blue-900">
            PINTARIN
          </h1>

          <p className="-mt-1 text-xs text-slate-500">
            Education Intelligence Platform
          </p>

        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        {/* Search */}
        <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 md:flex">

          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Cari sekolah atau kecamatan..."
            className="w-[300px] bg-transparent text-sm text-slate-700 placeholder:text-slate-400"
          />

        </div>

        {/* Notification */}
        <div className="relative">

          <button
            onClick={() => setOpenNotif(!openNotif)}
            className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white transition hover:bg-slate-50"
          >

            <Bell size={19} className="text-slate-700" />

            <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500"></div>

          </button>

          {/* Notification Dropdown */}
          {openNotif && (
            <div className="absolute right-0 mt-3 w-[360px] rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl">

              {/* Header */}
              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-lg font-bold text-slate-800">
                    Notifikasi
                  </h2>

                  <p className="text-sm text-slate-500">
                    Aktivitas terbaru sistem
                  </p>

                </div>

                <div className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">

                  3 Baru

                </div>

              </div>

              {/* Notifications */}
              <div className="mt-5 space-y-3">

                {notifications.map((notif, index) => {
                  const Icon = notif.icon;

                  return (
                    <button
                      key={index}
                      className="flex w-full items-start gap-3 rounded-2xl p-3 text-left transition hover:bg-slate-50"
                    >

                      {/* Icon */}
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl ${notif.color}`}
                      >

                        <Icon size={20} />

                      </div>

                      {/* Content */}
                      <div>

                        <h3 className="text-sm font-semibold text-slate-800">
                          {notif.title}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          {notif.time}
                        </p>

                      </div>

                    </button>
                  );
                })}

              </div>

            </div>
          )}

        </div>

        {/* User Dropdown */}
        <div className="relative">

          <button
            onClick={() => setOpenProfile(!openProfile)}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 transition hover:bg-slate-50"
          >

            {/* Avatar */}
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-700 text-sm font-bold text-white">
              AM
            </div>

            {/* Info */}
            <div className="hidden text-left md:block">

              <h2 className="text-sm font-semibold leading-none text-slate-800">
                Aqmal Madani
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Dinas Pendidikan
              </p>

            </div>

            <ChevronDown
              size={18}
              className={`hidden text-slate-400 transition md:block
              
              ${openProfile ? "rotate-180" : ""}
              
              `}
            />

          </button>

          {/* Profile Dropdown */}
          {openProfile && (
            <div className="absolute right-0 mt-3 w-[280px] rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl">

              {/* User Header */}
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">

                {/* Avatar */}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 font-bold text-white">
                  AM
                </div>

                {/* User */}
                <div>

                  <h2 className="font-semibold text-slate-800">
                    Aqmal Madani
                  </h2>

                  <p className="text-sm text-slate-500">
                    aqmal@dinas.go.id
                  </p>

                </div>

              </div>

              {/* Menu */}
              <div className="mt-4 space-y-1">

                {/* Profile */}
                <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">

                  <User size={18} />

                  Profil Saya

                </button>

                {/* Settings */}
                <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">

                  <Settings size={18} />

                  Pengaturan

                </button>

                {/* Logout */}
                <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50">

                  <LogOut size={18} />

                  Logout

                </button>

              </div>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}