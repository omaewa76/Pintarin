import {
  BarChart3,
  FileText,
  GraduationCap,
  HandCoins,
  LayoutDashboard,
} from "lucide-react";

const schoolMenu = [
  {
    title: "Beranda",
    icon: LayoutDashboard,
    path: "/school",
  },
  {
    title: "Profil Sekolah",
    icon: GraduationCap,
    path: "/school/profile",
  },
  {
    title: "Pengajuan Bantuan",
    icon: HandCoins,
    path: "/school/assistance",
  },
  {
    title: "Analitik",
    icon: BarChart3,
    path: "/school/analytics",
  },
  {
    title: "Laporan",
    icon: FileText,
    path: "/school/reports",
  },
];

export default schoolMenu;