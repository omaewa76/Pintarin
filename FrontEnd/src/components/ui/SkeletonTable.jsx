export default function SkeletonTable({ rows = 5 }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-100 p-6">
        <div className="animate-pulse">
          <div className="h-6 w-56 rounded-xl bg-slate-200"></div>

          <div className="mt-3 h-4 w-80 rounded-xl bg-slate-100"></div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {[...Array(7)].map((_, index) => (
                <th key={index} className="px-6 py-4">
                  <div className="h-4 w-24 rounded-full bg-slate-200"></div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {[...Array(rows)].map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b border-slate-100">
                {[...Array(7)].map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-5">
                    <div className="animate-pulse">
                      <div className="h-4 w-full max-w-[120px] rounded-full bg-slate-200"></div>

                      {colIndex === 0 && (
                        <div className="mt-2 h-3 w-24 rounded-full bg-slate-100"></div>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
