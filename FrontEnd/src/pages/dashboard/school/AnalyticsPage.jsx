import {
  Brain,
  GraduationCap,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const riskData = [
  {
    month: "Jan",
    score: 78,
  },
  {
    month: "Feb",
    score: 80,
  },
  {
    month: "Mar",
    score: 82,
  },
  {
    month: "Apr",
    score: 88,
  },
  {
    month: "Mei",
    score: 92,
  },
];

const studentData = [
  {
    name: "Siswa Aktif",
    value: 812,
  },
  {
    name: "Siswa Rentan",
    value: 182,
  },
];

const COLORS = ["#2563EB", "#EF4444"];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="overflow-hidden rounded-[36px] border border-slate-200 bg-gradient-to-br from-indigo-950 via-blue-900 to-slate-900 p-8 text-white shadow-sm">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <Sparkles size={16} />
              School Intelligence Analytics
            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-tight tracking-tight">
              Analytics & Monitoring
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-300">
              Analisis performa sekolah, trend risiko pendidikan, dan monitoring
              bantuan berbasis AI.
            </p>
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
                <p className="text-sm font-medium text-slate-500">Risk Score</p>

                <h2 className="mt-4 text-4xl font-black text-red-600">92</h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-red-100 text-red-700">
                <ShieldAlert size={26} />
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Siswa
                </p>

                <h2 className="mt-4 text-4xl font-black text-slate-900">812</h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-100 text-blue-700">
                <GraduationCap size={26} />
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Bantuan Aktif
                </p>

                <h2 className="mt-4 text-4xl font-black text-emerald-700">4</h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                <Wallet size={26} />
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Improvement
                </p>

                <h2 className="mt-4 text-4xl font-black text-indigo-700">
                  +18%
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-indigo-100 text-indigo-700">
                <TrendingUp size={26} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Charts */}
      <section>
        <div className="grid gap-6 xl:grid-cols-3">
          {/* Trend Chart */}
          <div className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                Trend Risk Score
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Perkembangan risk score sekolah selama 5 bulan terakhir.
              </p>
            </div>

            {/* Chart */}
            <div className="mt-8 h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={riskData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />

                  <XAxis
                    dataKey="month"
                    tick={{
                      fill: "#64748B",
                      fontSize: 13,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    tick={{
                      fill: "#64748B",
                      fontSize: 13,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#2563EB"
                    fill="#93C5FD"
                    strokeWidth={4}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                Komposisi Siswa
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Statistik siswa aktif dan rentan.
              </p>
            </div>

            {/* Chart */}
            <div className="mt-8 h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={studentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    dataKey="value"
                  >
                    {studentData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* AI Summary */}
      <section>
        <div className="rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-800 p-6 text-white shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10">
              <Brain size={28} />
            </div>

            <div>
              <h2 className="text-3xl font-black tracking-tight">
                AI Analytics Summary
              </h2>

              <p className="mt-1 text-sm text-blue-100">
                Ringkasan analisis AI terhadap kondisi sekolah.
              </p>
            </div>
          </div>

          {/* Grid */}
          <div className="mt-8 grid gap-5 xl:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                Infrastruktur
              </p>

              <h3 className="mt-3 text-2xl font-black">Butuh Renovasi</h3>
            </div>

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                Prioritas Bantuan
              </p>

              <h3 className="mt-3 text-2xl font-black">Tinggi</h3>
            </div>

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                Trend Risiko
              </p>

              <h3 className="mt-3 text-2xl font-black">Meningkat</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
