export default function PageHeader({
  badge,
  title,
  description,
  actions,
}) {
  return (
    <section className="overflow-hidden rounded-[36px] border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-sm">
      <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
        {/* Left */}
        <div>
          {badge}

          <h1 className="mt-6 max-w-3xl text-5xl font-black leading-tight tracking-tight">
            {title}
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-300">
            {description}
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-wrap gap-4">
          {actions}
        </div>
      </div>
    </section>
  );
}