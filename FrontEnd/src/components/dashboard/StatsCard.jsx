import { ArrowUpRight } from "lucide-react";

export default function StatsCard({ title, value, subtitle, color }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Background Accent */}
      <div
        className={`absolute right-0 top-0 h-28 w-28 translate-x-10 -translate-y-10 rounded-full opacity-10 blur-2xl ${color}`}
      ></div>

      {/* Top */}
      <div className="relative flex items-start justify-between">
        {/* Left */}
        <div>
          <p className="text-sm font-medium tracking-tight text-slate-500">
            {title}
          </p>

          <h2 className="mt-4 text-[34px] font-bold tracking-tight text-slate-800">
            {value}
          </h2>
        </div>

        {/* Right */}
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-sm ${color}`}
        >
          <ArrowUpRight size={18} />
        </div>
      </div>

      {/* Bottom */}
      <div className="relative mt-6 flex items-center justify-between">
        <p className="max-w-[85%] text-sm leading-relaxed text-slate-500">
          {subtitle}
        </p>

        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
      </div>
    </div>
  );
}
