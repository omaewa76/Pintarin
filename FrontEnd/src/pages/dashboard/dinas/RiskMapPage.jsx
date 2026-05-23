import { useState } from "react";

import BandungMap from "../../../components/dashboard/BandungMap";

import riskDistrictData from "../../../data/riskDistrictData";

import { ChevronDown, MapPinned, TriangleAlert } from "lucide-react";

export default function RiskMapPage() {
  const [selectedDistrict, setSelectedDistrict] = useState(riskDistrictData[0]);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="overflow-hidden rounded-[36px] border border-slate-200 bg-gradient-to-br from-red-950 via-slate-900 to-orange-900 p-8 text-white shadow-sm">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <TriangleAlert size={16} />
              Education Risk Intelligence
            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-tight tracking-tight">
              Peta Risiko Pendidikan
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-300">
              Visualisasi wilayah prioritas pendidikan berbasis AI untuk
              mendeteksi sekolah dengan tingkat risiko tertinggi secara
              realtime.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-sm font-semibold backdrop-blur transition hover:bg-white/20">
              <MapPinned size={18} />
              Live Monitoring
            </button>

            <button className="inline-flex items-center gap-2 rounded-2xl bg-red-500 px-5 py-4 text-sm font-semibold transition hover:bg-red-600">
              <MapPinned size={18} />
              Export Peta
            </button>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <button className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            Semua Tingkatan
            <ChevronDown size={18} />
          </button>

          <button className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            Tahun 2026
            <ChevronDown size={18} />
          </button>

          <button className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            Per Kecamatan
            <ChevronDown size={18} />
          </button>

          <button className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            Semua Status
            <ChevronDown size={18} />
          </button>
        </div>
      </section>

      {/* Main Grid */}
      <section className="grid gap-6 xl:grid-cols-3">
        {/* Map */}
        <div className="xl:col-span-2">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {/* Header */}
            <div className="border-b border-slate-100 p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                    Choropleth Risk Map
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Visualisasi wilayah berdasarkan AI risk score pendidikan.
                  </p>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-5 text-sm">
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
            </div>

            {/* Map */}
            <div className="h-[550px] overflow-hidden">
              <BandungMap />
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                <TriangleAlert size={12} />
                PRIORITAS TINGGI
              </div>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-800">
                {selectedDistrict.name}
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Wilayah dengan peningkatan risiko pendidikan signifikan minggu
                ini.
              </p>
            </div>

            {/* Risk Banner */}
            <div className="mt-6 rounded-3xl bg-gradient-to-br from-red-500 to-orange-500 p-5 text-white">
              <p className="text-sm font-medium text-red-100">AI Risk Score</p>

              <h2 className="mt-2 text-5xl font-black">
                {selectedDistrict.risk}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-red-100">
                AI mendeteksi peningkatan sekolah prioritas bantuan di wilayah
                ini.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4">
                <span className="text-sm text-slate-500">Sekolah Risiko</span>

                <span className="text-lg font-bold text-slate-800">
                  {selectedDistrict.schools}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4">
                <span className="text-sm text-slate-500">Siswa Rentan</span>

                <span className="text-lg font-bold text-slate-800">
                  {selectedDistrict.students}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4">
                <span className="text-sm text-slate-500">Bantuan Diterima</span>

                <span className="text-lg font-bold text-slate-800">
                  {selectedDistrict.aid}
                </span>
              </div>
            </div>

            {/* Recommendation */}
            <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-5">
              <h3 className="text-sm font-bold text-red-700">Rekomendasi AI</h3>

              <p className="mt-3 text-sm leading-relaxed text-red-600">
                Prioritaskan bantuan infrastruktur sekolah dan distribusi
                perangkat digital untuk wilayah ini.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ranking Table */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-slate-100 p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                Ranking Kecamatan
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Urutan wilayah berdasarkan AI risk score tertinggi.
              </p>
            </div>

            <button className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Export Data
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="border-b border-slate-100 bg-slate-50/70">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Kecamatan
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Risk Score
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Sekolah Risiko
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Siswa Rentan
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Bantuan
                </th>
              </tr>
            </thead>

            <tbody>
              {riskDistrictData.map((district, index) => (
                <tr
                  key={index}
                  onClick={() => setSelectedDistrict(district)}
                  className="cursor-pointer border-b border-slate-100 transition hover:bg-slate-50"
                >
                  <td className="px-6 py-5 font-semibold text-slate-800">
                    {district.name}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className={`h-full rounded-full
                          
                          ${
                            district.risk >= 85
                              ? "bg-red-500"
                              : district.risk >= 75
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }
                          
                          `}
                          style={{
                            width: `${district.risk}%`,
                          }}
                        ></div>
                      </div>

                      <span className="text-sm font-bold text-slate-800">
                        {district.risk}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-sm font-medium text-slate-700">
                    {district.schools}
                  </td>

                  <td className="px-6 py-5 text-sm font-medium text-slate-700">
                    {district.students}
                  </td>

                  <td className="px-6 py-5 text-sm font-semibold text-slate-800">
                    {district.aid}
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
