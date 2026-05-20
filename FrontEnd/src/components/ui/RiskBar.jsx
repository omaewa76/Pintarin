export default function RiskBar({ value }) {
  const barColor =
    value >= 85 ? "bg-red-500" : value >= 75 ? "bg-yellow-500" : "bg-green-500";

  return (
    <div className="flex items-center gap-3">
      <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full ${barColor}`}
          style={{
            width: `${value}%`,
          }}
        />
      </div>

      <span className="text-sm font-bold text-slate-800">{value}</span>
    </div>
  );
}
