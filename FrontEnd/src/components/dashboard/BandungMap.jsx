import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";

const districts = [
  {
    name: "Coblong",
    position: [-6.885, 107.618],
    risk: 92,
    schools: 34,
    color: "#EF4444",
  },
  {
    name: "Kiaracondong",
    position: [-6.924, 107.652],
    risk: 88,
    schools: 28,
    color: "#F97316",
  },
  {
    name: "Antapani",
    position: [-6.917, 107.66],
    risk: 81,
    schools: 22,
    color: "#EAB308",
  },
  {
    name: "Sukajadi",
    position: [-6.891, 107.596],
    risk: 65,
    schools: 15,
    color: "#22C55E",
  },
];

export default function BandungMap() {
  return (
    <MapContainer
      center={[-6.914744, 107.60981]}
      zoom={12}
      scrollWheelZoom={true}
      className="h-full w-full rounded-3xl"
    >

      {/* Tile */}
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Markers */}
      {districts.map((district, index) => (
        <CircleMarker
          key={index}
          center={district.position}
          radius={18}
          pathOptions={{
            color: district.color,
            fillColor: district.color,
            fillOpacity: 0.7,
          }}
        >

          <Popup>

            <div className="space-y-2">

              <h2 className="text-lg font-bold">
                {district.name}
              </h2>

              <p>
                Risk Score:
                <span className="ml-2 font-bold">
                  {district.risk}
                </span>
              </p>

              <p>
                Sekolah Risiko:
                <span className="ml-2 font-bold">
                  {district.schools}
                </span>
              </p>

            </div>

          </Popup>

        </CircleMarker>
      ))}

    </MapContainer>
  );
}