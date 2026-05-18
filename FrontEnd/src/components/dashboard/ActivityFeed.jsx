import {
  Building2,
  CircleCheckBig,
  HandCoins,
  ShieldAlert,
} from "lucide-react";

const activities = [
  {
    title: "SD Negeri 01 Coblong mengirim data terbaru",
    description: "Data siswa rentan dan kondisi fasilitas berhasil diperbarui.",
    time: "2 jam lalu",
    icon: Building2,
    color: "bg-blue-100 text-blue-700 border-blue-200",
  },

  {
    title: "CSR PT Maju Jaya mengajukan bantuan",
    description:
      "Pengajuan bantuan perangkat digital untuk SMP Negeri 8 Bandung.",
    time: "5 jam lalu",
    icon: HandCoins,
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },

  {
    title: "Risk score Kecamatan Coblong meningkat",
    description:
      "AI mendeteksi peningkatan sekolah prioritas tinggi bulan ini.",
    time: "Hari ini",
    icon: ShieldAlert,
    color: "bg-amber-100 text-amber-700 border-amber-200",
  },

  {
    title: "Verifikasi data SMP Negeri 5 berhasil",
    description: "Data sekolah telah disetujui oleh operator Dinas Pendidikan.",
    time: "Kemarin",
    icon: CircleCheckBig,
    color: "bg-violet-100 text-violet-700 border-violet-200",
  },
];

export default function ActivityFeed() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              Live Activity
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-800">
              Aktivitas Sistem
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Monitoring aktivitas terbaru dari sekolah, CSR, dan sistem AI
              PINTARIN.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="p-6">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-[21px] top-0 h-full w-px bg-slate-200"></div>

          <div className="space-y-6">
            {activities.map((activity, index) => {
              const Icon = activity.icon;

              return (
                <div key={index} className="relative flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-2xl border ${activity.color}`}
                  >
                    <Icon size={18} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition hover:border-slate-200 hover:bg-white">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-semibold leading-relaxed text-slate-800">
                          {activity.title}
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed text-slate-500">
                          {activity.description}
                        </p>
                      </div>

                      <span className="whitespace-nowrap text-xs font-medium text-slate-400">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
