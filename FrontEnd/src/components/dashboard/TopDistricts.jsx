import { ArrowUpRight, ShieldAlert } from "lucide-react";

const districts = [
  {
    name: "Coblong",
    risk: 92,
    schools: 34,
    trend: "+12%",
  },

  {
    name: "Kiaracondong",
    risk: 88,
    schools: 28,
    trend: "+8%",
  },

  {
    name: "Antapani",
    risk: 84,
    schools: 25,
    trend: "+6%",
  },

  {
    name: "Lengkong",
    risk: 81,
    schools: 22,
    trend: "+4%",
  },

  {
    name: "Sukajadi",
    risk: 79,
    schools: 19,
    trend: "+2%",
  },
];

export default function TopDistricts() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-100 p-6">
        <div className="flex items-start justify-between gap-4">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
              <ShieldAlert size={14} />
              High Risk Area
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-800">
              Ranking Kecamatan
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Wilayah dengan tingkat risiko pendidikan tertinggi berdasarkan
              analisis AI terbaru.
            </p>
          </div>

          {/* Right */}
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50">
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="p-6">
        <div className="space-y-4">
          {districts.map((district, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-slate-100 bg-slate-50/70 p-5 transition-all duration-300 hover:border-slate-200 hover:bg-white hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Left */}
                <div className="flex items-start gap-4">
                  {/* Rank */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sm font-bold text-slate-700 shadow-sm">
                    #{index + 1}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-slate-800">
                      {district.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {district.schools} sekolah berisiko
                    </p>

                    {/* Trend */}
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      {district.trend} bulan ini
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="text-right">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Risk Score
                  </p>

                  <h2 className="mt-2 text-4xl font-black tracking-tight text-red-600">
                    {district.risk}
                  </h2>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-5">
                <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-500"
                    style={{
                      width: `${district.risk}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
