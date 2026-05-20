import { X } from "lucide-react";

export default function AppModal({
  open,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "max-w-2xl",
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5 backdrop-blur-sm">
      {/* Modal */}
      <div
        className={`w-full ${maxWidth} rounded-[32px] bg-white p-8 shadow-2xl`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              {title}
            </h2>

            {subtitle && (
              <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
            )}
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="rounded-2xl bg-slate-100 p-3 text-slate-600 transition hover:bg-slate-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
