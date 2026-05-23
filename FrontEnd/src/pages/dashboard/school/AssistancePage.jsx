import {
  BadgeCheck,
  Brain,
  Clock3,
  HandCoins,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";

const assistanceData = [
  {
    company: "PT Maju Jaya",
    type: "Renovasi Ruang Kelas",
    amount: "Rp 120 JT",
    status: "Approved",
    date: "17 Mei 2026",
  },
  {
    company: "PT Edu Teknologi",
    type: "Perangkat Digital",
    amount: "Rp 85 JT",
    status: "Pending",
    date: "15 Mei 2026",
  },
  {
    company: "PT Nusantara Digital",
    type: "Beasiswa Pendidikan",
    amount: "Rp 45 JT",
    status: "Completed",
    date: "10 Mei 2026",
  },
];

export default function AssistancePage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="overflow-hidden rounded-[36px] border border-slate-200 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 p-8 text-white shadow-sm">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <Sparkles size={16} />
              School Assistance Monitoring
            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-tight tracking-tight">
              Bantuan & Distribusi CSR
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-300">
              Monitoring bantuan pendidikan, progress distribusi, dan
              rekomendasi bantuan berbasis AI.
            </p>
          </div>

          {/* Right */}
          <button className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-4 text-sm font-semibold transition hover:bg-emerald-600">
            <HandCoins size={18} />
            Ajukan Bantuan
          </button>
        </div>
      </section>

      {/* Stats */}
      <section>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Bantuan</p>

            <h2 className="mt-4 text-4xl font-black text-slate-900">
              Rp 250 JT
            </h2>

            <div className="mt-5 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Bantuan aktif
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Bantuan Pending
            </p>

            <h2 className="mt-4 text-4xl font-black text-yellow-600">2</h2>

            <div className="mt-5 inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
              Menunggu approval
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Bantuan Selesai
            </p>

            <h2 className="mt-4 text-4xl font-black text-blue-700">8</h2>

            <div className="mt-5 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              Distribusi selesai
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">AI Priority</p>

            <h2 className="mt-4 text-4xl font-black text-red-600">High</h2>

            <div className="mt-5 inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              Prioritas bantuan
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section>
        <div className="grid gap-6 xl:grid-cols-3">
          {/* LEFT */}
          <div className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                  Riwayat Bantuan
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Monitoring bantuan CSR terbaru.
                </p>
              </div>
            </div>

            {/* Table */}
            <div className="mt-8 overflow-x-auto">
              <table className="w-full border-separate border-spacing-y-3">
                <thead>
                  <tr>
                    <th className="px-4 text-left text-sm font-semibold text-slate-500">
                      Perusahaan
                    </th>

                    <th className="px-4 text-left text-sm font-semibold text-slate-500">
                      Jenis Bantuan
                    </th>

                    <th className="px-4 text-left text-sm font-semibold text-slate-500">
                      Nilai
                    </th>

                    <th className="px-4 text-left text-sm font-semibold text-slate-500">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {assistanceData.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-slate-50 transition hover:bg-slate-100"
                    >
                      {/* Company */}
                      <td className="rounded-l-2xl px-4 py-4">
                        <div>
                          <h3 className="font-semibold text-slate-800">
                            {item.company}
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            {item.date}
                          </p>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="px-4 py-4 text-sm font-medium text-slate-700">
                        {item.type}
                      </td>

                      {/* Amount */}
                      <td className="px-4 py-4">
                        <div className="inline-flex rounded-xl bg-emerald-100 px-3 py-2 text-sm font-bold text-emerald-700">
                          {item.amount}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="rounded-r-2xl px-4 py-4">
                        <div
                          className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold
                          
                          ${
                            item.status === "Approved"
                              ? "bg-blue-100 text-blue-700"
                              : item.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-emerald-100 text-emerald-700"
                          }
                          
                          `}
                        >
                          {item.status === "Approved" && (
                            <BadgeCheck size={16} />
                          )}

                          {item.status === "Pending" && <Clock3 size={16} />}

                          {item.status === "Completed" && (
                            <TrendingUp size={16} />
                          )}

                          {item.status}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* AI Recommendation */}
            <div className="rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-800 p-6 text-white shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10">
                <Brain size={28} />
              </div>

              <h2 className="mt-8 text-3xl font-black tracking-tight">
                AI Recommendation
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-blue-100">
                Sistem AI merekomendasikan bantuan renovasi ruang kelas dan
                perangkat digital sebagai prioritas utama.
              </p>

              {/* Recommendation */}
              <div className="mt-8 space-y-4">
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                    Prioritas Utama
                  </p>

                  <h3 className="mt-2 text-2xl font-black">Renovasi Kelas</h3>
                </div>

                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                    Estimasi Bantuan
                  </p>

                  <h3 className="mt-2 text-2xl font-black">Rp 150 JT</h3>
                </div>
              </div>
            </div>

            {/* Funding Summary */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                  <Wallet size={28} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                    Funding Summary
                  </h2>
                </div>
              </div>

              {/* Summary */}
              <div className="mt-8 space-y-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">
                    Total Bantuan Tahun Ini
                  </p>

                  <h3 className="mt-2 text-3xl font-black text-slate-900">
                    Rp 250 JT
                  </h3>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Bantuan Aktif</p>

                  <h3 className="mt-2 text-3xl font-black text-blue-700">
                    4 Program
                  </h3>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Progress Distribusi</p>

                  <h3 className="mt-2 text-3xl font-black text-emerald-700">
                    82%
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
