import Navbar from "../components/layouts/Navbar";
import Sidebar from "../components/layouts/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Main Container */}
      <div className="mx-auto max-w-[1600px] px-8 py-7">
        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <div className="mt-10 flex gap-8">
          <Sidebar />
          <main className="min-w-0 flex-1">
            <div className="rounded-[28px] border border-slate-200 bg-white/40 p-7 shadow-sm backdrop-blur">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;


