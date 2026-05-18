import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Clock3,
  Eye,
  Plus,
  School,
  Search,
  Shield,
  ShieldAlert,
  Sparkles,
  UserCog,
  Users,
  XCircle,
} from "lucide-react";

const accountData = [
  {
    name: "SD Negeri Coblong 01",
    email: "coblong01@school.id",
    role: "Sekolah",
    status: "Verified",
    joined: "12 Mei 2026",
  },

  {
    name: "PT Edu Teknologi",
    email: "csr@edutech.id",
    role: "CSR",
    status: "Pending",
    joined: "10 Mei 2026",
  },

  {
    name: "SMP Negeri 05 Bandung",
    email: "smp05@school.id",
    role: "Sekolah",
    status: "Verified",
    joined: "08 Mei 2026",
  },

  {
    name: "PT Smart Future",
    email: "future@csr.id",
    role: "CSR",
    status: "Rejected",
    joined: "05 Mei 2026",
  },
];

export default function AccountPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="overflow-hidden rounded-[36px] border border-slate-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 p-8 text-white shadow-sm">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <Sparkles size={16} />
              Enterprise Account Management
            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-tight tracking-tight">
              Manajemen Akun & Role System
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-300">
              Monitoring akun sekolah, CSR, dan administrator dalam satu
              platform terintegrasi dengan sistem verifikasi berbasis role.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-sm font-semibold backdrop-blur transition hover:bg-white/20">
              <ArrowUpRight size={18} />
              Export Accounts
            </button>

            <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-semibold transition hover:bg-blue-700">
              <Plus size={18} />
              Tambah Akun
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
                <p className="text-sm font-medium text-slate-500">Total Akun</p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
                  1,284
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-100 text-blue-700">
                <Users size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              Semua role aktif
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Akun Sekolah
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-emerald-600">
                  842
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                <School size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Sekolah terdaftar
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Akun CSR</p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-indigo-600">
                  126
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-indigo-100 text-indigo-700">
                <Building2 size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
              Partner CSR aktif
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Pending Review
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-yellow-600">
                  24
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-yellow-100 text-yellow-700">
                <Clock3 size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
              Menunggu verifikasi
            </div>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 xl:grid-cols-5">
          {/* Search */}
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 xl:col-span-2">
            <Search size={18} className="text-slate-400" />

            <input
              type="text"
              placeholder="Cari akun..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Filters */}
          <button className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            Semua Role
          </button>

          <button className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            Semua Status
          </button>

          <button className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            Tahun 2026
          </button>
        </div>
      </section>

      {/* Table */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-slate-100 p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                Account Verification Queue
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Monitoring akun dan role dalam sistem PINTARIN.
              </p>
            </div>

            <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              <Shield size={18} />
              Role Permissions
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead className="border-b border-slate-100 bg-slate-50/70">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Akun
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Role
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Joined
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {accountData.map((account, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >
                  {/* Account */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-3xl
                          
                          ${
                            account.role === "Sekolah"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-indigo-100 text-indigo-700"
                          }
                          
                          `}
                      >
                        {account.role === "Sekolah" ? (
                          <School size={22} />
                        ) : (
                          <Building2 size={22} />
                        )}
                      </div>

                      <div>
                        <h3 className="font-semibold tracking-tight text-slate-800">
                          {account.name}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Registered account
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-5 text-sm font-medium text-slate-700">
                    {account.email}
                  </td>

                  {/* Role */}
                  <td className="px-6 py-5">
                    <div
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold
                        
                        ${
                          account.role === "Sekolah"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-indigo-100 text-indigo-700"
                        }
                        
                        `}
                    >
                      {account.role}
                    </div>
                  </td>

                  {/* Joined */}
                  <td className="px-6 py-5 text-sm font-medium text-slate-700">
                    {account.joined}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <div
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold
                        
                        ${
                          account.status === "Verified"
                            ? "bg-emerald-100 text-emerald-700"
                            : account.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }
                        
                        `}
                    >
                      {account.status === "Verified" && (
                        <BadgeCheck size={14} />
                      )}

                      {account.status === "Pending" && <Clock3 size={14} />}

                      {account.status === "Rejected" && <XCircle size={14} />}

                      {account.status}
                    </div>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-5 text-right">
                    <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                      <Eye size={18} />
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bottom Section */}
      <section>
        <div className="grid gap-6 xl:grid-cols-3">
          {/* Permissions */}
          <div className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                Role Permissions
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Hak akses masing-masing role dalam sistem.
              </p>
            </div>

            {/* Grid */}
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {/* Card */}
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-blue-100 text-blue-700">
                  <Shield size={24} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-800">
                  Admin Dinas
                </h3>

                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li>• Full dashboard access</li>
                  <li>• Approval bantuan CSR</li>
                  <li>• Verifikasi sekolah</li>
                  <li>• Analytics & AI system</li>
                </ul>
              </div>

              {/* Card */}
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                  <School size={24} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-800">
                  Sekolah
                </h3>

                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li>• Update data sekolah</li>
                  <li>• Monitoring bantuan</li>
                  <li>• AI risk insight</li>
                  <li>• Upload laporan</li>
                </ul>
              </div>

              {/* Card */}
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-indigo-100 text-indigo-700">
                  <Building2 size={24} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-800">
                  CSR Partner
                </h3>

                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li>• Distribusi bantuan</li>
                  <li>• Monitoring impact</li>
                  <li>• Analytics bantuan</li>
                  <li>• CSR reporting</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-700 to-indigo-800 p-6 text-white shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10">
              <UserCog size={28} />
            </div>

            <h2 className="mt-8 text-3xl font-black tracking-tight">
              Security Center
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-blue-100">
              Sistem keamanan akun dan role management berbasis enterprise
              authentication.
            </p>

            {/* Items */}
            <div className="mt-8 space-y-4">
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                  Active Sessions
                </p>

                <h3 className="mt-2 text-2xl font-black">284</h3>
              </div>

              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                  Security Status
                </p>

                <h3 className="mt-2 text-2xl font-black">Protected</h3>
              </div>

              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                  AI Monitoring
                </p>

                <h3 className="mt-2 text-2xl font-black">Active</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
