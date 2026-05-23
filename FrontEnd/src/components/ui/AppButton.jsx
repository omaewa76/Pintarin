import clsx from "clsx";

export default function AppButton({
  children,
  icon: Icon,
  variant = "default",
  onClick,
  className,
  type = "button",
}) {
  const variants = {
    default:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",

    primary: "bg-blue-600 text-white hover:bg-blue-700",

    success: "bg-emerald-600 text-white hover:bg-emerald-700",

    danger: "bg-red-600 text-white hover:bg-red-700",

    ghost:
      "border border-white/10 bg-white/10 text-white hover:bg-white/20 backdrop-blur",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition",
        variants[variant],
        className,
      )}
    >
      {Icon && <Icon size={18} />}

      {children}
    </button>
  );
}
