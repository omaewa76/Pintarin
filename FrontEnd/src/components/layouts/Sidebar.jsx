import { useState } from "react";

import {
  ChevronDown,
  ChartColumn,
  HandCoins,
  LayoutDashboard,
  Map,
  School,
  Settings,
  Users,
} from "lucide-react";

import {
  NavLink,
  useLocation,
} from "react-router-dom";

const menus = [
  {
    title: "Beranda",
    icon: LayoutDashboard,
    path: "/dinas",
  },
  {
    title: "Peta Risiko",
    icon: Map,
    path: "/dinas/risk-map",
    submenu: [
      "Peta Wilayah",
      "Ranking Kecamatan",
    ],
  },
  {
    title: "Data Sekolah",
    icon: School,
    path: "/dinas/schools",
    submenu: [
      "Semua Sekolah",
      "Verifikasi Data",
      "Detail Sekolah",
    ],
  },
  {
    title: "Bantuan & CSR",
    icon: HandCoins,
    path: "/dinas/csr",
    submenu: [
      "Persetujuan Bantuan",
      "Monitoring Distribusi",
      "Riwayat Bantuan",
    ],
  },
  {
    title: "Laporan & Analitik",
    icon: ChartColumn,
    path: "/dinas/analytics",
    submenu: [
      "Statistik Pendidikan",
      "Export Laporan",
    ],
  },
  {
    title: "Manajemen Akun",
    icon: Users,
    path: "/dinas/accounts",
    submenu: [
      "Verifikasi Sekolah",
      "Verifikasi CSR",
    ],
  },
  {
    title: "Pengaturan",
    icon: Settings,
    path: "/dinas/settings",
    submenu: [
      "Preferensi",
      "Notifikasi",
    ],
  },
];

export default function Sidebar() {
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState("Peta Risiko");

  const toggleMenu = (title) => {
    if (openMenu === title) {
      setOpenMenu("");
    } else {
      setOpenMenu(title);
    }
  };

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[260px] bg-[#14245C] px-4 py-5 lg:block">

      {/* Top Space */}
      <div className="h-[72px] border-b border-white/10"></div>

      {/* Navigation */}
      <div className="mt-5 space-y-2 overflow-y-auto pb-10">

        {menus.map((menu, index) => {
          const Icon = menu.icon;

          const isActive =
            location.pathname === menu.path;

          return (
            <div key={index}>

              {/* Main Menu */}
              <div
                className={`relative rounded-2xl
                  
                  ${
                    isActive
                      ? "bg-white shadow-lg"
                      : ""
                  }
                  
                `}
              >

                <NavLink
                  to={menu.path}
                  onClick={() =>
                    menu.submenu &&
                    toggleMenu(menu.title)
                  }
                  className={`group flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200
                  
                  ${
                    isActive
                      ? "text-blue-900"
                      : "text-blue-100 hover:bg-white/10 hover:text-white"
                  }
                  
                  `}
                >

                  {/* Left */}
                  <div className="flex items-center gap-3">

                    <Icon
                      size={20}
                      className={
                        isActive
                          ? "text-blue-700"
                          : "text-blue-200"
                      }
                    />

                    <span>{menu.title}</span>

                  </div>

                  {/* Arrow */}
                  {menu.submenu && (
                    <ChevronDown
                      size={18}
                      className={`transition
                      
                      ${
                        openMenu === menu.title
                          ? "rotate-180"
                          : ""
                      }
                      
                      `}
                    />
                  )}

                </NavLink>

                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-blue-700"></div>
                )}

              </div>

              {/* Submenu */}
              {menu.submenu &&
                openMenu === menu.title && (
                  <div className="mt-2 ml-5 space-y-1 border-l border-white/10 pl-4">

                    {menu.submenu.map(
                      (sub, subIndex) => (
                        <button
                          key={subIndex}
                          className="flex w-full items-center rounded-xl px-3 py-2 text-sm text-blue-100 transition hover:bg-white/10 hover:text-white"
                        >

                          {sub}

                        </button>
                      )
                    )}

                  </div>
                )}

            </div>
          );
        })}

      </div>

    </aside>
  );
}