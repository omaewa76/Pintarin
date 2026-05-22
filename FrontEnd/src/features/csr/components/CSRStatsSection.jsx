import {
  Building2,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import StatsCard from "../../../components/dashboard/StatsCard";

export default function CSRStatsSection({
  totalCSR,
  pendingCount,
  approvedCount,
  rejectedCount,
}) {
  return (
    <section>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total CSR"
          value={totalCSR}
          icon={Building2}
          iconBg="bg-orange-100"
          iconColor="text-orange-700"
          badge="+5 partnership baru"
          badgeColor="bg-orange-100 text-orange-700"
          valueColor="text-slate-900"
        />

        <StatsCard
          title="Pending Review"
          value={pendingCount}
          icon={Clock3}
          iconBg="bg-yellow-100"
          iconColor="text-yellow-700"
          badge="Menunggu validasi"
          badgeColor="bg-yellow-100 text-yellow-700"
          valueColor="text-yellow-600"
        />

        <StatsCard
          title="Approved"
          value={approvedCount}
          icon={CheckCircle2}
          iconBg="bg-emerald-100"
          iconColor="text-emerald-700"
          badge="CSR tervalidasi"
          badgeColor="bg-emerald-100 text-emerald-700"
          valueColor="text-emerald-600"
        />

        <StatsCard
          title="Rejected"
          value={rejectedCount}
          icon={XCircle}
          iconBg="bg-red-100"
          iconColor="text-red-700"
          badge="CSR ditolak"
          badgeColor="bg-red-100 text-red-700"
          valueColor="text-red-600"
        />
      </div>
    </section>
  );
}