export default function StatsCard({
  title,
  value,
  subtitle,
  color,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Top */}
      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800">
            {value}
          </h2>

        </div>

        {/* Indicator */}
        <div
          className={`h-3 w-3 rounded-full ${color}`}
        ></div>

      </div>

      {/* Bottom */}
      <p className="mt-6 text-sm text-slate-500">
        {subtitle}
      </p>

    </div>
  );
}