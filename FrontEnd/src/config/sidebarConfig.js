import dinasMenu from "./navigation/dinasMenu";
import schoolMenu from "./navigation/schoolMenu";
import csrMenu from "./navigation/csrMenu";

const sidebarConfig = {
  dinas: {
    label: "Dinas Dashboard",

    menu: dinasMenu,

    theme: {
      background:
        "bg-[#162554]",

      text:
        "text-blue-100",

      hover:
        "hover:bg-white/10 hover:text-white",

      active:
        "bg-white text-blue-900 shadow-sm",

      activeIcon:
        "text-blue-700",

      icon:
        "text-blue-200",

      indicator:
        "bg-blue-700",
    },
  },

  school: {
    label: "School Dashboard",

    menu: schoolMenu,

    theme: {
      background:
        "bg-gradient-to-b from-emerald-900 to-teal-900",

      text:
        "text-emerald-100",

      hover:
        "hover:bg-white/10 hover:text-white",

      active:
        "bg-white text-emerald-900 shadow-sm",

      activeIcon:
        "text-emerald-700",

      icon:
        "text-emerald-100",

      indicator:
        "bg-emerald-600",
    },
  },

  csr: {
    label: "CSR Dashboard",

    menu: csrMenu,

    theme: {
      background:
        "bg-gradient-to-b from-orange-900 to-amber-800",

      text:
        "text-orange-100",

      hover:
        "hover:bg-white/10 hover:text-white",

      active:
        "bg-white text-orange-900 shadow-sm",

      activeIcon:
        "text-orange-700",

      icon:
        "text-orange-100",

      indicator:
        "bg-orange-600",
    },
  },
};

export default sidebarConfig;