import {
  ArrowUpRight,
  Brain,
  Building2,
  HandCoins,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";

export default function CSROverviewPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="overflow-hidden rounded-[36px] border border-slate-200 bg-gradient-to-br from-orange-900 via-amber-800 to-slate-900 p-8 text-white shadow-sm">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <Sparkles size={16} />
              CSR Intelligence Dashboard
            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-tight tracking-tight">
              Corporate Social Responsibility
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-orange-100">
              Monitoring distribusi bantuan pendidikan, impact sosial, dan
              rekomendasi AI berbasis educational risk system.
            </p>
          </div>

          {/* Right */}
          <button className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-4 text-sm font-semibold transition hover:bg-orange-600">
            <HandCoins size={18} />
            Salurkan Bantuan
          </button>
        </div>
      </section>

      {/* Stats */}
      <section>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Distribusi
                </p>

                <h2 className="mt-4 text-4xl font-black text-slate-900">
                  Rp 1.2 M
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-orange-100 text-orange-700">
                <Wallet size={26} />
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Sekolah Dibantu
                </p>

                <h2 className="mt-4 text-4xl font-black text-blue-700">82</h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-100 text-blue-700">
                <Building2 size={26} />
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Active Program
                </p>

                <h2 className="mt-4 text-4xl font-black text-emerald-700">
                  14
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                <HandCoins size={26} />
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Social Impact
                </p>

                <h2 className="mt-4 text-4xl font-black text-indigo-700">
                  +32%
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-indigo-100 text-indigo-700">
                <TrendingUp size={26} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Recommendation */}
      <section>
        <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-amber-600 p-6 text-white shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10">
              <Brain size={28} />
            </div>

            <div>
              <h2 className="text-3xl font-black tracking-tight">
                AI Funding Recommendation
              </h2>

              <p className="mt-1 text-sm text-orange-100">
                Prioritas sekolah dengan educational risk tertinggi.
              </p>
            </div>
          </div>

          {/* Grid */}
          <div className="mt-8 grid gap-5 xl:grid-cols-3">
            {/* Card */}
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-100">
                Prioritas Utama
              </p>

              <h3 className="mt-3 text-2xl font-black">SD Negeri Coblong 01</h3>

              <p className="mt-2 text-sm text-orange-100">
                Risk score sangat tinggi minggu ini.
              </p>
            </div>

            {/* Card */}
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-100">
                Estimasi Bantuan
              </p>

              <h3 className="mt-3 text-2xl font-black">Rp 150 JT</h3>

              <p className="mt-2 text-sm text-orange-100">
                Renovasi + perangkat digital.
              </p>
            </div>

            {/* Card */}
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-100">
                Confidence AI
              </p>

              <h3 className="mt-3 text-2xl font-black">96%</h3>

              <p className="mt-2 text-sm text-orange-100">
                Berdasarkan analisis historical data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Priority Schools */}
      <section>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                Sekolah Prioritas Bantuan
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Rekomendasi AI berdasarkan educational risk.
              </p>
            </div>

            <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              <ArrowUpRight size={18} />
              Lihat Semua
            </button>
          </div>

          {/* Table */}
          <div className="mt-8 overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-3">
              <thead>
                <tr>
                  <th className="px-4 text-left text-sm font-semibold text-slate-500">
                    Sekolah
                  </th>

                  <th className="px-4 text-left text-sm font-semibold text-slate-500">
                    Kecamatan
                  </th>

                  <th className="px-4 text-left text-sm font-semibold text-slate-500">
                    Risk Score
                  </th>

                  <th className="px-4 text-left text-sm font-semibold text-slate-500">
                    Bantuan Disarankan
                  </th>
                </tr>
              </thead>

              <tbody>
                {[1, 2, 3, 4].map((item) => (
                  <tr
                    key={item}
                    className="bg-slate-50 transition hover:bg-slate-100"
                  >
                    <td className="rounded-l-2xl px-4 py-4">
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          SD Negeri Coblong 01
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Infrastruktur rusak berat
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-700">
                      Coblong
                    </td>

                    <td className="px-4 py-4">
                      <div className="inline-flex rounded-xl bg-red-100 px-3 py-2 text-sm font-bold text-red-600">
                        92
                      </div>
                    </td>

                    <td className="rounded-r-2xl px-4 py-4 text-sm font-semibold text-slate-800">
                      Renovasi Ruang Kelas
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
