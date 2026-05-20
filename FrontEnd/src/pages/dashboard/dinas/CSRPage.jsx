import { useMemo, useState } from "react";

import {
  ArrowUpRight,
  Brain,
  Building2,
  CheckCircle2,
  Clock3,
  Eye,
  HandCoins,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
  X,
  XCircle,
} from "lucide-react";

import csrData from "../../../data/csrData";

export default function CSRPage() {
  const [search, setSearch] = useState("");

  const [activeTab, setActiveTab] = useState("All");

  const [selectedCSR, setSelectedCSR] = useState(null);

  /* ================= FILTER ================= */

  const filteredCSR = useMemo(() => {
    return csrData.filter((csr) => {
      const matchSearch =
        csr.company.toLowerCase().includes(search.toLowerCase()) ||
        csr.school.toLowerCase().includes(search.toLowerCase());

      const matchStatus = activeTab === "All" ? true : csr.status === activeTab;

      return matchSearch && matchStatus;
    });
  }, [search, activeTab]);

  return (
    <div className="space-y-8">
      {/* ================= HERO ================= */}
      <section className="overflow-hidden rounded-[36px] border border-slate-200 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 p-8 text-white shadow-sm">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <Sparkles size={16} />
              CSR Intelligence System
            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-tight tracking-tight">
              Monitoring & Distribusi Bantuan CSR
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-300">
              Platform monitoring distribusi bantuan CSR berbasis AI untuk
              memastikan bantuan pendidikan lebih tepat sasaran dan transparan.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-sm font-semibold backdrop-blur transition hover:bg-white/20">
              <ArrowUpRight size={18} />
              CSR Analytics
            </button>

            <button className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-4 text-sm font-semibold transition hover:bg-emerald-600">
              <HandCoins size={18} />
              Export Report
            </button>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Bantuan
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
                  Rp 1.2 M
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                <Wallet size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              <TrendingUp size={12} />
              +18% bulan ini
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Pending Approval
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-yellow-600">
                  {csrData.filter((item) => item.status === "Pending").length}
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-yellow-100 text-yellow-700">
                <Clock3 size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
              Menunggu verifikasi
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Approved</p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-emerald-600">
                  {csrData.filter((item) => item.status === "Approved").length}
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                <CheckCircle2 size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Bantuan disetujui
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  AI Matching
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
                  96%
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-100 text-blue-700">
                <Brain size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              Smart recommendation
            </div>
          </div>
        </div>
      </section>

      {/* ================= TABS ================= */}
      <section>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab("All")}
            className={`rounded-2xl px-5 py-3 text-sm font-semibold transition
              
              ${
                activeTab === "All"
                  ? "bg-emerald-600 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }
              
            `}
          >
            Semua
          </button>

          <button
            onClick={() => setActiveTab("Pending")}
            className={`rounded-2xl px-5 py-3 text-sm font-semibold transition
              
              ${
                activeTab === "Pending"
                  ? "bg-yellow-500 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }
              
            `}
          >
            Pending
          </button>

          <button
            onClick={() => setActiveTab("Approved")}
            className={`rounded-2xl px-5 py-3 text-sm font-semibold transition
              
              ${
                activeTab === "Approved"
                  ? "bg-emerald-600 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }
              
            `}
          >
            Approved
          </button>

          <button
            onClick={() => setActiveTab("Rejected")}
            className={`rounded-2xl px-5 py-3 text-sm font-semibold transition
              
              ${
                activeTab === "Rejected"
                  ? "bg-red-600 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }
              
            `}
          >
            Rejected
          </button>
        </div>
      </section>

      {/* ================= FILTER ================= */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 xl:grid-cols-5">
          {/* Search */}
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 xl:col-span-2">
            <Search size={18} className="text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari perusahaan CSR atau sekolah..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Filter */}
          <button className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            Semua Status
          </button>

          <button className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            Semua Jenis
          </button>

          <button className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            Tahun 2026
          </button>
        </div>
      </section>

      {/* ================= TABLE ================= */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-slate-100 p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                CSR Distribution Queue
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Monitoring pengajuan bantuan CSR dan approval distribusi.
              </p>
            </div>

            <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              <ArrowUpRight size={18} />
              Export Table
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="border-b border-slate-100 bg-slate-50/70">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Perusahaan CSR
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Sekolah Tujuan
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Jenis Bantuan
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Nilai Bantuan
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Priority
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
              {filteredCSR.length > 0 ? (
                filteredCSR.map((csr, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    {/* CSR */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                          <Building2 size={22} />
                        </div>

                        <div>
                          <h3 className="font-semibold tracking-tight text-slate-800">
                            {csr.company}
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            Submit {csr.date}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* School */}
                    <td className="px-6 py-5 text-sm font-medium text-slate-700">
                      {csr.school}
                    </td>

                    {/* Type */}
                    <td className="px-6 py-5 text-sm font-medium text-slate-700">
                      {csr.type}
                    </td>

                    {/* Value */}
                    <td className="px-6 py-5">
                      <div className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {csr.value}
                      </div>
                    </td>

                    {/* Priority */}
                    <td className="px-6 py-5">
                      <div
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold
                            
                            ${
                              csr.priority === "High"
                                ? "bg-red-100 text-red-700"
                                : csr.priority === "Medium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-emerald-100 text-emerald-700"
                            }
                            
                          `}
                      >
                        {csr.priority}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <div
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold
                            
                            ${
                              csr.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : csr.status === "Approved"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-red-100 text-red-700"
                            }
                            
                          `}
                      >
                        {csr.status === "Pending" && <Clock3 size={14} />}

                        {csr.status === "Approved" && <ShieldCheck size={14} />}

                        {csr.status === "Rejected" && <XCircle size={14} />}

                        {csr.status}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => setSelectedCSR(csr)}
                        className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                      >
                        <Eye size={18} />
                        Detail
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
                        <Search size={28} />
                      </div>

                      <h3 className="mt-5 text-lg font-bold text-slate-700">
                        Data tidak ditemukan
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        Coba gunakan keyword lain.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= MODAL ================= */}
      {selectedCSR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[32px] bg-white p-8 shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                  <HandCoins size={16} />
                  CSR Detail
                </div>

                <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900">
                  {selectedCSR.company}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Submit {selectedCSR.date}
                </p>
              </div>

              <button
                onClick={() => setSelectedCSR(null)}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Sekolah Tujuan</p>

                <h3 className="mt-2 text-lg font-bold text-slate-800">
                  {selectedCSR.school}
                </h3>
              </div>

              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Jenis Bantuan</p>

                <h3 className="mt-2 text-lg font-bold text-slate-800">
                  {selectedCSR.type}
                </h3>
              </div>

              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Nilai Bantuan</p>

                <h3 className="mt-2 text-lg font-bold text-emerald-700">
                  {selectedCSR.value}
                </h3>
              </div>

              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Priority</p>

                <h3 className="mt-2 text-lg font-bold text-slate-800">
                  {selectedCSR.priority}
                </h3>
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="mt-6 rounded-3xl border border-blue-100 bg-blue-50 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <Brain size={24} />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    AI Recommendation
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Sistem AI merekomendasikan bantuan ini karena sekolah
                    memiliki tingkat kebutuhan tinggi berdasarkan data
                    fasilitas, ekonomi siswa, dan risk score wilayah.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 flex flex-wrap justify-end gap-4">
              <button
                onClick={() => setSelectedCSR(null)}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Tutup
              </button>

              <button className="rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600">
                Reject
              </button>

              <button className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">
                Approve Bantuan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
