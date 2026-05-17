import {
  Brain,
  Sparkles,
  TriangleAlert,
  BadgeCheck,
} from "lucide-react";

export default function AIInsightPanel() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-4">

        {/* Icon */}
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-100 text-blue-700">

          <Brain size={28} />

        </div>

        {/* Title */}
        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            AI Risk Prediction
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Analisis cerdas berdasarkan data sekolah terbaru
          </p>

        </div>

      </div>

      {/* Main Prediction */}
      <div className="mt-8 rounded-3xl bg-gradient-to-br from-red-50 to-orange-50 p-6">

        <div className="flex items-start justify-between">

          {/* Left */}
          <div>

            <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-bold text-red-600">

              <TriangleAlert size={16} />

              Prioritas Tinggi

            </div>

            <h3 className="mt-5 text-3xl font-bold text-slate-800">
              SD Negeri Coblong 01
            </h3>

            <p className="mt-3 max-w-xl leading-relaxed text-slate-600">
              Sistem AI mendeteksi peningkatan signifikan jumlah siswa
              rentan dan penurunan kondisi infrastruktur dalam
              3 bulan terakhir.
            </p>

          </div>

          {/* Score */}
          <div className="rounded-3xl bg-white px-6 py-5 text-center shadow-sm">

            <p className="text-sm font-medium text-slate-500">
              Risk Score
            </p>

            <h2 className="mt-2 text-5xl font-extrabold text-red-600">
              92
            </h2>

          </div>

        </div>

      </div>

      {/* AI Recommendation */}
      <div className="mt-8 grid gap-5 xl:grid-cols-3">

        {/* Recommendation */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">

              <Sparkles size={22} />

            </div>

            <h3 className="text-lg font-bold text-slate-800">
              Rekomendasi AI
            </h3>

          </div>

          <p className="mt-5 leading-relaxed text-slate-600">
            Prioritaskan bantuan renovasi ruang kelas dan
            program bantuan siswa rentan untuk semester ini.
          </p>

        </div>

        {/* Confidence */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-700">

              <BadgeCheck size={22} />

            </div>

            <h3 className="text-lg font-bold text-slate-800">
              Confidence Score
            </h3>

          </div>

          <div className="mt-5 flex items-end gap-2">

            <h2 className="text-5xl font-extrabold text-slate-800">
              96%
            </h2>

            <p className="mb-2 text-sm text-slate-500">
              Akurasi Prediksi
            </p>

          </div>

        </div>

        {/* Suggested Aid */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-700">

              <Brain size={22} />

            </div>

            <h3 className="text-lg font-bold text-slate-800">
              Bantuan Disarankan
            </h3>

          </div>

          <div className="mt-5 space-y-3">

            <div className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">

              Renovasi Infrastruktur

            </div>

            <div className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">

              Program Beasiswa

            </div>

            <div className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">

              Bantuan Perangkat Digital

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}