import { ArrowUpRight, MapPinned, ShieldAlert } from "lucide-react";

export default function RiskMapPreview() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-100 p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <MapPinned size={14} />
              Geographic Intelligence
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-800">
              Peta Risiko Pendidikan
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
              Visualisasi wilayah prioritas pendidikan berdasarkan analisis AI
              dan distribusi sekolah berisiko di Kota Bandung.
            </p>
          </div>

          {/* Right */}
          <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
            <ArrowUpRight size={18} />
            Lihat Peta Lengkap
          </button>
        </div>
      </div>

      {/* Map Section */}
      <div className="relative p-6">
        {/* Floating Info */}
        <div className="absolute right-10 top-10 z-10 hidden w-[240px] rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-lg backdrop-blur xl:block">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-100 text-red-700">
              <ShieldAlert size={20} />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Highest Risk
              </p>

              <h3 className="mt-1 text-lg font-bold tracking-tight text-slate-800">
                Kecamatan Coblong
              </h3>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="text-xs font-medium text-slate-500">Risk Score</p>

              <h4 className="mt-2 text-2xl font-bold tracking-tight text-red-600">
                92
              </h4>
            </div>

            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="text-xs font-medium text-slate-500">Schools</p>

              <h4 className="mt-2 text-2xl font-bold tracking-tight text-slate-800">
                24
              </h4>
            </div>
          </div>
        </div>

        {/* Fake Map */}
        <div className="relative flex h-[420px] items-center justify-center overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-red-100 via-yellow-50 to-emerald-100">
          {/* Glow */}
          <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-red-400/20 blur-3xl"></div>

          <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl"></div>

          {/* Content */}
          <div className="relative text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[30px] border border-white/50 bg-white/60 shadow-lg backdrop-blur">
              <MapPinned size={42} className="text-blue-700" />
            </div>

            <h3 className="mt-6 text-2xl font-bold tracking-tight text-slate-800">
              Interactive Choropleth Map
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600">
              Monitoring wilayah prioritas pendidikan berbasis geographic
              intelligence dan AI risk prediction.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 px-6 py-5">
        <div className="flex flex-wrap items-center gap-6 text-sm">
          {/* High */}
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>

            <span className="font-medium text-slate-700">Risiko Tinggi</span>
          </div>

          {/* Medium */}
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>

            <span className="font-medium text-slate-700">Risiko Sedang</span>
          </div>

          {/* Low */}
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-emerald-500"></div>

            <span className="font-medium text-slate-700">Risiko Rendah</span>
          </div>
        </div>
      </div>
    </div>
  );
}
