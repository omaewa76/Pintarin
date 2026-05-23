export default function AppTable({
  columns = [],
  data = [],
  renderRow,
  emptyTitle = "Data kosong",
  emptyDescription = "Belum ada data tersedia",
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1100px]">
        {/* Head */}
        <thead className="border-b border-slate-100 bg-slate-50/70">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500
                  
                  ${
                    column.align === "right"
                      ? "text-right"
                      : column.align === "center"
                        ? "text-center"
                        : "text-left"
                  }
                  
                `}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => renderRow(item, index))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-16 text-center">
                <div className="flex flex-col items-center">
                  <div className="rounded-3xl bg-slate-100 px-6 py-5">
                    <h3 className="text-lg font-bold text-slate-700">
                      {emptyTitle}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      {emptyDescription}
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
