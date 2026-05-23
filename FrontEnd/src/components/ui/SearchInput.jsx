import { Search } from "lucide-react";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Cari data...",
  className = "",
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 ${className}`}
    >
      <Search size={18} className="text-slate-400" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
      />
    </div>
  );
}
