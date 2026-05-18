import {
  ArrowUpRight,
  Brain,
  ChartColumn,
  Download,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const trendData = [
  { month: "Jan", schools: 120 },
  { month: "Feb", schools: 180 },
  { month: "Mar", schools: 150 },
  { month: "Apr", schools: 240 },
  { month: "Mei", schools: 210 },
  { month: "Jun", schools: 280 },
];

const districtData = [
  { name: "Coblong", value: 92 },
  { name: "Kiaracondong", value: 88 },
  { name: "Antapani", value: 81 },
  { name: "Lengkong", value: 74 },
];

const pieData = [
  {
    name: "Risiko Tinggi",
    value: 42,
    color: "#EF4444",
  },

  {
    name: "Risiko Sedang",
    value: 33,
    color: "#F59E0B",
  },

  {
    name: "Risiko Rendah",
    value: 25,
    color: "#22C55E",
  },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="overflow-hidden rounded-[36px] border border-slate-200 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-8 text-white shadow-sm">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <Sparkles size={16} />
              Executive Analytics Dashboard
            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-tight tracking-tight">
              Analitik Pendidikan Berbasis AI Intelligence
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-300">
              Monitoring statistik pendidikan, analisis wilayah, prediksi AI,
              dan distribusi bantuan pendidikan secara realtime.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-sm font-semibold backdrop-blur transition hover:bg-white/20">
              <ArrowUpRight size={18} />
              Lihat Detail
            </button>

            <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-semibold transition hover:bg-blue-700">
              <Download size={18} />
              Export Report
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
                <p className="text-sm font-medium text-slate-500">
                  Total Sekolah
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
                  2,341
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-100 text-blue-700">
                <ChartColumn size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              <TrendingUp size={12} />
              +12% bulan ini
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Risiko Tinggi
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-red-600">
                  328
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-red-100 text-red-700">
                <ShieldAlert size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              <TrendingUp size={12} />
              +8% minggu ini
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  AI Accuracy
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
                  96%
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-indigo-100 text-indigo-700">
                <Brain size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
              <Sparkles size={12} />
              Model Active
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Siswa Rentan
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
                  8.4K
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-amber-100 text-amber-700">
                <Users size={26} />
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
              Prioritas Bantuan
            </div>
          </div>
        </div>
      </section>

      {/* Charts */}
      <section>
        <div className="grid gap-6 xl:grid-cols-3">
          {/* Trend Chart */}
          <div className="xl:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                    Trend Risiko Pendidikan
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Perkembangan sekolah berisiko selama 6 bulan terakhir
                  </p>
                </div>

                <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  6 Bulan
                </button>
              </div>

              {/* Chart */}
              <div className="mt-8 h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient
                        id="colorRisk"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#2563EB"
                          stopOpacity={0.35}
                        />

                        <stop
                          offset="95%"
                          stopColor="#2563EB"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />

                    <XAxis dataKey="month" axisLine={false} tickLine={false} />

                    <YAxis axisLine={false} tickLine={false} />

                    <Tooltip />

                    <Area
                      type="monotone"
                      dataKey="schools"
                      stroke="#2563EB"
                      strokeWidth={4}
                      fillOpacity={1}
                      fill="url(#colorRisk)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                  Distribusi Risiko
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Persentase tingkat risiko pendidikan
                </p>
              </div>

              {/* Chart */}
              <div className="mt-8 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" outerRadius={100}>
                      {pieData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="mt-6 space-y-4">
                {pieData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor: item.color,
                        }}
                      ></div>

                      <span className="text-sm text-slate-600">
                        {item.name}
                      </span>
                    </div>

                    <span className="text-sm font-bold text-slate-800">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom */}
      <section>
        <div className="grid gap-6 xl:grid-cols-3">
          {/* District */}
          <div className="xl:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              {/* Header */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                  Ranking Wilayah Risiko
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Wilayah dengan tingkat risiko tertinggi
                </p>
              </div>

              {/* Chart */}
              <div className="mt-8 h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={districtData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />

                    <XAxis dataKey="name" axisLine={false} tickLine={false} />

                    <YAxis axisLine={false} tickLine={false} />

                    <Tooltip />

                    <Bar
                      dataKey="value"
                      fill="#2563EB"
                      radius={[12, 12, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* AI Insight */}
          <div>
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-700 to-indigo-800 p-6 text-white shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10">
                <Brain size={28} />
              </div>

              <h2 className="mt-8 text-3xl font-black tracking-tight">
                AI Insight
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-blue-100">
                Sistem AI mendeteksi peningkatan risiko pendidikan signifikan di
                Kecamatan Coblong dan Kiaracondong selama 30 hari terakhir.
              </p>

              {/* Recommendation */}
              <div className="mt-8 rounded-3xl bg-white/10 p-5 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                  Recommendation
                </p>

                <h3 className="mt-3 text-lg font-bold">
                  Prioritaskan Bantuan Infrastruktur
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-blue-100">
                  Fokus distribusi bantuan pada sekolah dengan penurunan
                  kualitas fasilitas pembelajaran.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
