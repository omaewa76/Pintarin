import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const ROLES = [
  { key: "admin", label: "Admin Sistem", path: "/admin" },
  { key: "dinas", label: "Dinas Pendidikan", path: "/dinas" },
  { key: "csr", label: "CSR / Perusahaan", path: "/csr" },
  { key: "school", label: "School", path: "/school" },
];

function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("dinas");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const selected = useMemo(() => ROLES.find((r) => r.key === role) ?? ROLES[1], [role]);

  function onSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // Stub auth: langsung redirect sesuai role.
    setTimeout(() => {
      setLoading(false);
      navigate(selected.path);
    }, 500);
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-[980px] px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm">
              <span aria-hidden>🔒</span> Role-based access (stub)
            </p>

            <h1 className="mt-5 text-[36px] font-bold tracking-tight text-slate-900">
              Masuk ke PINTARIN
            </h1>

            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Login ini masih berbasis UI (capstone). Setelah autentikasi selesai,
              redirect akan mengikuti role yang dipilih.
            </p>

            <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-800">Kenapa AI Risk Scoring?</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Prioritas bantuan berdasarkan risiko pendidikan</li>
                <li>• Rekomendasi transparan untuk stakeholder</li>
                <li>• Monitoring dampak bantuan</li>
              </ul>
            </div>
          </div>

          <div>
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Login</h2>

              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Role</label>
                  <div className="grid grid-cols-2 gap-3">
                    {ROLES.map((r) => (
                      <button
                        key={r.key}
                        type="button"
                        onClick={() => setRole(r.key)}
                        className={
                          role === r.key
                            ? "rounded-2xl border border-slate-300 bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-900 shadow-sm"
                            : "rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        }
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="nama@instansi.go.id"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-300"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-300"
                    required
                  />
                </div>

                <button
                  disabled={loading}
                  className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-60"
                >
                  {loading ? "Memproses..." : `Masuk sebagai ${selected.label}`}
                </button>

                <p className="text-center text-xs text-slate-500">
                  Dengan login, kamu akan diarahkan ke dashboard role yang dipilih.
                </p>
              </form>
            </div>

            <div className="mt-4 text-center text-sm text-slate-500">
              Butuh akun? (stub) — integrasi backend akan ditambahkan pada fase berikutnya.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

