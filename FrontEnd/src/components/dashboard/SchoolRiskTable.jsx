import { ArrowUpRight, Eye, ShieldAlert } from "lucide-react";

const schools = [
  {
    name: "SD Negeri Coblong 01",
    district: "Coblong",
    risk: 92,
    status: "Tinggi",
    students: 812,
    updated: "2 jam lalu",
  },

  {
    name: "SMP Negeri 05 Bandung",
    district: "Kiaracondong",
    risk: 88,
    status: "Tinggi",
    students: 721,
    updated: "Hari ini",
  },

  {
    name: "SD Negeri Sukajadi 03",
    district: "Sukajadi",
    risk: 84,
    status: "Sedang",
    students: 603,
    updated: "Kemarin",
  },

  {
    name: "SMP Negeri Antapani 02",
    district: "Antapani",
    risk: 81,
    status: "Tinggi",
    students: 534,
    updated: "2 hari lalu",
  },
];

export default function SchoolRiskTable() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-100 p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
              <ShieldAlert size={14} />
              High Risk Monitoring
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-800">
              Sekolah Prioritas Tinggi
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Monitoring sekolah dengan risk score tertinggi berdasarkan
              analisis AI terbaru.
            </p>
          </div>

          {/* Right */}
          <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
            <ArrowUpRight size={18} />
            Lihat Semua Data
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead className="border-b border-slate-100 bg-slate-50/80">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Sekolah
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Kecamatan
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Siswa
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Risk Score
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
            {schools.map((school, index) => (
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
                      Diperbarui {school.updated}
                    </p>
                  </div>
                </td>

                {/* District */}
                <td className="px-6 py-5 text-sm font-medium text-slate-700">
                  {school.district}
                </td>

                {/* Students */}
                <td className="px-6 py-5 text-sm font-medium text-slate-700">
                  {school.students}
                </td>

                {/* Risk */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-red-500"
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

                {/* Status */}
                <td className="px-6 py-5">
                  <div
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold
                      
                      ${
                        school.status === "Tinggi"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                      
                    `}
                  >
                    {school.status}
                  </div>
                </td>

                {/* Action */}
                <td className="px-6 py-5 text-right">
                  <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
