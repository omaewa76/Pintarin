import { NavLink, useLocation } from "react-router-dom";

import csrMenu from "../../config/navigation/csrMenu";

export default function CSRSidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-[260px] bg-gradient-to-b from-orange-900 to-amber-800 px-4 py-5 transition-transform duration-300
        
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        
        lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-[64px] items-center border-b border-white/10 px-2">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              PINTARIN
            </h1>

            <p className="mt-1 text-xs text-orange-100">CSR Dashboard</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-5 space-y-2">
          {csrMenu.map((menu, index) => {
            const Icon = menu.icon;

            const isActive = location.pathname === menu.path;

            return (
              <NavLink
                key={index}
                to={menu.path}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200
                
                ${
                  isActive
                    ? "bg-white text-orange-900 shadow-sm"
                    : "text-orange-100 hover:bg-white/10 hover:text-white"
                }
                
                `}
              >
                <Icon
                  size={20}
                  className={isActive ? "text-orange-700" : "text-orange-100"}
                />

                <span>{menu.title}</span>
              </NavLink>
            );
          })}
        </div>
      </aside>
    </>
  );
}
