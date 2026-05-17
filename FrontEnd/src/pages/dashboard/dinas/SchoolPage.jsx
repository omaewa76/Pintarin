import {
  CheckCircle2,
  Clock3,
  Eye,
  Search,
  XCircle,
} from "lucide-react";

const schoolData = [
  {
    name: "SD Negeri Coblong 01",
    district: "Coblong",
    date: "17 Mei 2026",
    update: "Data Siswa Rentan",
    status: "Pending",
  },
  {
    name: "SMP Negeri 05 Bandung",
    district: "Kiaracondong",
    date: "16 Mei 2026",
    update: "Perubahan Infrastruktur",
    status: "Approved",
  },
  {
    name: "SD Negeri Sukajadi 03",
    district: "Sukajadi",
    date: "15 Mei 2026",
    update: "Data Bantuan",
    status: "Rejected",
  },
];

export default function SchoolPage() {
  return (
    <div>

      {/* Header */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

        {/* Left */}
        <div>

          <p className="text-sm font-medium text-slate-500">
            Monitoring & approval data sekolah
          </p>

          <div className="mt-2 flex items-center gap-3">

            <h1 className="text-4xl font-bold tracking-tight text-slate-800">
              Verifikasi Data Sekolah
            </h1>

            <div className="rounded-full bg-red-100 px-4 py-2 text-sm font-bold text-red-600">

              12 Pending

            </div>

          </div>

        </div>

      </div>

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap gap-3">

        <button className="rounded-2xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white">

          Menunggu Verifikasi

        </button>

        <button className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">

          Sudah Diverifikasi

        </button>

        <button className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">

          Ditolak

        </button>

      </div>

      {/* Filter */}
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="grid gap-4 xl:grid-cols-4">

          {/* Search */}
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 xl:col-span-2">

            <Search size={18} className="text-slate-400" />

            <input
              type="text"
              placeholder="Cari sekolah..."
              className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400"
            />

          </div>

          {/* Filter */}
          <button className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">

            Semua Kecamatan

          </button>

          <button className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">

            Semua Status

          </button>

        </div>

      </div>

      {/* Table */}
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold text-slate-800">
              Data Menunggu Verifikasi
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Approval perubahan data sekolah dari sistem
            </p>

          </div>

        </div>

        {/* Table */}
        <div className="mt-6 overflow-x-auto">

          <table className="w-full border-separate border-spacing-y-3">

            <thead>

              <tr>

                <th className="px-4 text-left text-sm font-semibold text-slate-500">
                  Nama Sekolah
                </th>

                <th className="px-4 text-left text-sm font-semibold text-slate-500">
                  Kecamatan
                </th>

                <th className="px-4 text-left text-sm font-semibold text-slate-500">
                  Tanggal Submit
                </th>

                <th className="px-4 text-left text-sm font-semibold text-slate-500">
                  Jenis Update
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

              {schoolData.map((school, index) => (
                <tr
                  key={index}
                  className="bg-slate-50 transition hover:bg-slate-100"
                >

                  {/* School */}
                  <td className="rounded-l-2xl px-4 py-4">

                    <div>

                      <h3 className="font-semibold text-slate-800">
                        {school.name}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Data terbaru dikirim sekolah
                      </p>

                    </div>

                  </td>

                  {/* District */}
                  <td className="px-4 py-4 text-sm text-slate-700">
                    {school.district}
                  </td>

                  {/* Date */}
                  <td className="px-4 py-4 text-sm text-slate-700">
                    {school.date}
                  </td>

                  {/* Update */}
                  <td className="px-4 py-4 text-sm font-medium text-slate-700">
                    {school.update}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">

                    <div
                      className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold
                      
                      ${
                        school.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : school.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }
                      
                      `}
                    >

                      {school.status === "Pending" && (
                        <Clock3 size={16} />
                      )}

                      {school.status === "Approved" && (
                        <CheckCircle2 size={16} />
                      )}

                      {school.status === "Rejected" && (
                        <XCircle size={16} />
                      )}

                      {school.status}

                    </div>

                  </td>

                  {/* Action */}
                  <td className="rounded-r-2xl px-4 py-4 text-right">

                    <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">

                      <Eye size={18} />

                      Tinjau

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