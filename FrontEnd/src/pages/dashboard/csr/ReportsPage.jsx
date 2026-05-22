import { Download, FileText } from "lucide-react";

import AppButton from "../../../components/ui/AppButton";
import StatusBadge from "../../../components/ui/StatusBadge";

const reports = [
  {
    name: "Laporan Distribusi CSR Q1",
    period: "Jan - Mar 2026",
    status: "Approved",
  },

  {
    name: "Laporan Impact Pendidikan",
    period: "April 2026",
    status: "Pending",
  },

  {
    name: "Realisasi Bantuan Sekolah",
    period: "Mei 2026",
    status: "Approved",
  },

  {
    name: "Laporan Audit CSR",
    period: "Semester 1 2026",
    status: "Rejected",
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="rounded-[36px] bg-gradient-to-br from-orange-500 via-amber-500 to-orange-700 p-8 text-white shadow-sm">
        <h1 className="text-5xl font-black tracking-tight">Laporan CSR</h1>

        <p className="mt-4 max-w-2xl text-sm text-orange-100">
          Download laporan dan dokumen distribusi bantuan CSR.
        </p>
      </section>

      {/* Reports */}
      <section className="space-y-4">
        {reports.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
                <FileText size={26} />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  {item.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">{item.period}</p>

                <div className="mt-3">
                  <StatusBadge status={item.status} />
                </div>
              </div>
            </div>

            <AppButton icon={Download} className="px-5 py-3">
              Download
            </AppButton>
          </div>
        ))}
      </section>
    </div>
  );
}
