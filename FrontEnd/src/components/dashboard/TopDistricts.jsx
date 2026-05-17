const districts = [
  {
    name: "Coblong",
    risk: 92,
    schools: 34,
  },
  {
    name: "Kiaracondong",
    risk: 88,
    schools: 28,
  },
  {
    name: "Antapani",
    risk: 84,
    schools: 25,
  },
  {
    name: "Lengkong",
    risk: 81,
    schools: 22,
  },
  {
    name: "Sukajadi",
    risk: 79,
    schools: 19,
  },
];

export default function TopDistricts() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div>

        <h2 className="text-xl font-bold text-slate-800">
          Ranking Kecamatan
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Risiko pendidikan tertinggi minggu ini
        </p>

      </div>

      {/* List */}
      <div className="mt-6 space-y-4">

        {districts.map((district, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4"
          >

            {/* Left */}
            <div>

              <h3 className="font-semibold text-slate-800">
                {district.name}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {district.schools} sekolah berisiko
              </p>

            </div>

            {/* Right */}
            <div className="rounded-xl bg-red-100 px-3 py-2 text-sm font-bold text-red-600">

              {district.risk}

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}