import {
  Brain,
  Building2,
  Camera,
  GraduationCap,
  MapPin,
  Phone,
  Save,
  ShieldAlert,
  Sparkles,
  User,
  Users,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="overflow-hidden rounded-[36px] border border-slate-200 bg-gradient-to-br from-blue-950 via-indigo-900 to-slate-900 p-8 text-white shadow-sm">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <Sparkles size={16} />
              School Profile Management
            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-tight tracking-tight">
              Profil & Data Sekolah
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-300">
              Kelola informasi sekolah, fasilitas, kondisi infrastruktur, dan
              data pendidikan berbasis AI monitoring system.
            </p>
          </div>

          {/* Right */}
          <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-semibold transition hover:bg-blue-700">
            <Save size={18} />
            Simpan Perubahan
          </button>
        </div>
      </section>

      {/* Main Grid */}
      <section>
        <div className="grid gap-6 xl:grid-cols-3">
          {/* LEFT */}
          <div className="space-y-6 xl:col-span-2">
            {/* School Information */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-100 text-blue-700">
                  <Building2 size={28} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                    Informasi Sekolah
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Data utama identitas sekolah.
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Nama Sekolah
                  </label>

                  <input
                    type="text"
                    value="SD Negeri Coblong 01"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    NPSN
                  </label>

                  <input
                    type="text"
                    value="20219123"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Kepala Sekolah
                  </label>

                  <input
                    type="text"
                    value="Drs. Ahmad Fauzi"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Nomor Telepon
                  </label>

                  <input
                    type="text"
                    value="+62 812 3456 7890"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Alamat Sekolah
                  </label>

                  <textarea
                    rows={4}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm outline-none"
                    defaultValue="Jl. Coblong Raya No. 12, Kota Bandung"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Infrastructure */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                  <ShieldAlert size={28} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                    Infrastruktur Sekolah
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Monitoring fasilitas dan kondisi bangunan.
                  </p>
                </div>
              </div>

              {/* Grid */}
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Jumlah Ruang Kelas
                  </label>

                  <input
                    type="number"
                    value="18"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Kondisi Infrastruktur
                  </label>

                  <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm outline-none">
                    <option>Perlu Perbaikan</option>

                    <option>Baik</option>

                    <option>Sangat Baik</option>
                  </select>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Laboratorium
                  </label>

                  <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm outline-none">
                    <option>Tersedia</option>

                    <option>Tidak Tersedia</option>
                  </select>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Akses Internet
                  </label>

                  <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm outline-none">
                    <option>Stabil</option>

                    <option>Tidak Stabil</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Student Data */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-indigo-100 text-indigo-700">
                  <GraduationCap size={28} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                    Data Siswa
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Statistik dan kondisi siswa sekolah.
                  </p>
                </div>
              </div>

              {/* Grid */}
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Total Siswa
                  </label>

                  <input
                    type="number"
                    value="812"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Siswa Rentan
                  </label>

                  <input
                    type="number"
                    value="182"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Total Guru
                  </label>

                  <input
                    type="number"
                    value="42"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* School Photo */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-pink-100 text-pink-700">
                  <Camera size={28} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                    Foto Sekolah
                  </h2>
                </div>
              </div>

              {/* Photo */}
              <div className="mt-8 flex h-[240px] items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50">
                <div className="text-center">
                  <Camera size={42} className="mx-auto text-slate-400" />

                  <p className="mt-4 text-sm font-medium text-slate-500">
                    Upload Foto Sekolah
                  </p>
                </div>
              </div>
            </div>

            {/* AI Summary */}
            <div className="rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-800 p-6 text-white shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10">
                <Brain size={28} />
              </div>

              <h2 className="mt-8 text-3xl font-black tracking-tight">
                AI Summary
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-blue-100">
                Sistem AI mendeteksi kondisi infrastruktur membutuhkan perhatian
                dan prioritas bantuan renovasi semester ini.
              </p>

              {/* AI Cards */}
              <div className="mt-8 space-y-4">
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                    Risk Score
                  </p>

                  <h3 className="mt-2 text-4xl font-black">92</h3>
                </div>

                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                    Prioritas Bantuan
                  </p>

                  <h3 className="mt-2 text-2xl font-black">Tinggi</h3>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                Informasi Cepat
              </h2>

              <div className="mt-8 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                    <MapPin size={22} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Kecamatan</p>

                    <h3 className="font-bold text-slate-800">Coblong</h3>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <Phone size={22} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Kontak Sekolah</p>

                    <h3 className="font-bold text-slate-800">
                      +62 812 3456 7890
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                    <Users size={22} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Total Guru</p>

                    <h3 className="font-bold text-slate-800">42 Guru</h3>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-pink-700">
                    <User size={22} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Kepala Sekolah</p>

                    <h3 className="font-bold text-slate-800">
                      Drs. Ahmad Fauzi
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
