import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import riskDistrictData from "../../data/riskDistrictData";

function getRiskColor(score) {
  if (score >= 80) return "#EF4444";

  if (score >= 60) return "#F59E0B";

  return "#10B981";
}

function getRiskLabel(score) {
  if (score >= 80) return "Tinggi";

  if (score >= 60) return "Sedang";

  return "Rendah";
}

export default function BandungMap() {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-slate-200 shadow-sm">
      <MapContainer
        center={[-6.9175, 107.6191]}
        zoom={11}
        scrollWheelZoom={false}
        className="z-10 h-[650px] w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* District Markers */}
        {riskDistrictData.map((district, index) => (
          <CircleMarker
            key={index}
            center={[district.lat, district.lng]}
            radius={18}
            pathOptions={{
              color: getRiskColor(district.risk),
              fillColor: getRiskColor(district.risk),
              fillOpacity: 0.75,
              weight: 3,
            }}
          >
            <Tooltip
              direction="top"
              offset={[0, -10]}
              opacity={1}
              permanent={false}
            >
              <div className="min-w-[200px] space-y-2 p-1">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    {district.name}
                  </h3>

                  <p className="text-xs text-slate-500">Kecamatan Bandung</p>
                </div>

                <div className="space-y-1 text-xs text-slate-700">
                  <div className="flex items-center justify-between gap-3">
                    <span>Risk Score</span>

                    <span
                      className="font-bold"
                      style={{
                        color: getRiskColor(district.risk),
                      }}
                    >
                      {district.risk} ({getRiskLabel(district.risk)})
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span>Jumlah Sekolah</span>

                    <span className="font-semibold">{district.schools}</span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span>Siswa Rentan</span>

                    <span className="font-semibold">
                      {district.vulnerableStudents}
                    </span>
                  </div>
                </div>
              </div>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-5 right-5 z-[999] rounded-2xl bg-white p-4 shadow-xl">
        <h3 className="mb-3 text-sm font-bold text-slate-800">Risk Legend</h3>

        <div className="space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>

            <span>Risiko Tinggi (≥80)</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>

            <span>Risiko Sedang (60-79)</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-emerald-500"></div>

            <span>Risiko Rendah (&lt;60)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
