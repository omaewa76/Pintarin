import FilterTabs from "../../../components/ui/FilterTabs";

export default function SchoolTabsSection({ tabs, activeTab, setActiveTab }) {
  return (
    <section>
      <FilterTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        activeColor="bg-blue-700"
      />
    </section>
  );
}
