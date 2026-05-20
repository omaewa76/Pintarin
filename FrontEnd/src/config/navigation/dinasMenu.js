import {
  ChartColumn,
  HandCoins,
  LayoutDashboard,
  Map,
  School,
  Settings,
  Users,
} from "lucide-react";

const dinasMenu = [
  {
    title: "Beranda",
    icon: LayoutDashboard,
    path: "/dinas",
  },
  {
    title: "Peta Risiko",
    icon: Map,
    path: "/dinas/risk-map",
  },
  {
    title: "Data Sekolah",
    icon: School,
    path: "/dinas/schools",
  },
  {
    title: "Bantuan & CSR",
    icon: HandCoins,
    path: "/dinas/csr",
  },
  {
    title: "Laporan & Analitik",
    icon: ChartColumn,
    path: "/dinas/analytics",
  },
  {
    title: "Manajemen Akun",
    icon: Users,
    path: "/dinas/accounts",
  },
  {
    title: "Pengaturan",
    icon: Settings,
    path: "/dinas/settings",
  },
];

export default dinasMenu;