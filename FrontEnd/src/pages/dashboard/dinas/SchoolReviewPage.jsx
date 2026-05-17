import {
  ArrowLeft,
  CheckCircle2,
  TriangleAlert,
  XCircle,
} from "lucide-react";

export default function SchoolReviewPage() {
  return (
    <div>

      {/* Header */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

        {/* Left */}
        <div>

          <button className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700">

            <ArrowLeft size={18} />

            Kembali ke Verifikasi

          </button>

          <p className="text-sm font-medium text-slate-500">
            Review perubahan data sekolah
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-800">
            SD Negeri Coblong 01
          </h1>

        </div>

        {/* Status */}
        <div className="inline-flex items-center gap-2 rounded-2xl bg-yellow-100 px-5 py-3 text-sm font-bold text-yellow-700">

          <TriangleAlert size={18} />

          Menunggu Verifikasi

        </div>

      </div>

      {/* School Info */}
      <div className="mt-8 grid gap-6 xl:grid-cols-4">

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Kecamatan
          </p>

          <h2 className="mt-2 text-lg font-bold text-slate-800">
            Coblong
          </h2>

        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Tanggal Submit
          </p>

          <h2 className="mt-2 text-lg font-bold text-slate-800">
            17 Mei 2026
          </h2>

        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Jenis Update
          </p>

          <h2 className="mt-2 text-lg font-bold text-slate-800">
            Data Siswa Rentan
          </h2>

        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Risk Score
          </p>

          <h2 className="mt-2 text-lg font-bold text-red-600">
            92
          </h2>

        </div>

      </div>

      {/* Compare Data */}
      <div className="mt-8 grid gap-6 xl:grid-cols-2">

        {/* Old Data */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          {/* Header */}
          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-xl font-bold text-slate-800">
                Data Lama
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Data saat ini di sistem
              </p>

            </div>

            <div className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">

              Current

            </div>

          </div>

          {/* Content */}
          <div className="mt-6 space-y-5">

            <div>

              <p className="text-sm text-slate-500">
                Jumlah Siswa Rentan
              </p>

              <h3 className="mt-2 text-lg font-bold text-slate-800">
                120 Siswa
              </h3>

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Bantuan Aktif
              </p>

              <h3 className="mt-2 text-lg font-bold text-slate-800">
                Rp 40 JT
              </h3>

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Kondisi Infrastruktur
              </p>

              <h3 className="mt-2 text-lg font-bold text-slate-800">
                Sedang
              </h3>

            </div>

          </div>

        </div>

        {/* New Data */}
        <div className="rounded-3xl border border-yellow-300 bg-yellow-50 p-6 shadow-sm">

          {/* Header */}
          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-xl font-bold text-slate-800">
                Data Baru
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Data yang diajukan sekolah
              </p>

            </div>

            <div className="rounded-xl bg-yellow-200 px-3 py-2 text-sm font-semibold text-yellow-800">

              Updated

            </div>

          </div>

          {/* Content */}
          <div className="mt-6 space-y-5">

            <div>

              <p className="text-sm text-slate-500">
                Jumlah Siswa Rentan
              </p>

              <h3 className="mt-2 text-lg font-bold text-red-600">
                186 Siswa
              </h3>

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Bantuan Aktif
              </p>

              <h3 className="mt-2 text-lg font-bold text-red-600">
                Rp 65 JT
              </h3>

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Kondisi Infrastruktur
              </p>

              <h3 className="mt-2 text-lg font-bold text-red-600">
                Rusak Berat
              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* Notes */}
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        {/* Header */}
        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Catatan Reviewer
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Berikan catatan approval atau alasan penolakan
          </p>

        </div>

        {/* Textarea */}
        <textarea
          placeholder="Tulis catatan verifikasi..."
          className="mt-6 h-[180px] w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 outline-none placeholder:text-slate-400"
        ></textarea>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center gap-4">

          {/* Approve */}
          <button className="inline-flex items-center gap-2 rounded-2xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700">

            <CheckCircle2 size={18} />

            Approve Data

          </button>

          {/* Reject */}
          <button className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700">

            <XCircle size={18} />

            Tolak Data

          </button>

        </div>

      </div>

    </div>
  );
}