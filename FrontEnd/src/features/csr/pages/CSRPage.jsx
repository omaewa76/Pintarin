import useCSRManagement from "../hooks/useCSRManagement";

import { csrTabs, csrColumns } from "../constants/csr";

import CSRHeroSection from "../components/CSRHeroSection";
import CSRStatsSection from "../components/CSRStatsSection";
import CSRTabsSection from "../components/CSRTabsSection";
import CSRFilterSection from "../components/CSRFilterSection";
import CSRTableSection from "../components/CSRTableSection";
import CSRReviewModal from "../components/CSRReviewModal";

export default function CSRPage() {
  const {
    search,
    setSearch,

    activeTab,
    setActiveTab,

    selectedCSR,
    setSelectedCSR,

    csrList,
    filteredCSR,

    pendingCount,
    approvedCount,
    rejectedCount,

    updateCSRStatus,
  } = useCSRManagement();

  return (
    <div className="space-y-8">
      {/* Hero */}
      <CSRHeroSection />

      {/* Stats */}
      <CSRStatsSection
        totalCSR={csrList.length}
        pendingCount={pendingCount}
        approvedCount={approvedCount}
        rejectedCount={rejectedCount}
      />

      {/* Tabs */}
      <CSRTabsSection
        tabs={csrTabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Filter */}
      <CSRFilterSection search={search} setSearch={setSearch} />

      {/* Table */}
      <CSRTableSection
        columns={csrColumns}
        csrList={filteredCSR}
        onReview={setSelectedCSR}
      />

      {/* Modal */}
      <CSRReviewModal
        open={!!selectedCSR}
        onClose={() => setSelectedCSR(null)}
        csr={selectedCSR}
        onReject={() => updateCSRStatus(selectedCSR.company, "Rejected")}
        onApprove={() => updateCSRStatus(selectedCSR.company, "Approved")}
      />
    </div>
  );
}
