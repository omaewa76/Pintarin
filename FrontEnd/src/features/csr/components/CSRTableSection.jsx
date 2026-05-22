import { Eye } from "lucide-react";

import AppTable from "../../../components/ui/AppTable";
import AppButton from "../../../components/ui/AppButton";
import StatusBadge from "../../../components/ui/StatusBadge";

export default function CSRTableSection({
  columns,
  csrList,
  onReview,
}) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-100 p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-800">
              CSR Verification Queue
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Monitoring bantuan CSR dan validasi distribusi bantuan.
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <AppTable
        columns={columns}
        data={csrList}
        emptyTitle="Tidak ada data CSR"
        emptyDescription="Coba gunakan keyword lain."
        renderRow={(item, index) => (
          <tr
            key={index}
            className="border-b border-slate-100 transition hover:bg-slate-50"
          >
            {/* Company */}
            <td className="px-6 py-5">
              <div>
                <h3 className="font-semibold tracking-tight text-slate-800">
                  {item.company}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Submit {item.date}
                </p>
              </div>
            </td>

            {/* School */}
            <td className="px-6 py-5 text-sm font-medium text-slate-700">
              {item.school}
            </td>

            {/* Type */}
            <td className="px-6 py-5 text-sm font-medium text-slate-700">
              {item.type}
            </td>

            {/* Value */}
            <td className="px-6 py-5 text-sm font-semibold text-slate-800">
              {item.value}
            </td>

            {/* Priority */}
            <td className="px-6 py-5">
              <div
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  item.priority === "High"
                    ? "bg-red-100 text-red-700"
                    : item.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {item.priority}
              </div>
            </td>

            {/* Status */}
            <td className="px-6 py-5">
              <StatusBadge status={item.status} />
            </td>

            {/* Action */}
            <td className="px-6 py-5 text-right">
              <AppButton
                icon={Eye}
                onClick={() => onReview(item)}
                className="px-4 py-2"
              >
                Review
              </AppButton>
            </td>
          </tr>
        )}
      />
    </section>
  );
}