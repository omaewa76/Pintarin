import BandungMap from "../../../components/dashboard/BandungMap";
import { ChevronDown, MapPinned, TriangleAlert } from "lucide-react";

const districts = [
  {
    name: "Coblong",
    risk: 92,
    schools: 34,
    students: 1240,
    aid: "Rp 120 JT",
  },
  {
    name: "Kiaracondong",
    risk: 88,
    schools: 28,
    students: 980,
    aid: "Rp 98 JT",
  },
  {
    name: "Antapani",
    risk: 84,
    schools: 25,
    students: 870,
    aid: "Rp 75 JT",
  },
  {
    name: "Lengkong",
    risk: 81,
    schools: 22,
    students: 810,
    aid: "Rp 62 JT",
  },
];

export default function RiskMapPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* Left */}
        <div>
          <p className="text-sm font-medium text-slate-500">
            Analisis wilayah pendidikan
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-800">
            Peta Risiko Pendidikan
          </h1>
        </div>

        {/* Right */}
        <button className="flex items-center gap-2 rounded-2xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800">
          <MapPinned size={18} />
          Export Peta
        </button>
      </div>

      {/* Filter */}
      <div className="mt-8 grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2 xl:grid-cols-4">
        {/* Filter Item */}
        <button className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
          Semua Tingkatan
          <ChevronDown size={18} />
        </button>

        <button className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
          Tahun 2026
          <ChevronDown size={18} />
        </button>

        <button className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
          Per Kecamatan
          <ChevronDown size={18} />
        </button>

        <button className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
          Semua Status
          <ChevronDown size={18} />
        </button>
      </div>

      {/* Main Grid */}
      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        {/* Map */}
        <div className="xl:col-span-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Top */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Choropleth Risk Map
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Visualisasi wilayah berdasarkan risk score pendidikan
                </p>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  Tinggi
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  Sedang
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  Rendah
                </div>
              </div>
            </div>
            
            {/* Real Map */}
            <div className="mt-6 h-[500px] overflow-hidden rounded-3xl">
              <BandungMap />
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Detail Kecamatan
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Informasi wilayah terpilih
              </p>
            </div>

            {/* Detail */}
            <div className="mt-6 rounded-2xl bg-red-50 p-5">
              <h3 className="text-lg font-bold text-red-700">
                Kecamatan Coblong
              </h3>

              <p className="mt-2 text-sm text-red-600">
                Risk score sangat tinggi minggu ini
              </p>
            </div>

            {/* Stats */}
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-500">Risk Score</span>

                <span className="font-bold text-red-600">92</span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-500">Sekolah Risiko</span>

                <span className="font-bold text-slate-800">34</span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-500">Siswa Rentan</span>

                <span className="font-bold text-slate-800">1,240</span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-500">Bantuan Diterima</span>

                <span className="font-bold text-slate-800">Rp 120 JT</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ranking Table */}
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Ranking Kecamatan
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Urutan wilayah berdasarkan risk score tertinggi
            </p>
          </div>

          <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">
            Export Data
          </button>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-3">
            <thead>
              <tr>
                <th className="px-4 text-left text-sm font-semibold text-slate-500">
                  Kecamatan
                </th>

                <th className="px-4 text-left text-sm font-semibold text-slate-500">
                  Risk Score
                </th>

                <th className="px-4 text-left text-sm font-semibold text-slate-500">
                  Sekolah Risiko
                </th>

                <th className="px-4 text-left text-sm font-semibold text-slate-500">
                  Siswa Rentan
                </th>

                <th className="px-4 text-left text-sm font-semibold text-slate-500">
                  Bantuan
                </th>
              </tr>
            </thead>

            <tbody>
              {districts.map((district, index) => (
                <tr
                  key={index}
                  className="bg-slate-50 transition hover:bg-slate-100"
                >
                  <td className="rounded-l-2xl px-4 py-4 font-semibold text-slate-800">
                    {district.name}
                  </td>

                  <td className="px-4 py-4">
                    <div className="inline-flex rounded-xl bg-red-100 px-3 py-2 text-sm font-bold text-red-600">
                      {district.risk}
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700">
                    {district.schools}
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700">
                    {district.students}
                  </td>

                  <td className="rounded-r-2xl px-4 py-4 text-sm font-semibold text-slate-800">
                    {district.aid}
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
