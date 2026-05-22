import {
  Building2,
  CheckCircle2,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import AppModal from "../../../components/ui/AppModal";
import AppButton from "../../../components/ui/AppButton";
import StatusBadge from "../../../components/ui/StatusBadge";

export default function CSRReviewModal({
  open,
  onClose,
  csr,
  onApprove,
  onReject,
}) {
  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={csr?.company}
      subtitle="Review dan validasi bantuan CSR"
    >
      {csr && (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Sekolah</p>

              <h3 className="mt-2 text-lg font-bold text-slate-800">
                {csr.school}
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Jenis Bantuan</p>

              <h3 className="mt-2 text-lg font-bold text-slate-800">
                {csr.type}
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Nominal</p>

              <h3 className="mt-2 text-lg font-bold text-orange-700">
                {csr.value}
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Priority</p>

              <div className="mt-3">
                <StatusBadge status={csr.status} />
              </div>
            </div>
          </div>

          {/* AI Insight */}
          <div className="mt-6 rounded-3xl border border-orange-100 bg-orange-50 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
                <Building2 size={22} />
              </div>

              <div>
                <h3 className="font-bold text-slate-800">
                  CSR Recommendation
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                  Bantuan CSR sesuai prioritas kebutuhan sekolah dan layak
                  diproses.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap justify-end gap-4">
            <AppButton onClick={onClose}>
              Tutup
            </AppButton>

            <AppButton
              variant="danger"
              icon={XCircle}
              onClick={onReject}
            >
              Reject
            </AppButton>

            <AppButton
              variant="success"
              icon={CheckCircle2}
              onClick={onApprove}
            >
              Approve
            </AppButton>
          </div>
        </>
      )}
    </AppModal>
  );
}