import StatsCard from "../../../components/dashboard/StatsCard";
import RiskMapPreview from "../../../components/dashboard/RiskMapPreview";
import TopDistricts from "../../../components/dashboard/TopDistricts";
import SchoolRiskTable from "../../../components/dashboard/SchoolRiskTable";
import ActivityFeed from "../../../components/dashboard/ActivityFeed";
import TrendChart from "../../../components/dashboard/TrendChart";
import AIInsightPanel from "../../../components/dashboard/AIInsightPanel";

export default function OverviewPage() {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Selamat datang kembali 👋
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-800">
            Dashboard Dinas Pendidikan
          </h1>
        </div>

        <button className="rounded-2xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800">
          Export Laporan
        </button>
      </div>

      {/* Cards */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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

      {/* AI Insight */}
      <div className="mt-8">
        <AIInsightPanel />
      </div>

      {/* Risk Section */}
      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RiskMapPreview />
        </div>

        <div>
          <TopDistricts />
        </div>
      </div>

      {/* Table */}
      <div className="mt-8">
        <SchoolRiskTable />
      </div>

      {/* Activity */}
      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <div>
          <ActivityFeed />
        </div>

        <div className="xl:col-span-2">
          <TrendChart />
        </div>
      </div>
    </>
  );
}
