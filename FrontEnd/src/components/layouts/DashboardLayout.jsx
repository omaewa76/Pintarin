import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F7FB]">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Wrapper */}
      <div className="min-h-screen transition-all duration-300 lg:ml-[260px]">
        {/* Navbar */}
        <Navbar setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main className="px-4 pb-8 pt-6 md:px-6 xl:px-8">
          {/* Content Container */}
          <div className="mx-auto w-full max-w-[1700px]">
            {/* Inner Layout */}
            <div className="space-y-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
