import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const data = [
  {
    month: "Jan",
    schools: 120,
  },
  {
    month: "Feb",
    schools: 180,
  },
  {
    month: "Mar",
    schools: 150,
  },
  {
    month: "Apr",
    schools: 240,
  },
  {
    month: "Mei",
    schools: 210,
  },
  {
    month: "Jun",
    schools: 280,
  },
];

export default function TrendChart() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Tren Risiko Pendidikan
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Perkembangan sekolah berisiko selama 6 bulan terakhir
          </p>

        </div>

        <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">

          6 Bulan

        </button>

      </div>

      {/* Chart */}
      <div className="mt-8 h-[320px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E2E8F0"
            />

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

            <Line
              type="monotone"
              dataKey="schools"
              stroke="#2563EB"
              strokeWidth={4}
              dot={{
                r: 5,
                fill: "#2563EB",
              }}
              activeDot={{
                r: 7,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}