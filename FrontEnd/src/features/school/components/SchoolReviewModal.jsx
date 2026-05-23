import { Brain } from "lucide-react";

import AppModal from "../../../components/ui/AppModal";
import AppButton from "../../../components/ui/AppButton";

export default function SchoolReviewModal({
  open,
  onClose,
  school,
  onApprove,
  onReject,
}) {
  if (!school) return null;

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={school.name}
      subtitle="Review dan validasi data sekolah"
    >
      {/* Detail */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Kecamatan</p>

          <h3 className="mt-2 text-lg font-bold text-slate-800">
            {school.district}
          </h3>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Risk Score</p>

          <h3 className="mt-2 text-lg font-bold text-red-600">{school.risk}</h3>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Jumlah Siswa</p>

          <h3 className="mt-2 text-lg font-bold text-slate-800">
            {school.students}
          </h3>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Jenis Update</p>

          <h3 className="mt-2 text-lg font-bold text-slate-800">
            {school.update}
          </h3>
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="mt-6 rounded-3xl border border-blue-100 bg-blue-50 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
            <Brain size={22} />
          </div>

          <div>
            <h3 className="font-bold text-slate-800">AI Recommendation</h3>

            <p className="mt-1 text-sm text-slate-600">
              Data layak diprioritaskan untuk bantuan pendidikan semester ini.
            </p>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="mt-8 flex flex-wrap justify-end gap-4">
        <AppButton onClick={onClose}>Tutup</AppButton>

        <AppButton variant="danger" onClick={onReject}>
          Reject
        </AppButton>

        <AppButton variant="success" onClick={onApprove}>
          Approve
        </AppButton>
      </div>
    </AppModal>
  );
}
