export default function FilterTabs({
  tabs = [],
  activeTab,
  onChange,
  activeColor = "bg-blue-700",
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`rounded-2xl px-5 py-3 text-sm font-semibold transition

          ${
            activeTab === tab.value
              ? `${activeColor} text-white`
              : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          }

          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
