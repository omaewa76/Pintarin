import Navbar from "../components/layouts/Navbar";
import Sidebar from "../components/layouts/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="lg:ml-[260px]">

        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;