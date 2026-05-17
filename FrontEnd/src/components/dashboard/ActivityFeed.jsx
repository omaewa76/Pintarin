import {
  Building2,
  CircleCheckBig,
  HandCoins,
} from "lucide-react";

const activities = [
  {
    title: "SD Negeri 01 Coblong mengirim data terbaru",
    time: "2 jam lalu",
    icon: Building2,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "CSR PT Maju Jaya mengajukan bantuan",
    time: "5 jam lalu",
    icon: HandCoins,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Verifikasi data SMP Negeri 5 berhasil",
    time: "Kemarin",
    icon: CircleCheckBig,
    color: "bg-emerald-100 text-emerald-700",
  },
];

export default function ActivityFeed() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div>

        <h2 className="text-xl font-bold text-slate-800">
          Aktivitas Terbaru
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Aktivitas terbaru dari sistem PINTARIN
        </p>

      </div>

      {/* Activity List */}
      <div className="mt-6 space-y-5">

        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div
              key={index}
              className="flex items-start gap-4"
            >

              {/* Icon */}
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl ${activity.color}`}
              >

                <Icon size={20} />

              </div>

              {/* Content */}
              <div>

                <h3 className="font-medium text-slate-800">
                  {activity.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {activity.time}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}