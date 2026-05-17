import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-[1100px] px-6 py-14">
        {/* Top */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">P</div>
            <div>
              <p className="text-sm font-semibold text-slate-800">PINTARIN</p>
              <p className="text-xs text-slate-500">Biar Bantuan Pendidikan Nggak Salah Sasaran</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Login
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm">
              <span aria-hidden>✨</span> AI Risk Scoring untuk prioritas bantuan
            </p>

            <h1 className="mt-5 text-[44px] font-bold tracking-tight text-slate-900">
              Distribusi bantuan pendidikan
              <span className="text-blue-600"> lebih tepat sasaran</span>
            </h1>

            <p className="mt-5 text-base leading-relaxed text-slate-600">
              PINTARIN membantu Dinas, CSR, dan Sekolah mengambil keputusan berbasis data—
              mulai dari identifikasi wilayah risiko tinggi sampai rekomendasi bantuan.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/login"
                className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Mulai (Login)
              </Link>
              <div className="text-sm text-slate-500">
                Tidak perlu setup. UI siap untuk capstone.
              </div>
            </div>

            {/* Stats teaser */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-medium text-slate-500">Fokus</p>
                <p className="mt-2 text-xl font-bold text-slate-900">Risk Scoring</p>
              </div>
              <div className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-medium text-slate-500">Output</p>
                <p className="mt-2 text-xl font-bold text-slate-900">Rekomendasi</p>
              </div>
              <div className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-medium text-slate-500">Visual</p>
                <p className="mt-2 text-xl font-bold text-slate-900">Dashboard</p>
              </div>
            </div>
          </div>

          {/* Right mock card */}
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">AI Risk Map</p>
                <p className="mt-1 text-xs text-slate-500">Merah: tinggi • Kuning: sedang • Hijau: aman</p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 border border-slate-200">
                Preview
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                { label: "Wilayah prioritas", color: "bg-red-500" },
                { label: "Sekolah rentan", color: "bg-amber-500" },
                { label: "Kebutuhan mendesak", color: "bg-blue-600" },
                { label: "Stabil", color: "bg-emerald-600" },
              ].map((x) => (
                <div key={x.label} className="flex items-center gap-3 rounded-[20px] border border-slate-200 bg-slate-50 p-4">
                  <div className={`h-3.5 w-3.5 rounded-full ${x.color}`} />
                  <p className="text-sm font-semibold text-slate-800">{x.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[20px] border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">AI Recommendation</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">Wilayah dengan risiko tertinggi akan diprioritaskan untuk bantuan.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "Alasan berbasis data",
                  "Skor risiko terukur",
                  "Transparansi keputusan",
                ].map((t) => (
                  <span key={t} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 flex flex-col gap-2 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} PINTARIN — Capstone UI</p>
          <p className="text-sm text-slate-500">Inter • Tailwind • SaaS analytics feel</p>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;

