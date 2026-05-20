import { useMemo, useState } from "react";

import {
  ArrowUpRight,
  Brain,
  CheckCircle2,
  Clock3,
  Eye,
  Search,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  X,
  XCircle,
} from "lucide-react";

import initialSchoolData from "../../../data/schoolData";

export default function SchoolPage() {
  const [search, setSearch] = useState("");

  const [activeTab, setActiveTab] = useState("Pending");

  const [selectedSchool, setSelectedSchool] = useState(null);

  const [schools, setSchools] = useState(initialSchoolData);

  /* ================= ACTION ================= */

  const updateSchoolStatus = (schoolName, newStatus) => {
    const updatedSchools = schools.map((school) =>
      school.name === schoolName
        ? {
            ...school,
            status: newStatus,
          }
        : school,
    );

    setSchools(updatedSchools);

    setSelectedSchool({
      ...selectedSchool,
      status: newStatus,
    });
  };

  /* ================= FILTER ================= */

  const filteredSchools = useMemo(() => {
    return schools.filter((school) => {
      const matchSearch = school.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchStatus = school.status === activeTab;

      return matchSearch && matchStatus;
    });
  }, [search, activeTab, schools]);

  /* ================= STATS ================= */

  const pendingCount = schools.filter(
    (school) => school.status === "Pending",
  ).length;

  const approvedCount = schools.filter(
    (school) => school.status === "Approved",
  ).length;

  const rejectedCount = schools.filter(
    (school) => school.status === "Rejected",
  ).length;

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="overflow-hidden rounded-[36px] border border-slate-200 bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 p-8 text-white shadow-sm">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <Sparkles size={16} />
              School Intelligence Management
            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-tight tracking-tight">
              Monitoring & Verifikasi Sekolah
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-300">
              Monitoring data sekolah, validasi perubahan, dan analisis risiko
              pendidikan berbasis AI secara realtime.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-sm font-semibold backdrop-blur transition hover:bg-white/20">
              <ArrowUpRight size={18} />
              Lihat Analytics
            </button>

            <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-semibold transition hover:bg-blue-700">
              <ShieldAlert size={18} />
              Export Data
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {/* Total */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Sekolah
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
                  {schools.length}
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-100 text-blue-700">
                <Brain size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              <TrendingUp size={12} />
              +12 sekolah minggu ini
            </div>
          </div>

          {/* Pending */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Pending Review
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-yellow-600">
                  {pendingCount}
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-yellow-100 text-yellow-700">
                <Clock3 size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
              Perlu diverifikasi
            </div>
          </div>

          {/* Approved */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Approved</p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-emerald-600">
                  {approvedCount}
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                <CheckCircle2 size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Data tervalidasi
            </div>
          </div>

          {/* Rejected */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Rejected</p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-red-600">
                  {rejectedCount}
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-red-100 text-red-700">
                <XCircle size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              Data ditolak
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section>
        <div className="flex flex-wrap gap-3">
          {["Pending", "Approved", "Rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-2xl px-5 py-3 text-sm font-semibold transition
              
              ${
                activeTab === tab
                  ? "bg-blue-700 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }
              
              `}
            >
              {tab === "Pending"
                ? "Menunggu Verifikasi"
                : tab === "Approved"
                  ? "Sudah Diverifikasi"
                  : "Ditolak"}
            </button>
          ))}
        </div>
      </section>

      {/* Filter */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 xl:grid-cols-4">
          {/* Search */}
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 xl:col-span-2">
            <Search size={18} className="text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari sekolah..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>

          <button className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            Semua Kecamatan
          </button>

          <button className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            Semua Status
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
                School Verification Queue
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Monitoring perubahan data dan approval sekolah.
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
          <table className="w-full min-w-[1100px]">
            <thead className="border-b border-slate-100 bg-slate-50/70">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Sekolah
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Kecamatan
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Risk Score
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Siswa
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Jenis Update
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
              {filteredSchools.length > 0 ? (
                filteredSchools.map((school, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    {/* School */}
                    <td className="px-6 py-5">
                      <div>
                        <h3 className="font-semibold tracking-tight text-slate-800">
                          {school.name}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Submit {school.date}
                        </p>
                      </div>
                    </td>

                    {/* District */}
                    <td className="px-6 py-5 text-sm font-medium text-slate-700">
                      {school.district}
                    </td>

                    {/* Risk */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200">
                          <div
                            className={`h-full rounded-full
                              
                              ${
                                school.risk >= 85
                                  ? "bg-red-500"
                                  : school.risk >= 75
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                              }
                              
                              `}
                            style={{
                              width: `${school.risk}%`,
                            }}
                          ></div>
                        </div>

                        <span className="text-sm font-bold text-slate-800">
                          {school.risk}
                        </span>
                      </div>
                    </td>

                    {/* Students */}
                    <td className="px-6 py-5 text-sm font-medium text-slate-700">
                      {school.students}
                    </td>

                    {/* Update */}
                    <td className="px-6 py-5 text-sm font-medium text-slate-700">
                      {school.update}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <div
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold
                          
                          ${
                            school.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : school.status === "Approved"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-red-100 text-red-700"
                          }
                          
                          `}
                      >
                        {school.status === "Pending" && <Clock3 size={14} />}

                        {school.status === "Approved" && (
                          <CheckCircle2 size={14} />
                        )}

                        {school.status === "Rejected" && <XCircle size={14} />}

                        {school.status}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => setSelectedSchool(school)}
                        className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                      >
                        <Eye size={18} />
                        Review
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div>
                      <h3 className="text-lg font-bold text-slate-700">
                        Tidak ada data ditemukan
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

      {/* Modal */}
      {selectedSchool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[32px] bg-white p-8 shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">
                  {selectedSchool.name}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Review dan validasi data sekolah
                </p>
              </div>

              <button
                onClick={() => setSelectedSchool(null)}
                className="rounded-2xl bg-slate-100 p-3 text-slate-600 transition hover:bg-slate-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Kecamatan</p>

                <h3 className="mt-2 text-lg font-bold text-slate-800">
                  {selectedSchool.district}
                </h3>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Risk Score</p>

                <h3 className="mt-2 text-lg font-bold text-red-600">
                  {selectedSchool.risk}
                </h3>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Jumlah Siswa</p>

                <h3 className="mt-2 text-lg font-bold text-slate-800">
                  {selectedSchool.students}
                </h3>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Jenis Update</p>

                <h3 className="mt-2 text-lg font-bold text-slate-800">
                  {selectedSchool.update}
                </h3>
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="mt-6 rounded-3xl border border-blue-100 bg-blue-50 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <Brain size={22} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">
                    AI Recommendation
                  </h3>

                  <p className="mt-1 text-sm text-slate-600">
                    Data layak diprioritaskan untuk bantuan pendidikan semester
                    ini.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 flex flex-wrap justify-end gap-4">
              <button
                onClick={() => setSelectedSchool(null)}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Tutup
              </button>

              <button
                onClick={() =>
                  updateSchoolStatus(selectedSchool.name, "Rejected")
                }
                className="rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Reject
              </button>

              <button
                onClick={() =>
                  updateSchoolStatus(selectedSchool.name, "Approved")
                }
                className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
