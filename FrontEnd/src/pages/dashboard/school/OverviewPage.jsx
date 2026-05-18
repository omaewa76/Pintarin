import {
  ArrowUpRight,
  Brain,
  Building2,
  CalendarDays,
  GraduationCap,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="overflow-hidden rounded-[36px] border border-slate-200 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 p-8 text-white shadow-sm">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <Sparkles size={16} />
              School Intelligence Dashboard
            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-tight tracking-tight">
              SD Negeri Coblong 01
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-300">
              Monitoring kondisi sekolah, analisis risiko pendidikan, dan
              distribusi bantuan berbasis AI secara realtime.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-sm font-semibold backdrop-blur transition hover:bg-white/20">
              <ArrowUpRight size={18} />
              School Analytics
            </button>

            <button className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-4 text-sm font-semibold transition hover:bg-emerald-600">
              <Building2 size={18} />
              Update Data
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
                  Total Siswa
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
                  812
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-100 text-blue-700">
                <GraduationCap size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              <TrendingUp size={12} />
              +24 siswa baru
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Risk Score</p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-red-600">
                  92
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-red-100 text-red-700">
                <ShieldAlert size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              Prioritas tinggi
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Bantuan Diterima
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-emerald-600">
                  Rp 120 JT
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                <Wallet size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              CSR aktif
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Last Update
                </p>

                <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900">
                  17 Mei
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-indigo-100 text-indigo-700">
                <CalendarDays size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
              Data terbaru
            </div>
          </div>
        </div>
      </section>

      {/* AI Insight */}
      <section>
        <div className="grid gap-6 xl:grid-cols-3">
          {/* Main */}
          <div className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-100 text-blue-700">
                <Brain size={28} />
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                  AI School Insight
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Analisis AI terhadap kondisi sekolah terbaru.
                </p>
              </div>
            </div>

            {/* AI Card */}
            <div className="mt-8 rounded-3xl bg-gradient-to-br from-red-50 to-orange-50 p-6">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                {/* Left */}
                <div>
                  <div className="inline-flex rounded-full bg-red-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-700">
                    High Risk Detected
                  </div>

                  <h3 className="mt-5 text-3xl font-black tracking-tight text-slate-800">
                    Infrastruktur Sekolah Membutuhkan Perhatian
                  </h3>

                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">
                    Sistem AI mendeteksi penurunan kondisi ruang kelas dan
                    peningkatan siswa rentan selama 3 bulan terakhir.
                  </p>
                </div>

                {/* Score */}
                <div className="rounded-3xl bg-white px-8 py-6 text-center shadow-sm">
                  <p className="text-sm font-medium text-slate-500">AI Score</p>

                  <h2 className="mt-2 text-6xl font-black text-red-600">92</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-800 p-6 text-white shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10">
              <Sparkles size={28} />
            </div>

            <h2 className="mt-8 text-3xl font-black tracking-tight">
              Recommendation
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-blue-100">
              AI merekomendasikan prioritas bantuan renovasi ruang kelas dan
              perangkat digital untuk semester ini.
            </p>

            {/* Recommendations */}
            <div className="mt-8 space-y-4">
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <h3 className="font-bold">Renovasi Infrastruktur</h3>

                <p className="mt-2 text-sm text-blue-100">
                  Prioritas utama semester ini
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <h3 className="font-bold">Bantuan Perangkat</h3>

                <p className="mt-2 text-sm text-blue-100">
                  Penguatan digital learning
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <h3 className="font-bold">Program Beasiswa</h3>

                <p className="mt-2 text-sm text-blue-100">
                  Dukungan siswa rentan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
