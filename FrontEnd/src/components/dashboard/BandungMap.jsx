import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";

const districts = [
  {
    name: "Coblong",
    position: [-6.885, 107.618],
    risk: 92,
    schools: 34,
    students: 1240,
    status: "Risiko Tinggi",
    color: "#EF4444",
  },

  {
    name: "Kiaracondong",
    position: [-6.924, 107.652],
    risk: 88,
    schools: 28,
    students: 980,
    status: "Risiko Tinggi",
    color: "#F97316",
  },

  {
    name: "Antapani",
    position: [-6.917, 107.66],
    risk: 81,
    schools: 22,
    students: 870,
    status: "Risiko Sedang",
    color: "#EAB308",
  },

  {
    name: "Sukajadi",
    position: [-6.891, 107.596],
    risk: 65,
    schools: 15,
    students: 620,
    status: "Risiko Rendah",
    color: "#22C55E",
  },
];

export default function BandungMap() {
  return (
    <MapContainer
      center={[-6.914744, 107.60981]}
      zoom={12}
      scrollWheelZoom={true}
      className="h-full w-full rounded-[28px]"
    >
      {/* Tile */}
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Marker */}
      {districts.map((district, index) => (
        <CircleMarker
          key={index}
          center={district.position}
          radius={22}
          pathOptions={{
            color: district.color,
            fillColor: district.color,
            fillOpacity: 0.75,
            weight: 4,
          }}
        >
          {/* Popup */}
          <Popup>
            <div className="min-w-[240px] space-y-5 p-1">
              {/* Header */}
              <div>
                <div
                  className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{
                    backgroundColor: district.color,
                  }}
                >
                  {district.status}
                </div>

                <h2 className="mt-3 text-xl font-bold tracking-tight text-slate-800">
                  {district.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Monitoring wilayah pendidikan
                </p>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                {/* Risk */}
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-500">Risk Score</span>

                  <span
                    className="text-lg font-black"
                    style={{
                      color: district.color,
                    }}
                  >
                    {district.risk}
                  </span>
                </div>

                {/* Schools */}
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-500">Sekolah Risiko</span>

                  <span className="font-bold text-slate-800">
                    {district.schools}
                  </span>
                </div>

                {/* Students */}
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-500">Siswa Rentan</span>

                  <span className="font-bold text-slate-800">
                    {district.students}
                  </span>
                </div>
              </div>

              {/* Progress */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Risk Level
                  </span>

                  <span className="text-xs font-semibold text-slate-600">
                    {district.risk}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${district.risk}%`,
                      backgroundColor: district.color,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
