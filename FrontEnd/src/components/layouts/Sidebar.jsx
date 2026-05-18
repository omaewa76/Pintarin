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

import { NavLink, useLocation } from "react-router-dom";

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
      {
        title: "Peta Wilayah",
        path: "/dinas/risk-map",
      },

      {
        title: "Ranking Kecamatan",
        path: "/dinas/risk-map",
      },
    ],
  },

  {
    title: "Data Sekolah",
    icon: School,
    path: "/dinas/schools",

    submenu: [
      {
        title: "Semua Sekolah",
        path: "/dinas/schools",
      },

      {
        title: "Verifikasi Data",
        path: "/dinas/schools/review",
      },

      {
        title: "Detail Sekolah",
        path: "/dinas/schools",
      },
    ],
  },

  {
    title: "Bantuan & CSR",
    icon: HandCoins,
    path: "/dinas/csr",

    submenu: [
      {
        title: "Persetujuan Bantuan",
        path: "/dinas/csr/review",
      },

      {
        title: "Monitoring Distribusi",
        path: "/dinas/csr",
      },

      {
        title: "Riwayat Bantuan",
        path: "/dinas/csr",
      },
    ],
  },

  {
    title: "Laporan & Analitik",
    icon: ChartColumn,
    path: "/dinas/analytics",
  },

  {
    title: "Manajemen Akun",
    icon: Users,
    path: "/dinas/accounts",
  },

  {
    title: "Pengaturan",
    icon: Settings,
    path: "/dinas/settings",
  },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
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
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px] lg:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[260px] flex-col border-r border-white/10 bg-[#162554] transition-transform duration-300
        
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        
        lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-[64px] items-center border-b border-white/10 px-6">
          <div>
            <h1 className="text-[17px] font-bold tracking-tight text-white">
              PINTARIN
            </h1>

            <p className="mt-0.5 text-[11px] text-blue-200/80">
              Education Intelligence
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-5">
          <div className="space-y-1.5">
            {menus.map((menu, index) => {
              const Icon = menu.icon;

              const isActive = location.pathname === menu.path;

              const hasSubmenu = menu.submenu;

              return (
                <div key={index}>
                  {/* Main Menu */}
                  <div
                    className={`relative overflow-hidden rounded-2xl transition-all
                      
                      ${isActive ? "bg-white shadow-sm" : ""}
                      
                    `}
                  >
                    <NavLink
                      to={menu.path}
                      onClick={() => {
                        if (hasSubmenu) {
                          toggleMenu(menu.title);
                        }

                        setSidebarOpen(false);
                      }}
                      className={`group flex w-full items-center justify-between px-4 py-3 text-sm font-medium transition-all duration-200
                        
                        ${
                          isActive
                            ? "text-slate-800"
                            : "text-blue-100 hover:bg-white/10 hover:text-white"
                        }
                        
                      `}
                    >
                      {/* Left */}
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-xl transition
                            
                            ${
                              isActive
                                ? "bg-blue-100 text-blue-700"
                                : "bg-white/5 text-blue-100 group-hover:bg-white/10"
                            }
                            
                          `}
                        >
                          <Icon size={18} />
                        </div>

                        <span className="tracking-tight">{menu.title}</span>
                      </div>

                      {/* Arrow */}
                      {hasSubmenu && (
                        <ChevronDown
                          size={16}
                          className={`transition duration-300
                            
                            ${openMenu === menu.title ? "rotate-180" : ""}
                            
                          `}
                        />
                      )}
                    </NavLink>

                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-2 h-[70%] w-1 rounded-r-full bg-blue-700"></div>
                    )}
                  </div>

                  {/* Submenu */}
                  {hasSubmenu && openMenu === menu.title && (
                    <div className="ml-5 mt-2 border-l border-white/10 pl-4">
                      <div className="space-y-1">
                        {menu.submenu.map((sub, subIndex) => {
                          const isSubActive = location.pathname === sub.path;

                          return (
                            <NavLink
                              key={subIndex}
                              to={sub.path}
                              onClick={() => setSidebarOpen(false)}
                              className={`flex items-center rounded-xl px-3 py-2 text-sm transition-all duration-200
                                    
                                    ${
                                      isSubActive
                                        ? "bg-white/10 font-medium text-white"
                                        : "text-blue-100/80 hover:bg-white/10 hover:text-white"
                                    }
                                    
                                  `}
                            >
                              {sub.title}
                            </NavLink>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 px-4 py-4">
          <div className="rounded-2xl bg-white/5 px-4 py-3">
            <p className="text-xs font-medium text-blue-100">PINTARIN v1.0</p>

            <p className="mt-1 text-[11px] leading-relaxed text-blue-200/70">
              Smart education analytics dashboard for government monitoring
              system.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
