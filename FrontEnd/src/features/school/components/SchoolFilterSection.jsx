import SearchInput from "../../../components/ui/SearchInput";
import AppButton from "../../../components/ui/AppButton";

export default function SchoolFilterSection({ search, setSearch }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 xl:grid-cols-4">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari sekolah..."
          className="xl:col-span-2"
        />

        <AppButton className="justify-center py-4">Semua Kecamatan</AppButton>

        <AppButton className="justify-center py-4">Semua Status</AppButton>
      </div>
    </section>
  );
}
