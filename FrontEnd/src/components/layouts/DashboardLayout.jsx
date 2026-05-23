import { useState } from "react";

import Navbar from "./Navbar";

import UniversalSidebar from "./UniversalSidebar";

export default function DashboardLayout({
  children,
  role = "dinas",
}) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <UniversalSidebar
        role={role}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main */}
      <div className="min-h-screen lg:ml-[260px]">
        {/* Navbar */}
        <Navbar
          setSidebarOpen={setSidebarOpen}
          role={role}
        />

        {/* Content */}
        <main className="px-4 py-5 md:px-6 xl:px-8">
          <div className="mx-auto w-full max-w-[1600px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}