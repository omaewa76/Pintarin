import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/ui/StatCard";

function AdminDashboard() {
  return (
    <DashboardLayout>
      <section className="space-y-3">
        <p className="text-sm font-medium text-slate-400">Admin Sistem</p>
        <h1 className="text-[38px] font-bold tracking-tight text-slate-800">Admin Dashboard</h1>
        <p className="max-w-[720px] text-sm text-slate-600">
          Kelola stakeholder, dataset, dan monitoring AI (placeholder UI untuk fase berikutnya).
        </p>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard variant="purple" title="User Aktif" value="1,284" icon="👤" />
        <StatCard variant="purple" title="Dataset Tersedia" value="47" icon="🗂️" />
        <StatCard variant="purple" title="Model Health" value="Good" icon="🧠" />
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800">User Management</p>
              <p className="mt-1 text-xs text-slate-500">Tabel stakeholder, role, dan status akun</p>
            </div>
            <span className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700">
              Placeholder Table
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {[
              { n: "Aqmal", r: "Dinas", s: "Active" },
              { n: "Nabila", r: "CSR", s: "Pending" },
              { n: "Rizky", r: "School", s: "Active" },
            ].map((row) => (
              <div
                key={row.n}
                className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">{row.n}</p>
                  <p className="mt-1 text-xs text-slate-500">Role: {row.r}</p>
                </div>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                  {row.s}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-800">Dataset Management</p>
          <p className="mt-1 text-xs text-slate-500">Upload & versi dataset (stub)</p>

          <div className="mt-6 rounded-[22px] border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-medium text-slate-600">Dataset Upload</p>
            <div className="mt-4 h-14 rounded-2xl border border-slate-200 bg-white/60" />
            <button className="mt-4 w-full rounded-2xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700">
              Upload (stub)
            </button>
          </div>

          <div className="mt-6 rounded-[22px] border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-medium text-slate-600">AI Model Monitoring</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { k: "Accuracy", v: "0.91" },
                { k: "Latency", v: "120ms" },
                { k: "Drift", v: "Low" },
                { k: "Uptime", v: "99.9%" },
              ].map((x) => (
                <div key={x.k} className="rounded-2xl border border-slate-200 bg-white/60 p-3">
                  <p className="text-[11px] font-semibold text-slate-500">{x.k}</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">{x.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-800">System Logs</p>
            <p className="mt-1 text-xs text-slate-500">Aktivitas sistem & audit trail (stub)</p>
          </div>
          <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
            Refresh (stub)
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { t: "Approval Queue", v: "23" },
            { t: "Anomali Dataset", v: "2" },
            { t: "Access Denied", v: "0" },
          ].map((x) => (
            <div key={x.t} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">{x.t}</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{x.v}</p>
            </div>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}

export default AdminDashboard;


