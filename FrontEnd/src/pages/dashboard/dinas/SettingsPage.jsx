import {
  Bell,
  Brain,
  Globe,
  KeyRound,
  Lock,
  Moon,
  Palette,
  Save,
  ShieldCheck,
  Sparkles,
  UserCog,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="overflow-hidden rounded-[36px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-8 text-white shadow-sm">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <Sparkles size={16} />
              Enterprise Configuration Panel
            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-tight tracking-tight">
              Pengaturan Sistem PINTARIN
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-300">
              Kelola keamanan akun, konfigurasi AI, notifikasi sistem, dan
              preferensi platform dalam satu dashboard terintegrasi.
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
            {/* Profile */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-100 text-blue-700">
                  <UserCog size={28} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                    Profile Settings
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Kelola informasi akun administrator.
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Nama Lengkap
                  </label>

                  <input
                    type="text"
                    value="Aqmal Madani"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Email
                  </label>

                  <input
                    type="email"
                    value="admin@pintarin.id"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Role
                  </label>

                  <input
                    type="text"
                    value="Admin Dinas"
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
              </div>
            </div>

            {/* Security */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                  <ShieldCheck size={28} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                    Security Settings
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Konfigurasi keamanan akun dan autentikasi.
                  </p>
                </div>
              </div>

              {/* Security Items */}
              <div className="mt-8 space-y-5">
                {/* Item */}
                <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                      <Lock size={22} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        Two-Factor Authentication
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Tambahan keamanan login akun.
                      </p>
                    </div>
                  </div>

                  <button className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold text-white">
                    Active
                  </button>
                </div>

                {/* Item */}
                <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                      <KeyRound size={22} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        Password Management
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Perbarui password administrator.
                      </p>
                    </div>
                  </div>

                  <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
                    Update
                  </button>
                </div>
              </div>
            </div>

            {/* AI */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-purple-100 text-purple-700">
                  <Brain size={28} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                    AI Configuration
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Pengaturan sistem AI prediction dan analytics.
                  </p>
                </div>
              </div>

              {/* AI Items */}
              <div className="mt-8 space-y-5">
                {/* Item */}
                <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      AI Risk Prediction
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Aktifkan prediksi risiko pendidikan otomatis.
                    </p>
                  </div>

                  <button className="rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white">
                    Enabled
                  </button>
                </div>

                {/* Item */}
                <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      Smart CSR Matching
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      AI rekomendasi bantuan CSR otomatis.
                    </p>
                  </div>

                  <button className="rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white">
                    Enabled
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* Notification */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-yellow-100 text-yellow-700">
                  <Bell size={28} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                    Notifications
                  </h2>
                </div>
              </div>

              {/* Items */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4">
                  <span className="text-sm font-medium text-slate-700">
                    Email Notifications
                  </span>

                  <button className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold text-white">
                    ON
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4">
                  <span className="text-sm font-medium text-slate-700">
                    AI Alerts
                  </span>

                  <button className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold text-white">
                    ON
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4">
                  <span className="text-sm font-medium text-slate-700">
                    CSR Updates
                  </span>

                  <button className="rounded-full bg-slate-300 px-4 py-2 text-xs font-bold text-slate-700">
                    OFF
                  </button>
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-pink-100 text-pink-700">
                  <Palette size={28} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                    Appearance
                  </h2>
                </div>
              </div>

              {/* Theme */}
              <div className="mt-8 space-y-4">
                <button className="flex w-full items-center justify-between rounded-3xl border border-blue-200 bg-blue-50 p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-700">
                      <Globe size={22} />
                    </div>

                    <div className="text-left">
                      <h3 className="font-semibold text-slate-800">
                        Light Mode
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Default system appearance
                      </p>
                    </div>
                  </div>

                  <div className="h-4 w-4 rounded-full bg-blue-600"></div>
                </button>

                <button className="flex w-full items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-white">
                      <Moon size={22} />
                    </div>

                    <div className="text-left">
                      <h3 className="font-semibold text-slate-800">
                        Dark Mode
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Modern dark appearance
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-800 p-6 text-white shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10">
                <ShieldCheck size={28} />
              </div>

              <h2 className="mt-8 text-3xl font-black tracking-tight">
                System Status
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-blue-100">
                Semua layanan sistem berjalan normal dengan AI monitoring aktif
                realtime.
              </p>

              {/* Stats */}
              <div className="mt-8 space-y-4">
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                    AI Engine
                  </p>

                  <h3 className="mt-2 text-2xl font-black">Online</h3>
                </div>

                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                    Security
                  </p>

                  <h3 className="mt-2 text-2xl font-black">Protected</h3>
                </div>

                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                    Server Status
                  </p>

                  <h3 className="mt-2 text-2xl font-black">Stable</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
