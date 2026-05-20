export default function StatsCard({
  title,
  value,
  icon: Icon,
  iconColor = "",
  iconBg = "",
  valueColor = "text-slate-900",
  badge,
  badgeColor = "",
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h2
            className={`mt-4 text-4xl font-black tracking-tight ${valueColor}`}
          >
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-3xl ${iconBg} ${iconColor}`}
        >
          {Icon && <Icon size={26} />}
        </div>
      </div>

      {badge && (
        <div
          className={`mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${badgeColor}`}
        >
          {badge}
        </div>
      )}
    </div>
  );
}
