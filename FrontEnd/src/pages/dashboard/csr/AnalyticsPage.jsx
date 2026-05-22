import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const monthlyData = [
  { month: "Jan", value: 40 },
  { month: "Feb", value: 65 },
  { month: "Mar", value: 55 },
  { month: "Apr", value: 80 },
  { month: "Mei", value: 95 },
  { month: "Jun", value: 120 },
];

const districtData = [
  { district: "Coblong", value: 12 },
  { district: "Lengkong", value: 8 },
  { district: "Antapani", value: 15 },
  { district: "Sukajadi", value: 6 },
];

const pieData = [
  { name: "Infrastruktur", value: 45, color: "#F97316" },
  { name: "Beasiswa", value: 30, color: "#F59E0B" },
  { name: "Digital", value: 25, color: "#FB923C" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="rounded-[36px] bg-gradient-to-br from-orange-500 via-amber-500 to-orange-700 p-8 text-white shadow-sm">
        <h1 className="text-5xl font-black tracking-tight">
          Analitik Impact CSR
        </h1>

        <p className="mt-4 max-w-2xl text-sm text-orange-100">
          Analisis dampak distribusi bantuan CSR pendidikan.
        </p>
      </section>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Area */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800">Tren Bantuan</h2>

          <div className="mt-6 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#F97316"
                  fill="#FDBA74"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800">
            Distribusi Kecamatan
          </h2>

          <div className="mt-6 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtData}>
                <XAxis dataKey="district" />
                <YAxis />
                <Tooltip />

                <Bar dataKey="value" fill="#F59E0B" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pie */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800">
          Breakdown Jenis Bantuan
        </h2>

        <div className="mt-6 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={140} label>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
