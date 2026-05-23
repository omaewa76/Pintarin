import {
  BarChart3,
  Building2,
  FileText,
  HandCoins,
  LayoutDashboard,
} from "lucide-react";

const csrMenu = [
  {
    title: "Beranda",
    icon: LayoutDashboard,
    path: "/csr",
  },
  {
    title: "Sekolah Prioritas",
    icon: Building2,
    path: "/csr/schools",
  },
  {
    title: "Distribusi Bantuan",
    icon: HandCoins,
    path: "/csr/distribution",
  },
  {
    title: "Analitik",
    icon: BarChart3,
    path: "/csr/analytics",
  },
  {
    title: "Laporan",
    icon: FileText,
    path: "/csr/reports",
  },
];

export default csrMenu;