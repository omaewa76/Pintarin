import { ArrowUpRight, Building2, ShieldCheck } from "lucide-react";

import AppButton from "../../../components/ui/AppButton";

export default function CSRHeroSection() {
  return (
    <section className="overflow-hidden rounded-[36px] border border-orange-200 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-700 p-8 text-white shadow-sm">
      <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
            <Building2 size={16} />
            CSR Partnership Management
          </div>

          <h1 className="mt-6 max-w-3xl text-5xl font-black leading-tight tracking-tight">
            Monitoring Bantuan CSR
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-orange-100">
            Monitoring distribusi bantuan CSR pendidikan, validasi bantuan,
            dan tracking partnership perusahaan secara realtime.
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-wrap gap-4">
          <AppButton
            icon={ArrowUpRight}
            variant="ghost"
            className="border-white/20 bg-white/10 py-4 text-white hover:bg-white/20"
          >
            Lihat Analytics
          </AppButton>

          <AppButton
            icon={ShieldCheck}
            variant="primary"
            className="bg-white py-4 text-orange-700 hover:bg-orange-50"
          >
            Export Data
          </AppButton>
        </div>
      </div>
    </section>
  );
}