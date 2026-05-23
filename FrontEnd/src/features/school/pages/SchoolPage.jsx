import useSchoolManagement from "../hooks/useSchoolManagement";

import {
  schoolTabs,
  schoolColumns,
} from "../constants/school";

import SchoolReviewModal from "../components/SchoolReviewModal";

import SchoolHeroSection from "../components/SchoolHeroSection";
import SchoolStatsSection from "../components/SchoolStatsSection";
import SchoolTableSection from "../components/SchoolTableSection";
import SchoolFilterSection from "../components/SchoolFilterSection";
import SchoolTabsSection from "../components/SchoolTabsSection";

export default function SchoolPage() {
  const {
    search,
    setSearch,

    activeTab,
    setActiveTab,

    selectedSchool,
    setSelectedSchool,

    schools,
    filteredSchools,

    pendingCount,
    approvedCount,
    rejectedCount,

    updateSchoolStatus,
  } = useSchoolManagement();

  return (
    <div className="space-y-8">
      {/* Hero */}
      <SchoolHeroSection />

      {/* Stats */}
      <SchoolStatsSection
        totalSchools={schools.length}
        pendingCount={pendingCount}
        approvedCount={approvedCount}
        rejectedCount={rejectedCount}
      />

      {/* Tabs */}
      <SchoolTabsSection
        tabs={schoolTabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Filter */}
      <SchoolFilterSection search={search} setSearch={setSearch} />

      {/* Table */}
      <SchoolTableSection
        columns={schoolColumns}
        schools={filteredSchools}
        onReview={setSelectedSchool}
      />

      {/* Review Modal */}
      <SchoolReviewModal
        open={!!selectedSchool}
        onClose={() => setSelectedSchool(null)}
        school={selectedSchool}
        onReject={() => updateSchoolStatus(selectedSchool.name, "Rejected")}
        onApprove={() => updateSchoolStatus(selectedSchool.name, "Approved")}
      />
    </div>
  );
}
