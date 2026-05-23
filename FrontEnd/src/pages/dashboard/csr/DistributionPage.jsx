import { Building2, CheckCircle2, Clock3, Wallet } from "lucide-react";

import csrData from "../../../features/csr/data/csrData";

import StatsCard from "../../../components/dashboard/StatsCard";
import StatusBadge from "../../../components/ui/StatusBadge";

export default function DistributionPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="rounded-[36px] bg-gradient-to-br from-orange-500 via-amber-500 to-orange-700 p-8 text-white shadow-sm">
        <h1 className="text-5xl font-black tracking-tight">
          Distribusi Bantuan
        </h1>

        <p className="mt-4 max-w-2xl text-sm text-orange-100">
          Monitoring distribusi bantuan CSR pendidikan secara realtime.
        </p>
      </section>

      {/* Stats */}
      <section>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Total Bantuan"
            value="Rp 525 JT"
            icon={Wallet}
            iconBg="bg-orange-100"
            iconColor="text-orange-700"
          />

          <StatsCard
            title="Sekolah Penerima"
            value="32"
            icon={Building2}
            iconBg="bg-blue-100"
            iconColor="text-blue-700"
          />

          <StatsCard
            title="Pending"
            value="8"
            icon={Clock3}
            iconBg="bg-yellow-100"
            iconColor="text-yellow-700"
          />

          <StatsCard
            title="Selesai"
            value="24"
            icon={CheckCircle2}
            iconBg="bg-emerald-100"
            iconColor="text-emerald-700"
          />
        </div>
      </section>

      {/* Table */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {[
                  "Perusahaan",
                  "Sekolah",
                  "Jenis",
                  "Nilai",
                  "Status",
                  "Tanggal",
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
              {csrData.map((item, index) => (
                <tr key={index} className="border-b border-slate-100">
                  <td className="px-6 py-5 font-semibold text-slate-800">
                    {item.company}
                  </td>

                  <td className="px-6 py-5 text-sm text-slate-700">
                    {item.school}
                  </td>

                  <td className="px-6 py-5 text-sm text-slate-700">
                    {item.type}
                  </td>

                  <td className="px-6 py-5 text-sm font-semibold text-orange-700">
                    {item.value}
                  </td>

                  <td className="px-6 py-5">
                    <StatusBadge status={item.status} />
                  </td>

                  <td className="px-6 py-5 text-sm text-slate-500">
                    {item.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
