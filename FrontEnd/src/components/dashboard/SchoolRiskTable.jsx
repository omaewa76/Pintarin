import { Eye } from "lucide-react";

const schools = [
  {
    name: "SD Negeri Coblong 01",
    district: "Coblong",
    risk: "92",
    status: "Tinggi",
  },
  {
    name: "SMP Negeri 05 Bandung",
    district: "Kiaracondong",
    risk: "88",
    status: "Tinggi",
  },
  {
    name: "SD Negeri Sukajadi 03",
    district: "Sukajadi",
    risk: "84",
    status: "Sedang",
  },
  {
    name: "SMP Negeri Antapani 02",
    district: "Antapani",
    risk: "81",
    status: "Tinggi",
  },
];

export default function SchoolRiskTable() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Sekolah Risiko Tinggi
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Monitoring sekolah dengan risk score tertinggi
          </p>

        </div>

        <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">

          Lihat Semua

        </button>

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
                Risk Score
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

            {schools.map((school, index) => (
              <tr
                key={index}
                className="rounded-2xl bg-slate-50 transition hover:bg-slate-100"
              >

                <td className="rounded-l-2xl px-4 py-4">

                  <div>

                    <h3 className="font-semibold text-slate-800">
                      {school.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Data diperbarui hari ini
                    </p>

                  </div>

                </td>

                <td className="px-4 py-4 text-sm font-medium text-slate-700">
                  {school.district}
                </td>

                <td className="px-4 py-4">

                  <div className="inline-flex rounded-xl bg-red-100 px-3 py-2 text-sm font-bold text-red-600">

                    {school.risk}

                  </div>

                </td>

                <td className="px-4 py-4">

                  <div
                    className={`inline-flex rounded-xl px-3 py-2 text-sm font-semibold
                      
                      ${
                        school.status === "Tinggi"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-700"
                      }
                      
                    `}
                  >

                    {school.status}

                  </div>

                </td>

                <td className="rounded-r-2xl px-4 py-4 text-right">

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