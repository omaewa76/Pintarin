import { useMemo, useState } from "react";

import toast from "react-hot-toast";

import csrData from "../data/csrData";

export default function useCSRManagement() {
  const [search, setSearch] = useState("");

  const [activeTab, setActiveTab] = useState("All");

  const [selectedCSR, setSelectedCSR] = useState(null);

  const [csrList, setCSRList] = useState(csrData);

  /* ================= ACTION ================= */

  const updateCSRStatus = (companyName, newStatus) => {
    const updatedCSR = csrList.map((item) =>
      item.company === companyName
        ? {
            ...item,
            status: newStatus,
          }
        : item,
    );

    setCSRList(updatedCSR);

    setSelectedCSR({
      ...selectedCSR,
      status: newStatus,
    });

    if (newStatus === "Approved") {
      toast.success("CSR berhasil di-approve");
    } else {
      toast.error("CSR berhasil di-reject");
    }

    setTimeout(() => {
      setSelectedCSR(null);
    }, 500);
  };

  /* ================= FILTER ================= */

  const filteredCSR = useMemo(() => {
    return csrList.filter((item) => {
      const matchSearch =
        item.company.toLowerCase().includes(search.toLowerCase()) ||
        item.school.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        activeTab === "All" || item.status === activeTab;

      return matchSearch && matchStatus;
    });
  }, [search, activeTab, csrList]);

  /* ================= STATS ================= */

  const pendingCount = csrList.filter(
    (item) => item.status === "Pending",
  ).length;

  const approvedCount = csrList.filter(
    (item) => item.status === "Approved",
  ).length;

  const rejectedCount = csrList.filter(
    (item) => item.status === "Rejected",
  ).length;

  return {
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
  };
}