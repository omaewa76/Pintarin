import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/ui/StatCard";

function CSRDashboard() {
  return (
    <DashboardLayout>
      <section className="space-y-3">
        <p className="text-sm font-medium text-slate-400">CSR / Perusahaan</p>
        <h1 className="text-[38px] font-bold tracking-tight text-slate-800">CSR Dashboard</h1>
        <p className="max-w-[720px] text-sm text-slate-600">Lihat sekolah prioritas dan monitoring dampak bantuan.</p>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard variant="emerald" title="Sekolah Prioritas" value="28" icon="✅" />
        <StatCard variant="emerald" title="Kampanye Aktif" value="5" icon="📣" />
        <StatCard variant="emerald" title="Pending" value="12" icon="⏳" />
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800">Recommended Schools</p>
              <p className="mt-1 text-xs text-slate-500">Sekolah prioritas berdasarkan AI</p>
            </div>
            <span className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700">AI Placeholder</span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { name: "SMPN 12", city: "Kec. Harapan", risk: "Tinggi", reason: "Akses terbatas & dropout" },
              { name: "SDN 07", city: "Kec. Sumbang", risk: "Sedang", reason: "Kebutuhan sarana" },
              { name: "SMA 3", city: "Kec. Terang", risk: "Tinggi", reason: "Skor rentan siswa" },
              { name: "SDN 21", city: "Kec. Maju", risk: "Aman", reason: "Stabilitas capaian" },
            ].map((s) => (
              <div key={s.name} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-800">{s.name}</p>
                <p className="mt-1 text-xs text-slate-500">{s.city}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      s.risk === "Tinggi"
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : s.risk === "Sedang"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    }`}
                  >
                    Risiko: {s.risk}
                  </span>
                  <button className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
                    Choose (stub)
                  </button>
                </div>
                <p className="mt-3 text-xs text-slate-600">
                  <b className="text-slate-800">Alasan:</b> {s.reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-800">AI Recommendation</p>
          <p className="mt-1 text-xs text-slate-500">Rekomendasi sekolah & wilayah prioritas</p>

          <div className="mt-5 space-y-3">
            {[
              { k: "Wilayah prioritas", v: "Kab. Harapan Jaya" },
              { k: "Sekolah prioritas", v: "SMPN 12" },
              { k: "Alasan AI", v: "Skor kebutuhan & efektivitas program" },
            ].map((x) => (
              <div key={x.k} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-500">{x.k}</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{x.v}</p>
              </div>
            ))}
          </div>

          <button className="mt-5 w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700">
            Create Funding (stub)
          </button>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <p className="text-sm font-semibold text-slate-800">Funding Impact</p>
          <p className="mt-1 text-xs text-slate-500">Grafik dampak bantuan & statistik penerima bantuan</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { label: "Impact Trend", c: "from-emerald-50 to-slate-50" },
              { label: "Recipients", c: "from-blue-50 to-slate-50" },
              { label: "Target Outcome", c: "from-amber-50 to-slate-50" },
              { label: "ROI Placeholder", c: "from-purple-50 to-slate-50" },
            ].map((x) => (
              <div key={x.label} className={`rounded-[22px] border border-slate-200 bg-gradient-to-br ${x.c} p-4`}>
                <p className="text-xs font-medium text-slate-600">{x.label}</p>
                <div className="mt-4 h-28 w-full rounded-[18px] border border-slate-200 bg-white/60" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-800">Donation Monitoring</p>
          <p className="mt-1 text-xs text-slate-500">Pending / Active / Completed</p>

          <div className="mt-6 space-y-3">
            {[
              { st: "Pending", n: "12", cls: "bg-amber-50 text-amber-700 border border-amber-200" },
              { st: "Active", n: "7", cls: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
              { st: "Completed", n: "14", cls: "bg-blue-50 text-blue-700 border border-blue-200" },
            ].map((x) => (
              <div key={x.st} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 flex items-center justify-between">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${x.cls}`}>{x.st}</span>
                <span className="text-sm font-bold text-slate-900">{x.n}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-slate-800">CSR Campaign</p>
        <p className="mt-1 text-xs text-slate-500">Membuat program bantuan & menentukan target wilayah (stub)</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { label: "Nama Kampanye" },
            { label: "Target Wilayah" },
            { label: "Budget" },
          ].map((f) => (
            <div key={f.label}>
              <p className="mb-2 text-xs font-semibold text-slate-600">{f.label}</p>
              <div className="h-12 rounded-2xl border border-slate-200 bg-white/60" />
            </div>
          ))}
        </div>
        <button className="mt-5 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700">
          Create Campaign (stub)
        </button>
      </section>
    </DashboardLayout>
  );
}

export default CSRDashboard;


