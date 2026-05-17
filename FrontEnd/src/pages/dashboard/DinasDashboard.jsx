import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/ui/StatCard";

function DinasDashboard() {
  return (
    <DashboardLayout>
      <section className="space-y-3">
        <p className="text-sm font-medium text-slate-400">Dinas Pendidikan</p>
        <h1 className="text-[38px] font-bold tracking-tight text-slate-800">Dinas Dashboard</h1>
        <p className="max-w-[720px] text-sm text-slate-600">
          Monitor risiko pendidikan dan tentukan prioritas bantuan berbasis rekomendasi AI.
        </p>
      </section>

      {/* Risk Overview */}
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard variant="blue" title="Wilayah Risiko Tinggi" value="124" icon="🗺️" />
        <StatCard variant="blue" title="Siswa Rentan" value="18,450" icon="🎓" />
        <StatCard variant="blue" title="Sekolah Prioritas" value="62" icon="🏫" />
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800">AI Risk Map</p>
              <p className="mt-1 text-xs text-slate-500">Merah: tinggi • Kuning: sedang • Hijau: aman</p>
            </div>
            <span className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700">
              Placeholder Map
            </span>
          </div>
          <div className="mt-6 aspect-[16/8] w-full rounded-[22px] border border-slate-200 bg-gradient-to-br from-blue-50 to-slate-50" />
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-800">AI Recommendation Panel</p>
          <p className="mt-1 text-xs text-slate-500">Rekomendasi wilayah & sekolah + alasan AI</p>

          <div className="mt-5 space-y-3">
            {[
              { t: "Prioritas Wilayah", s: "Kab. Harapan Jaya" },
              { t: "Prioritas Sekolah", s: "SMPN 12" },
              { t: "Alasan", s: "Skor dropout & akses rendah" },
            ].map((x) => (
              <div key={x.t} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-500">{x.t}</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{x.s}</p>
              </div>
            ))}
          </div>

          <button className="mt-5 w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
            Approve Assistance (stub)
          </button>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-800">Education Analytics</p>
          <p className="mt-1 text-xs text-slate-500">Grafik dropout risk, distribusi bantuan, dan trend pendidikan</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { label: "Dropout Risk", color: "from-red-50 to-slate-50" },
              { label: "Distribusi Bantuan", color: "from-blue-50 to-slate-50" },
              { label: "Trend Pendidikan", color: "from-emerald-50 to-slate-50" },
              { label: "AI Insights", color: "from-amber-50 to-slate-50" },
            ].map((c) => (
              <div key={c.label} className={`rounded-[22px] border border-slate-200 bg-gradient-to-br ${c.color} p-4`}>
                <p className="text-xs font-medium text-slate-600">{c.label}</p>
                <div className="mt-4 h-28 w-full rounded-[18px] border border-slate-200 bg-white/60" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-800">School Monitoring</p>
          <p className="mt-1 text-xs text-slate-500">Tabel sekolah, akreditasi, siswa rentan, status bantuan</p>
          <div className="mt-6 space-y-3">
            {[
              { n: "SMPN 12", a: "A", r: "1,120", s: "Pending" },
              { n: "SDN 07", a: "B", r: "820", s: "Approved" },
              { n: "SMA 3", a: "A", r: "540", s: "Rejected" },
            ].map((row) => (
              <div key={row.n} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-800">{row.n}</p>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-600">
                  <span>
                    Akreditasi: <b className="text-slate-800">{row.a}</b>
                  </span>
                  <span>
                    Siswa rentan: <b className="text-slate-800">{row.r}</b>
                  </span>
                  <span>
                    Status: <b className="text-slate-800">{row.s}</b>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 flex flex-col gap-3 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-800">Report Export</p>
          <p className="mt-1 text-xs text-slate-500">Ekspor data untuk pelaporan stakeholder</p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
            Export PDF (stub)
          </button>
          <button className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
            Export Excel (stub)
          </button>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default DinasDashboard;

