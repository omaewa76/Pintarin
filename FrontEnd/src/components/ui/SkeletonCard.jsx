export default function SkeletonCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="animate-pulse">
        {/* Top */}
        <div className="flex items-start justify-between">
          <div>
            <div className="h-4 w-28 rounded-full bg-slate-200"></div>

            <div className="mt-4 h-10 w-24 rounded-2xl bg-slate-300"></div>
          </div>

          <div className="h-14 w-14 rounded-2xl bg-slate-200"></div>
        </div>

        {/* Bottom */}
        <div className="mt-6 h-8 w-40 rounded-full bg-slate-100"></div>
      </div>
    </div>
  );
}
