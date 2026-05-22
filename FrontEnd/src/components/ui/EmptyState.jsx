import AppButton from "./AppButton";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      {/* Icon */}
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
        {Icon && <Icon size={40} />}
      </div>

      {/* Content */}
      <div className="mt-6">
        <h3 className="text-xl font-bold tracking-tight text-slate-800">
          {title}
        </h3>

        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-500">
          {description}
        </p>
      </div>

      {/* Action */}
      {actionLabel && onAction && (
        <div className="mt-8">
          <AppButton onClick={onAction}>{actionLabel}</AppButton>
        </div>
      )}
    </div>
  );
}
