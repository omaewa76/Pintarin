import {
  BadgeCheck,
  Brain,
  Sparkles,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";

export default function AIInsightPanel() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-100 p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-100">
              <Brain size={28} />
            </div>

            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                AI Intelligence Active
              </div>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-800">
                AI Risk Prediction
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
                Analisis risiko pendidikan berbasis AI untuk membantu prioritas
                distribusi bantuan dan monitoring sekolah rentan.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Model Accuracy
            </p>

            <div className="mt-3 flex items-center gap-3">
              <h3 className="text-3xl font-bold tracking-tight text-slate-800">
                96%
              </h3>

              <div className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                <TrendingUp size={12} />
                +2.4%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Prediction */}
      <div className="border-b border-slate-100 bg-gradient-to-br from-red-50 via-orange-50 to-white p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
              <ShieldAlert size={16} />
              Prioritas Risiko Tinggi
            </div>

            <h3 className="mt-5 text-[32px] font-bold tracking-tight text-slate-800">
              SD Negeri Coblong 01
            </h3>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">
              Sistem AI mendeteksi peningkatan signifikan jumlah siswa rentan
              dan penurunan kondisi infrastruktur sekolah selama 3 bulan
              terakhir. Sekolah ini direkomendasikan menjadi prioritas utama
              distribusi bantuan semester ini.
            </p>
          </div>

          {/* Score */}
          <div className="flex flex-col items-center rounded-3xl border border-red-100 bg-white px-8 py-7 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Risk Score</p>

            <h2 className="mt-3 text-6xl font-black tracking-tight text-red-600">
              92
            </h2>

            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-red-500">
              HIGH RISK
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid gap-6 p-6 xl:grid-cols-3">
        {/* Recommendation */}
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <Sparkles size={22} />
            </div>

            <div>
              <h3 className="text-lg font-bold tracking-tight text-slate-800">
                Rekomendasi AI
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Action recommendation
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-sm leading-relaxed text-slate-600">
              Prioritaskan bantuan renovasi ruang kelas, program bantuan siswa
              rentan, dan perangkat digital pembelajaran semester ini.
            </p>
          </div>
        </div>

        {/* Confidence */}
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <BadgeCheck size={22} />
            </div>

            <div>
              <h3 className="text-lg font-bold tracking-tight text-slate-800">
                Confidence Score
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Prediction reliability
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-end gap-2">
              <h2 className="text-6xl font-black tracking-tight text-slate-800">
                96%
              </h2>

              <p className="mb-2 text-sm text-slate-500">Akurasi</p>
            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-[96%] rounded-full bg-emerald-500"></div>
            </div>
          </div>
        </div>

        {/* Suggested Aid */}
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <Brain size={22} />
            </div>

            <div>
              <h3 className="text-lg font-bold tracking-tight text-slate-800">
                Bantuan Disarankan
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Recommended programs
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
              Renovasi Infrastruktur
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
              Program Beasiswa Siswa
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
              Bantuan Perangkat Digital
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
