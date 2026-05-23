import { ArrowUpRight } from "lucide-react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
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
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-100 p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <div className="h-2 w-2 rounded-full bg-blue-600"></div>
              Analytics Report
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-800">
              Trend Risiko Pendidikan
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Pergerakan jumlah sekolah risiko tinggi selama 6 bulan terakhir
              berdasarkan analisis AI.
            </p>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-medium text-slate-500">Total Growth</p>

              <div className="mt-2 flex items-center gap-2">
                <h3 className="text-xl font-bold tracking-tight text-slate-800">
                  +18%
                </h3>

                <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">
                  <ArrowUpRight size={12} />
                  2.4%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[360px] p-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity={0.35} />

                <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#E2E8F0"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748B",
                fontSize: 13,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748B",
                fontSize: 13,
              }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "16px",
                border: "1px solid #E2E8F0",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
                backgroundColor: "#FFFFFF",
              }}
            />

            <Area
              type="monotone"
              dataKey="schools"
              stroke="#2563EB"
              strokeWidth={3}
              fill="url(#riskGradient)"
              dot={{
                r: 0,
              }}
              activeDot={{
                r: 6,
                fill: "#2563EB",
                stroke: "#ffffff",
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
