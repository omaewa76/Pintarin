export default function Chip({ children, variant = "neutral" }) {
  const variants = {
    neutral: "border-slate-200 bg-slate-50 text-slate-700",
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    purple: "border-purple-200 bg-purple-50 text-purple-700",
    red: "border-red-200 bg-red-50 text-red-700",
  };

  const cls = variants[variant] ?? variants.neutral;
  return (
    <span className={`rounded-2xl border px-4 py-2 text-xs font-semibold ${cls}`}>{children}</span>
  );
}

