import FilterTabs from "../../../components/ui/FilterTabs";

export default function CSRTabsSection({
  tabs,
  activeTab,
  setActiveTab,
}) {
  return (
    <section>
      <FilterTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        activeColor="bg-orange-600"
      />
    </section>
  );
}