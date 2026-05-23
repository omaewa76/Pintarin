import { useMemo, useState } from "react";

import toast from "react-hot-toast";

import initialSchoolData from "../data/schoolData";

export default function useSchoolManagement() {
  const [search, setSearch] = useState("");

  const [activeTab, setActiveTab] = useState("Pending");

  const [selectedSchool, setSelectedSchool] = useState(null);

  const [schools, setSchools] = useState(initialSchoolData);

  /* ================= ACTION ================= */

  const updateSchoolStatus = (schoolName, newStatus) => {
    const updatedSchools = schools.map((school) =>
      school.name === schoolName
        ? {
            ...school,
            status: newStatus,
          }
        : school,
    );

    setSchools(updatedSchools);

    setSelectedSchool({
      ...selectedSchool,
      status: newStatus,
    });

    if (newStatus === "Approved") {
      toast.success("Sekolah berhasil di-approve");
    } else {
      toast.error("Sekolah berhasil di-reject");
    }

    setTimeout(() => {
      setSelectedSchool(null);
    }, 500);
  };

  /* ================= FILTER ================= */

  const filteredSchools = useMemo(() => {
    return schools.filter((school) => {
      const matchSearch = school.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchStatus = school.status === activeTab;

      return matchSearch && matchStatus;
    });
  }, [search, activeTab, schools]);

  /* ================= STATS ================= */

  const pendingCount = schools.filter(
    (school) => school.status === "Pending",
  ).length;

  const approvedCount = schools.filter(
    (school) => school.status === "Approved",
  ).length;

  const rejectedCount = schools.filter(
    (school) => school.status === "Rejected",
  ).length;

  return {
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
  };
}
