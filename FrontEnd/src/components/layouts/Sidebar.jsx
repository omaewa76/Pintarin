import { NavLink, useLocation } from "react-router-dom";

const roleToAccent = {
  admin: "bg-purple-50 text-purple-700 border-purple-200",
  dinas: "bg-blue-50 text-blue-700 border-blue-200",
  csr: "bg-emerald-50 text-emerald-700 border-emerald-200",
  school: "bg-amber-50 text-amber-700 border-amber-200",
};

function Sidebar() {
  const { pathname } = useLocation();

  const role =
    pathname.startsWith("/admin")
      ? "admin"
      : pathname.startsWith("/dinas")
        ? "dinas"
        : pathname.startsWith("/csr")
          ? "csr"
          : pathname.startsWith("/school")
            ? "school"
            : "dinas";

  const accent = roleToAccent[role] ?? roleToAccent.dinas;

  const baseItem =
    "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition border";

  return (
    <aside className="hidden w-[300px] shrink-0 lg:block">
      <div className="sticky top-24 rounded-[28px] border border-slate-200 bg-white px-4 py-4 shadow-sm">
        <div className="px-2 pb-3">
          <p className="text-xs font-semibold tracking-wide text-slate-400">PINTARIN</p>
          <h2 className={`mt-1 inline-flex items-center gap-2 rounded-2xl border px-3 py-1 text-xs font-semibold ${accent}`}>
            <span aria-hidden>●</span>
            {role === "admin" ? "Admin" : role === "dinas" ? "Dinas" : role === "csr" ? "CSR" : "School"}
          </h2>
        </div>

        <nav className="space-y-2">
          {/* Public entrypoints are intentionally not linked here */}

          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `${baseItem} ${isActive ? "border-slate-300 bg-slate-50" : "border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-200"}`
            }
          >
            <span className="text-base">🛡️</span>
            Admin Dashboard
          </NavLink>

          <NavLink
            to="/dinas"
            className={({ isActive }) =>
              `${baseItem} ${isActive ? "border-slate-300 bg-slate-50" : "border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-200"}`
            }
          >
            <span className="text-base">🏛️</span>
            Dinas Pendidikan
          </NavLink>

          <NavLink
            to="/csr"
            className={({ isActive }) =>
              `${baseItem} ${isActive ? "border-slate-300 bg-slate-50" : "border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-200"}`
            }
          >
            <span className="text-base">🤝</span>
            CSR / Perusahaan
          </NavLink>

          <NavLink
            to="/school"
            className={({ isActive }) =>
              `${baseItem} ${isActive ? "border-slate-300 bg-slate-50" : "border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-200"}`
            }
          >
            <span className="text-base">🏫</span>
            School Dashboard
          </NavLink>
        </nav>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-xs font-medium text-slate-500">AI Risk Scoring</p>
          <p className="mt-1 text-sm font-semibold text-slate-800">Tentukan prioritas bantuan yang tepat sasaran.</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

