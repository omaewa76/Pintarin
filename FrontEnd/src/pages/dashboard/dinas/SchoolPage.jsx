import {
  ArrowUpRight,
  Brain,
  CheckCircle2,
  Clock3,
  Eye,
  Search,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  XCircle,
} from "lucide-react";

const schoolData = [
  {
    name: "SD Negeri Coblong 01",
    district: "Coblong",
    date: "17 Mei 2026",
    update: "Data Siswa Rentan",
    status: "Pending",
    risk: 92,
    students: 812,
  },

  {
    name: "SMP Negeri 05 Bandung",
    district: "Kiaracondong",
    date: "16 Mei 2026",
    update: "Perubahan Infrastruktur",
    status: "Approved",
    risk: 88,
    students: 721,
  },

  {
    name: "SD Negeri Sukajadi 03",
    district: "Sukajadi",
    date: "15 Mei 2026",
    update: "Data Bantuan",
    status: "Rejected",
    risk: 76,
    students: 603,
  },

  {
    name: "SMP Negeri Antapani 02",
    district: "Antapani",
    date: "14 Mei 2026",
    update: "Data Infrastruktur",
    status: "Pending",
    risk: 84,
    students: 534,
  },
];

export default function SchoolPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="overflow-hidden rounded-[36px] border border-slate-200 bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 p-8 text-white shadow-sm">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <Sparkles size={16} />
              School Intelligence Management
            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-tight tracking-tight">
              Monitoring & Verifikasi Sekolah
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-300">
              Monitoring data sekolah, validasi perubahan, dan analisis risiko
              pendidikan berbasis AI secara realtime.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-sm font-semibold backdrop-blur transition hover:bg-white/20">
              <ArrowUpRight size={18} />
              Lihat Analytics
            </button>

            <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-semibold transition hover:bg-blue-700">
              <ShieldAlert size={18} />
              Export Data
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
                  Total Sekolah
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
                  2,341
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-100 text-blue-700">
                <Brain size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              <TrendingUp size={12} />
              +12 sekolah minggu ini
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Pending Review
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-yellow-600">
                  12
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-yellow-100 text-yellow-700">
                <Clock3 size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
              Perlu diverifikasi
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Approved</p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-emerald-600">
                  184
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                <CheckCircle2 size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Data tervalidasi
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Risiko Tinggi
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-red-600">
                  328
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-red-100 text-red-700">
                <ShieldAlert size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              Prioritas bantuan
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-2xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white">
            Menunggu Verifikasi
          </button>

          <button className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            Sudah Diverifikasi
          </button>

          <button className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            Ditolak
          </button>
        </div>
      </section>

      {/* Filter */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 xl:grid-cols-4">
          {/* Search */}
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 xl:col-span-2">
            <Search size={18} className="text-slate-400" />

            <input
              type="text"
              placeholder="Cari sekolah..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Filter */}
          <button className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            Semua Kecamatan
          </button>

          <button className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            Semua Status
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
                School Verification Queue
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Monitoring perubahan data dan approval sekolah.
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
          <table className="w-full min-w-[1100px]">
            <thead className="border-b border-slate-100 bg-slate-50/70">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Sekolah
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Kecamatan
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Risk Score
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Siswa
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Jenis Update
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
              {schoolData.map((school, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >
                  {/* School */}
                  <td className="px-6 py-5">
                    <div>
                      <h3 className="font-semibold tracking-tight text-slate-800">
                        {school.name}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Submit {school.date}
                      </p>
                    </div>
                  </td>

                  {/* District */}
                  <td className="px-6 py-5 text-sm font-medium text-slate-700">
                    {school.district}
                  </td>

                  {/* Risk */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className={`h-full rounded-full
                              
                              ${
                                school.risk >= 85
                                  ? "bg-red-500"
                                  : school.risk >= 75
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                              }
                              
                            `}
                          style={{
                            width: `${school.risk}%`,
                          }}
                        ></div>
                      </div>

                      <span className="text-sm font-bold text-slate-800">
                        {school.risk}
                      </span>
                    </div>
                  </td>

                  {/* Students */}
                  <td className="px-6 py-5 text-sm font-medium text-slate-700">
                    {school.students}
                  </td>

                  {/* Update */}
                  <td className="px-6 py-5 text-sm font-medium text-slate-700">
                    {school.update}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <div
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold
                        
                        ${
                          school.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : school.status === "Approved"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-700"
                        }
                        
                        `}
                    >
                      {school.status === "Pending" && <Clock3 size={14} />}

                      {school.status === "Approved" && (
                        <CheckCircle2 size={14} />
                      )}

                      {school.status === "Rejected" && <XCircle size={14} />}

                      {school.status}
                    </div>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-5 text-right">
                    <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                      <Eye size={18} />
                      Review
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
