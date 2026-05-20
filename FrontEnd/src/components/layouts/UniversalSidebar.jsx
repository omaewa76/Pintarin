import { useState } from "react";

import { ChevronDown } from "lucide-react";

import { NavLink, useLocation } from "react-router-dom";

import sidebarConfig from "../../config/sidebarConfig";

export default function UniversalSidebar({
  role = "dinas",
  sidebarOpen,
  setSidebarOpen,
}) {
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState("");

  const config = sidebarConfig[role];

  const { label, menu, theme } = config;

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
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-[260px] px-4 py-5 transition-transform duration-300
        
        ${theme.background}
        
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        
        lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-[64px] items-center border-b border-white/10 px-2">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              PINTARIN
            </h1>

            <p className={`mt-1 text-xs ${theme.text}`}>{label}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-5 space-y-2 overflow-y-auto pb-10">
          {menu.map((menuItem, index) => {
            const Icon = menuItem.icon;

            const isActive = location.pathname === menuItem.path;

            return (
              <div key={index}>
                {/* Main Menu */}
                <div
                  className={`relative rounded-2xl
                  
                  ${isActive ? theme.active : ""}
                  
                  `}
                >
                  <NavLink
                    to={menuItem.path}
                    onClick={() => {
                      if (menuItem.submenu) {
                        toggleMenu(menuItem.title);
                      }

                      setSidebarOpen(false);
                    }}
                    className={`group flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200
                      
                      ${isActive ? "" : `${theme.text} ${theme.hover}`}
                      
                      `}
                  >
                    {/* Left */}
                    <div className="flex items-center gap-3">
                      <Icon
                        size={20}
                        className={isActive ? theme.activeIcon : theme.icon}
                      />

                      <span>{menuItem.title}</span>
                    </div>

                    {/* Arrow */}
                    {menuItem.submenu && (
                      <ChevronDown
                        size={18}
                        className={`transition
                          
                          ${openMenu === menuItem.title ? "rotate-180" : ""}
                          
                          `}
                      />
                    )}
                  </NavLink>

                  {/* Indicator */}
                  {isActive && (
                    <div
                      className={`absolute left-0 top-0 h-full w-1 rounded-r-full ${theme.indicator}`}
                    ></div>
                  )}
                </div>

                {/* Submenu */}
                {menuItem.submenu && openMenu === menuItem.title && (
                  <div className="mt-2 ml-5 space-y-1 border-l border-white/10 pl-4">
                    {menuItem.submenu.map((sub, subIndex) => {
                      const isSubActive = location.pathname === sub.path;

                      return (
                        <NavLink
                          key={subIndex}
                          to={sub.path}
                          onClick={() => setSidebarOpen(false)}
                          className={`flex w-full items-center rounded-xl px-3 py-2 text-sm transition
                                
                                ${
                                  isSubActive
                                    ? "bg-white/10 text-white"
                                    : `${theme.text} hover:bg-white/10 hover:text-white`
                                }
                                
                                `}
                        >
                          {sub.title}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
