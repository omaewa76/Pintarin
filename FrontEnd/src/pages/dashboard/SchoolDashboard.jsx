import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/ui/StatCard";

function SchoolDashboard() {
  return (
    <DashboardLayout>
      <section className="space-y-3">
        <p className="text-sm font-medium text-slate-400">School</p>
        <h1 className="text-[38px] font-bold tracking-tight text-slate-800">School Dashboard</h1>
        <p className="max-w-[720px] text-sm text-slate-600">Monitoring kondisi sekolah, ajukan bantuan, dan lihat status bantuan.</p>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard variant="amber" title="Akreditasi" value="A" icon="🏅" />
        <StatCard variant="amber" title="Siswa Rentan" value="3,280" icon="🎓" />
        <StatCard variant="amber" title="Bantuan" value="Pending" icon="📦" />
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <p className="text-sm font-semibold text-slate-800">School Profile</p>
          <p className="mt-1 text-xs text-slate-500">Akreditasi, jumlah siswa, fasilitas</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { k: "Jumlah Siswa", v: "2,140" },
              { k: "Akreditasi", v: "A" },
              { k: "Fasilitas", v: "Memadai" },
            ].map((x) => (
              <div key={x.k} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-500">{x.k}</p>
                <p className="mt-2 text-sm font-semibold text-slate-800">{x.v}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { label: "Student Risk Summary", c: "from-amber-50 to-slate-50" },
              { label: "Dropout Risk", c: "from-red-50 to-slate-50" },
            ].map((x) => (
              <div key={x.label} className={`rounded-[22px] border border-slate-200 bg-gradient-to-br ${x.c} p-4`}>
                <p className="text-xs font-medium text-slate-600">{x.label}</p>
                <div className="mt-4 h-28 w-full rounded-[18px] border border-slate-200 bg-white/60" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-800">Assistance Status</p>
          <p className="mt-1 text-xs text-slate-500">Bantuan diterima, pending, ditolak</p>

          <div className="mt-6 space-y-3">
            {[
              { st: "Pending", c: "bg-amber-50 text-amber-700 border border-amber-200" },
              { st: "Rejected", c: "bg-red-50 text-red-700 border border-red-200" },
              { st: "Approved", c: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
            ].map((x) => (
              <div key={x.st} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 flex items-center justify-between">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${x.c}`}>{x.st}</span>
                <span className="text-sm font-bold text-slate-900">—</span>
              </div>
            ))}
          </div>

          <button className="mt-5 w-full rounded-2xl bg-amber-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600">Submit Request (stub)</button>
        </div>
      </section>

      <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-800">Submit Assistance Request</p>
            <p className="mt-1 text-xs text-slate-500">Form pengajuan bantuan (stub)</p>
          </div>
          <span className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700">Upload Dokumen (optional)</span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { label: "Jenis Bantuan" },
            { label: "Jumlah Kebutuhan" },
            { label: "Alasan Pengajuan" },
          ].map((f) => (
            <div key={f.label}>
              <p className="mb-2 text-xs font-semibold text-slate-600">{f.label}</p>
              <div className="h-12 rounded-2xl border border-slate-200 bg-white/60" />
            </div>
          ))}
        </div>

        <div className="mt-5 flex gap-3">
          <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">Save Draft (stub)</button>
          <button className="rounded-2xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600">Submit (stub)</button>
        </div>
      </section>

      <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-slate-800">School Analytics</p>
        <p className="mt-1 text-xs text-slate-500">Statistik sekolah (placeholder)</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["Attendance", "Facilities", "Teacher Ratio", "Achievement"].map((t) => (
            <div key={t} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-600">{t}</p>
              <div className="mt-4 h-24 rounded-[18px] border border-slate-200 bg-white/60" />
            </div>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}

export default SchoolDashboard;


