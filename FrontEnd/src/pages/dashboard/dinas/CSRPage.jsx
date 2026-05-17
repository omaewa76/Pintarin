import {
  Building2,
  CheckCircle2,
  Clock3,
  Eye,
  Search,
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
  },
  {
    company: "PT Edu Teknologi",
    school: "SMP Negeri 05 Bandung",
    type: "Laptop & Komputer",
    value: "Rp 85 JT",
    date: "15 Mei 2026",
    status: "Approved",
  },
  {
    company: "PT Nusantara Digital",
    school: "SD Negeri Sukajadi 03",
    type: "Beasiswa Pendidikan",
    value: "Rp 45 JT",
    date: "14 Mei 2026",
    status: "Rejected",
  },
];

export default function CSRPage() {
  return (
    <div>

      {/* Header */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

        {/* Left */}
        <div>

          <p className="text-sm font-medium text-slate-500">
            Monitoring & approval bantuan CSR
          </p>

          <div className="mt-2 flex items-center gap-3">

            <h1 className="text-4xl font-bold tracking-tight text-slate-800">
              Persetujuan Bantuan CSR
            </h1>

            <div className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-bold text-yellow-700">

              8 Pending

            </div>

          </div>

        </div>

      </div>

      {/* Filter */}
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="grid gap-4 xl:grid-cols-5">

          {/* Search */}
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 xl:col-span-2">

            <Search size={18} className="text-slate-400" />

            <input
              type="text"
              placeholder="Cari perusahaan CSR atau sekolah..."
              className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400"
            />

          </div>

          {/* Filters */}
          <button className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">

            Semua Status

          </button>

          <button className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">

            Semua Jenis

          </button>

          <button className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">

            Tahun 2026

          </button>

        </div>

      </div>

      {/* Table */}
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold text-slate-800">
              Pengajuan Bantuan CSR
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Daftar pengajuan bantuan dari perusahaan CSR
            </p>

          </div>

        </div>

        {/* Table */}
        <div className="mt-6 overflow-x-auto">

          <table className="w-full border-separate border-spacing-y-3">

            <thead>

              <tr>

                <th className="px-4 text-left text-sm font-semibold text-slate-500">
                  Perusahaan CSR
                </th>

                <th className="px-4 text-left text-sm font-semibold text-slate-500">
                  Sekolah Tujuan
                </th>

                <th className="px-4 text-left text-sm font-semibold text-slate-500">
                  Jenis Bantuan
                </th>

                <th className="px-4 text-left text-sm font-semibold text-slate-500">
                  Nilai Bantuan
                </th>

                <th className="px-4 text-left text-sm font-semibold text-slate-500">
                  Status
                </th>

                <th className="px-4 text-right text-sm font-semibold text-slate-500">
                  Aksi
                </th>

              </tr>

            </thead>

            <tbody>

              {csrRequests.map((csr, index) => (
                <tr
                  key={index}
                  className="bg-slate-50 transition hover:bg-slate-100"
                >

                  {/* CSR */}
                  <td className="rounded-l-2xl px-4 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">

                        <Building2 size={20} />

                      </div>

                      <div>

                        <h3 className="font-semibold text-slate-800">
                          {csr.company}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Submit {csr.date}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* School */}
                  <td className="px-4 py-4 text-sm font-medium text-slate-700">
                    {csr.school}
                  </td>

                  {/* Type */}
                  <td className="px-4 py-4 text-sm text-slate-700">
                    {csr.type}
                  </td>

                  {/* Value */}
                  <td className="px-4 py-4">

                    <div className="inline-flex rounded-xl bg-green-100 px-3 py-2 text-sm font-bold text-green-700">

                      {csr.value}

                    </div>

                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">

                    <div
                      className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold
                      
                      ${
                        csr.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : csr.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }
                      
                      `}
                    >

                      {csr.status === "Pending" && (
                        <Clock3 size={16} />
                      )}

                      {csr.status === "Approved" && (
                        <CheckCircle2 size={16} />
                      )}

                      {csr.status === "Rejected" && (
                        <XCircle size={16} />
                      )}

                      {csr.status}

                    </div>

                  </td>

                  {/* Action */}
                  <td className="rounded-r-2xl px-4 py-4 text-right">

                    <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">

                      <Eye size={18} />

                      Detail

                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}