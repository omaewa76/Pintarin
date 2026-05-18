import { ArrowUpRight, Download } from "lucide-react";

import StatsCard from "../../../components/dashboard/StatsCard";
import RiskMapPreview from "../../../components/dashboard/RiskMapPreview";
import TopDistricts from "../../../components/dashboard/TopDistricts";
import SchoolRiskTable from "../../../components/dashboard/SchoolRiskTable";
import ActivityFeed from "../../../components/dashboard/ActivityFeed";
import TrendChart from "../../../components/dashboard/TrendChart";
import AIInsightPanel from "../../../components/dashboard/AIInsightPanel";

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm lg:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          {/* Left */}
          <div>
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold tracking-wide text-blue-700">
              Education Intelligence System
            </div>

            <h1 className="mt-5 text-[28px] font-bold tracking-tight text-slate-800">
              Dashboard Dinas Pendidikan
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">
              Monitoring risiko pendidikan, verifikasi sekolah, dan distribusi
              bantuan CSR berbasis data secara terintegrasi.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              <ArrowUpRight size={18} />
              Lihat Analytics
            </button>

            <button className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800">
              <Download size={18} />
              Export Laporan
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold tracking-tight text-slate-800">
            Ringkasan Sistem
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Overview kondisi pendidikan terbaru hari ini.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Total Sekolah"
            value="2,341"
            subtitle="2,210 aktif • 131 pending"
            color="bg-blue-500"
          />

          <StatsCard
            title="Risiko Tinggi"
            value="328"
            subtitle="14% dari total sekolah"
            color="bg-red-500"
          />

          <StatsCard
            title="Pending Approval"
            value="42"
            subtitle="Perlu ditinjau hari ini"
            color="bg-yellow-500"
          />

          <StatsCard
            title="Bantuan Tersalur"
            value="Rp 1.2 M"
            subtitle="Bulan Mei 2026"
            color="bg-green-500"
          />
        </div>
      </section>

      {/* AI Insight */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold tracking-tight text-slate-800">
            AI Risk Intelligence
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Analisis prioritas bantuan berdasarkan data sekolah.
          </p>
        </div>

        <AIInsightPanel />
      </section>

      {/* Risk Monitoring */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold tracking-tight text-slate-800">
            Monitoring Risiko Wilayah
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Visualisasi wilayah prioritas dan sekolah berisiko.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <RiskMapPreview />
          </div>

          <div>
            <TopDistricts />
          </div>
        </div>
      </section>

      {/* School Table */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold tracking-tight text-slate-800">
            Sekolah Prioritas Tinggi
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Monitoring sekolah dengan risk score tertinggi.
          </p>
        </div>

        <SchoolRiskTable />
      </section>

      {/* Activity & Chart */}
      <section>
        <div className="grid gap-6 xl:grid-cols-3">
          {/* Activity */}
          <div>
            <div className="mb-5">
              <h2 className="text-xl font-bold tracking-tight text-slate-800">
                Aktivitas Sistem
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Aktivitas terbaru dalam platform.
              </p>
            </div>

            <ActivityFeed />
          </div>

          {/* Chart */}
          <div className="xl:col-span-2">
            <div className="mb-5">
              <h2 className="text-xl font-bold tracking-tight text-slate-800">
                Trend Risiko Pendidikan
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Pergerakan sekolah risiko tinggi selama 6 bulan terakhir.
              </p>
            </div>

            <TrendChart />
          </div>
        </div>
      </section>
    </div>
  );
}
