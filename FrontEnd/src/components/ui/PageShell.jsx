export default function PageShell({ title, subtitle, children }) {
  return (
    <div>
      <section className="space-y-3">
        {subtitle ? (
          <p className="text-sm font-medium text-slate-400">{subtitle}</p>
        ) : null}
        <h1 className="text-[38px] font-bold tracking-tight text-slate-800">{title}</h1>
      </section>
      {children}
    </div>
  );
}

