import {
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

export default function StatusBadge({
  status,
}) {
  const config = {
    Pending: {
      icon: Clock3,
      className:
        "bg-yellow-100 text-yellow-700",
    },

    Approved: {
      icon: CheckCircle2,
      className:
        "bg-emerald-100 text-emerald-700",
    },

    Rejected: {
      icon: XCircle,
      className:
        "bg-red-100 text-red-700",
    },
  };

  const current =
    config[status] || config.Pending;

  const Icon = current.icon;

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${current.className}`}
    >
      <Icon size={14} />

      {status}
    </div>
  );
}