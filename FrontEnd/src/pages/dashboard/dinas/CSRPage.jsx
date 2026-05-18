import {
  ArrowUpRight,
  Brain,
  Building2,
  CheckCircle2,
  Clock3,
  Eye,
  HandCoins,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
  XCircle,
} from "lucide-react";

const csrRequests = [
  {
    company: "PT Maju Jaya",
    school: "SD Negeri Coblong 01",
    type: "Renovasi Ruang Kelas",
    value: "Rp 120 JT",
    date: "17 Mei 2026",
    status: "Pending",
    priority: "High",
  },

  {
    company: "PT Edu Teknologi",
    school: "SMP Negeri 05 Bandung",
    type: "Laptop & Komputer",
    value: "Rp 85 JT",
    date: "15 Mei 2026",
    status: "Approved",
    priority: "Medium",
  },

  {
    company: "PT Nusantara Digital",
    school: "SD Negeri Sukajadi 03",
    type: "Beasiswa Pendidikan",
    value: "Rp 45 JT",
    date: "14 Mei 2026",
    status: "Rejected",
    priority: "Low",
  },

  {
    company: "PT Smart Future",
    school: "SMP Negeri Antapani 02",
    type: "Perangkat Digital",
    value: "Rp 95 JT",
    date: "13 Mei 2026",
    status: "Pending",
    priority: "High",
  },
];

export default function CSRPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="overflow-hidden rounded-[36px] border border-slate-200 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 p-8 text-white shadow-sm">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <Sparkles size={16} />
              CSR Intelligence System
            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-tight tracking-tight">
              Monitoring & Distribusi Bantuan CSR
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-300">
              Platform monitoring distribusi bantuan CSR berbasis AI untuk
              memastikan bantuan pendidikan lebih tepat sasaran dan transparan.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-sm font-semibold backdrop-blur transition hover:bg-white/20">
              <ArrowUpRight size={18} />
              CSR Analytics
            </button>

            <button className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-4 text-sm font-semibold transition hover:bg-emerald-600">
              <HandCoins size={18} />
              Export Report
            </button>
          </div>
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
                  Total Bantuan
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
                  Rp 1.2 M
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                <Wallet size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              <TrendingUp size={12} />
              +18% bulan ini
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Pending Approval
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-yellow-600">
                  8
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-yellow-100 text-yellow-700">
                <Clock3 size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
              Menunggu verifikasi
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Approved</p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-emerald-600">
                  124
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                <CheckCircle2 size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Bantuan disetujui
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  AI Matching
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
                  96%
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-100 text-blue-700">
                <Brain size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              Smart recommendation
            </div>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 xl:grid-cols-5">
          {/* Search */}
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 xl:col-span-2">
            <Search size={18} className="text-slate-400" />

            <input
              type="text"
              placeholder="Cari perusahaan CSR atau sekolah..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Filter */}
          <button className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            Semua Status
          </button>

          <button className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            Semua Jenis
          </button>

          <button className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            Tahun 2026
          </button>
        </div>
      </section>

      {/* Table */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-slate-100 p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                CSR Distribution Queue
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Monitoring pengajuan bantuan CSR dan approval distribusi.
              </p>
            </div>

            <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              <ArrowUpRight size={18} />
              Export Table
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="border-b border-slate-100 bg-slate-50/70">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Perusahaan CSR
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Sekolah Tujuan
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Jenis Bantuan
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Nilai Bantuan
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Priority
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {csrRequests.map((csr, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >
                  {/* CSR */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                        <Building2 size={22} />
                      </div>

                      <div>
                        <h3 className="font-semibold tracking-tight text-slate-800">
                          {csr.company}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Submit {csr.date}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* School */}
                  <td className="px-6 py-5 text-sm font-medium text-slate-700">
                    {csr.school}
                  </td>

                  {/* Type */}
                  <td className="px-6 py-5 text-sm font-medium text-slate-700">
                    {csr.type}
                  </td>

                  {/* Value */}
                  <td className="px-6 py-5">
                    <div className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {csr.value}
                    </div>
                  </td>

                  {/* Priority */}
                  <td className="px-6 py-5">
                    <div
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold
                        
                        ${
                          csr.priority === "High"
                            ? "bg-red-100 text-red-700"
                            : csr.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-emerald-100 text-emerald-700"
                        }
                        
                        `}
                    >
                      {csr.priority}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <div
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold
                        
                        ${
                          csr.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : csr.status === "Approved"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-700"
                        }
                        
                        `}
                    >
                      {csr.status === "Pending" && <Clock3 size={14} />}

                      {csr.status === "Approved" && <ShieldCheck size={14} />}

                      {csr.status === "Rejected" && <XCircle size={14} />}

                      {csr.status}
                    </div>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-5 text-right">
                    <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                      <Eye size={18} />
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
