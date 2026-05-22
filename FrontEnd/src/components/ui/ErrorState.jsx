import { AlertCircle, RefreshCw } from "lucide-react";

import AppButton from "./AppButton";

export default function ErrorState({
  message = "Terjadi kesalahan.",
  onRetry,
}) {
  return (
    <div className="rounded-3xl border border-red-100 bg-white p-10 text-center shadow-sm">
      {/* Icon */}
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-100 text-red-600">
        <AlertCircle size={40} />
      </div>

      {/* Content */}
      <div className="mt-6">
        <h3 className="text-xl font-bold tracking-tight text-slate-800">
          Terjadi Kesalahan
        </h3>

        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-500">
          {message}
        </p>
      </div>

      {/* Retry */}
      {onRetry && (
        <div className="mt-8">
          <AppButton icon={RefreshCw} onClick={onRetry}>
            Coba Lagi
          </AppButton>
        </div>
      )}
    </div>
  );
}
