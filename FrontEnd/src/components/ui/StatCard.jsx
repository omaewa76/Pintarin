function StatCard({ title, value, icon, variant = "default" }) {
  const variantStyles = {
    default: "border-slate-200 bg-white",
    blue: "border-blue-200 bg-blue-50/40",
    emerald: "border-emerald-200 bg-emerald-50/40",
    amber: "border-amber-200 bg-amber-50/40",
    purple: "border-purple-200 bg-purple-50/40",
  };

  const styles = variantStyles[variant] ?? variantStyles.default;

  return (
    <div className={`rounded-[20px] border ${styles} p-5 shadow-sm`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-lg">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;

