export default function RiskMapPreview() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Peta Risiko Pendidikan
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Preview wilayah risiko Kota Bandung
          </p>

        </div>

        <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">

          Lihat Lengkap

        </button>

      </div>

      {/* Fake Map */}
      <div className="mt-6 flex h-[320px] items-center justify-center rounded-3xl bg-gradient-to-br from-red-100 via-yellow-100 to-green-100">

        <p className="text-sm font-medium text-slate-600">
          Choropleth Map Preview
        </p>

      </div>

      {/* Legend */}
      <div className="mt-5 flex items-center gap-5 text-sm">

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          Risiko Tinggi
        </div>

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          Risiko Sedang
        </div>

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          Risiko Rendah
        </div>

      </div>

    </div>
  );
}