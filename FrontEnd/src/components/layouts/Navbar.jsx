export default function Navbar() {
  return (
    <header className="flex items-center justify-between rounded-[28px] border border-slate-200 bg-white px-8 py-5 shadow-sm">

      {/* Left */}
      <div>

        <p className="text-sm font-medium text-slate-400">
          Dashboard
        </p>

        <h1 className="mt-1 text-[28px] font-bold tracking-tight text-slate-800">
          Risk Analytics
        </h1>

      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        {/* Search */}
        <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">

          <span className="mr-3 text-slate-400">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search..."
            className="w-56 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />

        </div>

        {/* Notification */}
        <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-lg transition hover:bg-slate-50">

          🔔

          <div className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500"></div>

        </button>

        {/* Profile */}
        <button className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 transition hover:bg-slate-50">

          {/* Avatar */}
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-sm font-bold text-white">
            AQ
          </div>

          {/* User */}
          <div className="text-left">

            <h2 className="text-sm font-semibold text-slate-800">
              Aqmal Madani
            </h2>

            <p className="text-xs text-slate-400">
              Dinas Pendidikan
            </p>

          </div>

          <span className="text-slate-400">
            ⌄
          </span>

        </button>

      </div>

    </header>
  );
}