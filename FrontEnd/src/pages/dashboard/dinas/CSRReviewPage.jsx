import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  HandCoins,
  School,
  TriangleAlert,
  XCircle,
} from "lucide-react";

export default function CSRReviewPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* Left */}
        <div>
          <button className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700">
            <ArrowLeft size={18} />
            Kembali ke Persetujuan CSR
          </button>

          <p className="text-sm font-medium text-slate-500">
            Review pengajuan bantuan CSR
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-800">
            PT Maju Jaya
          </h1>
        </div>

        {/* Status */}
        <div className="inline-flex items-center gap-2 rounded-2xl bg-yellow-100 px-5 py-3 text-sm font-bold text-yellow-700">
          <TriangleAlert size={18} />
          Menunggu Approval
        </div>
      </div>

      {/* Main Grid */}
      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        {/* LEFT */}
        <div className="xl:col-span-2 space-y-6">
          {/* CSR Profile */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-100 text-blue-700">
                <Building2 size={28} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  PT Maju Jaya
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Corporate Social Responsibility Partner
                </p>
              </div>
            </div>

            {/* Detail */}
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div>
                <p className="text-sm text-slate-500">Email Perusahaan</p>

                <h3 className="mt-2 font-semibold text-slate-800">
                  partnership@majujaya.co.id
                </h3>
              </div>

              <div>
                <p className="text-sm text-slate-500">Nomor Telepon</p>

                <h3 className="mt-2 font-semibold text-slate-800">
                  +62 812 9999 8888
                </h3>
              </div>

              <div>
                <p className="text-sm text-slate-500">Bidang Perusahaan</p>

                <h3 className="mt-2 font-semibold text-slate-800">
                  Teknologi & Infrastruktur
                </h3>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Total Bantuan Sebelumnya
                </p>

                <h3 className="mt-2 font-semibold text-green-700">
                  Rp 1.2 Miliar
                </h3>
              </div>
            </div>
          </div>

          {/* Aid Detail */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                <HandCoins size={24} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Detail Bantuan
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Informasi pengajuan bantuan CSR
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="mt-8 space-y-5">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Jenis Bantuan</p>

                <h3 className="mt-2 text-lg font-bold text-slate-800">
                  Renovasi Ruang Kelas
                </h3>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Nilai Bantuan</p>

                <h3 className="mt-2 text-lg font-bold text-green-700">
                  Rp 120.000.000
                </h3>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Deskripsi Bantuan</p>

                <p className="mt-2 leading-relaxed text-slate-700">
                  Renovasi ruang kelas dan perbaikan fasilitas belajar untuk
                  meningkatkan kenyamanan serta kualitas proses pembelajaran
                  siswa.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* School */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                <School size={24} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Sekolah Tujuan
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Penerima bantuan CSR
                </p>
              </div>
            </div>

            {/* School Detail */}
            <div className="mt-8 space-y-5">
              <div>
                <p className="text-sm text-slate-500">Nama Sekolah</p>

                <h3 className="mt-2 text-lg font-bold text-slate-800">
                  SD Negeri Coblong 01
                </h3>
              </div>

              <div>
                <p className="text-sm text-slate-500">Kecamatan</p>

                <h3 className="mt-2 font-semibold text-slate-800">Coblong</h3>
              </div>

              <div>
                <p className="text-sm text-slate-500">Risk Score</p>

                <div className="mt-2 inline-flex rounded-xl bg-red-100 px-3 py-2 text-sm font-bold text-red-600">
                  92 - Risiko Tinggi
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-500">Jumlah Siswa Rentan</p>

                <h3 className="mt-2 font-semibold text-slate-800">186 Siswa</h3>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Catatan Approval
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Berikan catatan keputusan
              </p>
            </div>

            {/* Textarea */}
            <textarea
              placeholder="Tulis catatan approval atau alasan penolakan..."
              className="mt-6 h-[180px] w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 outline-none placeholder:text-slate-400"
            ></textarea>

            {/* Actions */}
            <div className="mt-6 space-y-3">
              {/* Approve */}
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700">
                <CheckCircle2 size={18} />
                Approve Bantuan
              </button>

              {/* Reject */}
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700">
                <XCircle size={18} />
                Tolak Bantuan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
