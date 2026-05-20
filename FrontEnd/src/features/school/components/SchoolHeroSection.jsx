import { ArrowUpRight, ShieldAlert, Sparkles } from "lucide-react";

import AppButton from "../../../components/ui/AppButton";

export default function SchoolHeroSection() {
  return (
    <section className="overflow-hidden rounded-[36px] border border-slate-200 bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 p-8 text-white shadow-sm">
      <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
            <Sparkles size={16} />
            School Intelligence Management
          </div>

          <h1 className="mt-6 max-w-3xl text-5xl font-black leading-tight tracking-tight">
            Monitoring & Verifikasi Sekolah
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-300">
            Monitoring data sekolah, validasi perubahan, dan analisis risiko
            pendidikan berbasis AI secara realtime.
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-wrap gap-4">
          <AppButton icon={ArrowUpRight} variant="ghost" className="py-4">
            Lihat Analytics
          </AppButton>

          <AppButton icon={ShieldAlert} variant="primary" className="py-4">
            Export Data
          </AppButton>
        </div>
      </div>
    </section>
  );
}
