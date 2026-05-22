import { Download, Eye, FileText } from "lucide-react";

import assistanceData from "../../../features/school/data/assistanceData";

import AppButton from "../../../components/ui/AppButton";
import StatusBadge from "../../../components/ui/StatusBadge";

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="rounded-[36px] bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-900 p-8 text-white shadow-sm">
        <h1 className="text-5xl font-black tracking-tight">
          Laporan & Dokumen
        </h1>

        <p className="mt-4 max-w-2xl text-sm text-emerald-100">
          Monitoring laporan bantuan, dokumen CSR, dan histori pengajuan.
        </p>
      </section>

      {/* Stats */}
      <section>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Laporan</p>

            <h2 className="mt-4 text-4xl font-black text-slate-800">24</h2>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Bulan Ini</p>

            <h2 className="mt-4 text-4xl font-black text-emerald-600">8</h2>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Pending</p>

            <h2 className="mt-4 text-4xl font-black text-yellow-500">3</h2>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {[
                  "Jenis Bantuan",
                  "Nilai",
                  "Perusahaan CSR",
                  "Status",
                  "Tanggal Submit",
                  "Aksi",
                ].map((item) => (
                  <th
                    key={item}
                    className="px-6 py-4 text-left text-sm font-bold text-slate-700"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {assistanceData.map((item, index) => (
                <tr key={index} className="border-b border-slate-100">
                  <td className="px-6 py-5 font-semibold text-slate-800">
                    {item.type}
                  </td>

                  <td className="px-6 py-5 text-sm font-semibold text-emerald-700">
                    {item.value}
                  </td>

                  <td className="px-6 py-5 text-sm text-slate-700">
                    {item.company}
                  </td>

                  <td className="px-6 py-5">
                    <StatusBadge status={item.status} />
                  </td>

                  <td className="px-6 py-5 text-sm text-slate-500">
                    {item.date}
                  </td>

                  <td className="px-6 py-5">
                    <AppButton icon={Eye} className="px-4 py-2">
                      Lihat Detail
                    </AppButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Documents */}
      <section className="space-y-4">
        {[
          "Surat Penerimaan Bantuan",
          "Laporan Realisasi Bantuan",
          "Dokumen Audit Internal",
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <FileText size={26} />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-800">{item}</h3>

                <p className="mt-1 text-sm text-slate-500">PDF Document</p>
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
