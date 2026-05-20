export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor,
  badgeColor,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-3xl ${iconColor}`}
        >
          <Icon size={26} />
        </div>
      </div>

      <div
        className={`mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${badgeColor}`}
      >
        {subtitle}
      </div>
    </div>
  );
}
