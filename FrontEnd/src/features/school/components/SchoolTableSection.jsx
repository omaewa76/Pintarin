import { Eye } from "lucide-react";

import AppTable from "../../../components/ui/AppTable";
import AppButton from "../../../components/ui/AppButton";
import StatusBadge from "../../../components/ui/StatusBadge";
import RiskBar from "../../../components/ui/RiskBar";

import SchoolTableHeader from "./SchoolTableHeader";

export default function SchoolTableSection({ columns, schools, onReview }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <SchoolTableHeader />

      <AppTable
        columns={columns}
        data={schools}
        emptyTitle="Tidak ada data ditemukan"
        emptyDescription="Coba gunakan keyword lain."
        renderRow={(school, index) => (
          <tr
            key={index}
            className="border-b border-slate-100 transition hover:bg-slate-50"
          >
            {/* School */}
            <td className="px-6 py-5">
              <div>
                <h3 className="font-semibold tracking-tight text-slate-800">
                  {school.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Submit {school.date}
                </p>
              </div>
            </td>

            {/* District */}
            <td className="px-6 py-5 text-sm font-medium text-slate-700">
              {school.district}
            </td>

            {/* Risk */}
            <td className="px-6 py-5">
              <RiskBar value={school.risk} />
            </td>

            {/* Students */}
            <td className="px-6 py-5 text-sm font-medium text-slate-700">
              {school.students}
            </td>

            {/* Update */}
            <td className="px-6 py-5 text-sm font-medium text-slate-700">
              {school.update}
            </td>

            {/* Status */}
            <td className="px-6 py-5">
              <StatusBadge status={school.status} />
            </td>

            {/* Action */}
            <td className="px-6 py-5 text-right">
              <AppButton
                icon={Eye}
                onClick={() => onReview(school)}
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
