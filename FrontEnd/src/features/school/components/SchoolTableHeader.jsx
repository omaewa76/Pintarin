import { ArrowUpRight } from "lucide-react";

import AppButton from "../../../components/ui/AppButton";

export default function SchoolTableHeader() {
  return (
    <div className="border-b border-slate-100 p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">
            School Verification Queue
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Monitoring perubahan data dan approval sekolah.
          </p>
        </div>

        <AppButton icon={ArrowUpRight}>Export Table</AppButton>
      </div>
    </div>
  );
}
