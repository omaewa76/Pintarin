import { useMemo, useState } from "react";

import { Building2, School, ShieldAlert } from "lucide-react";

import AppButton from "../../../components/ui/AppButton";

import {
  getRiskBgColor,
  getRiskLabel,
  getRiskTextColor,
} from "../../../utils/getRiskColor";

const schoolData = [
  {
    name: "SD Negeri Coblong 01",
    district: "Coblong",
    risk: 91,
    students: 412,
    assistance: "Renovasi Ruang Kelas",
  },

  {
    name: "SMP Negeri 05 Bandung",
    district: "Lengkong",
    risk: 76,
    students: 520,
    assistance: "Laptop & Komputer",
  },

  {
    name: "SD Negeri Sukajadi 03",
    district: "Sukajadi",
    risk: 52,
    students: 210,
    assistance: "Beasiswa Pendidikan",
  },

  {
    name: "SMA Negeri 08 Bandung",
    district: "Antapani",
    risk: 88,
    students: 730,
    assistance: "Laboratorium IPA",
  },

  {
    name: "SMK Negeri 03 Bandung",
    district: "Buah Batu",
    risk: 68,
    students: 602,
    assistance: "Perangkat Multimedia",
  },

  {
    name: "SD Negeri Antapani 02",
    district: "Antapani",
    risk: 45,
    students: 190,
    assistance: "Perpustakaan Digital",
  },
];

export default function SchoolsPage() {
  const [activeRisk, setActiveRisk] = useState("Semua");

  const filteredSchools = useMemo(() => {
    return schoolData.filter((school) => {
      if (activeRisk === "Semua") {
        return true;
      }

      if (activeRisk === "Tinggi") {
        return school.risk >= 80;
      }

      if (activeRisk === "Sedang") {
        return school.risk >= 60 && school.risk < 80;
      }

      return school.risk < 60;
    });
  }, [activeRisk]);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="rounded-[36px] bg-gradient-to-br from-orange-500 via-amber-500 to-orange-700 p-8 text-white shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <School size={16} />
              Priority Schools
            </div>

            <h1 className="mt-6 text-5xl font-black tracking-tight">
              Sekolah Prioritas CSR
            </h1>

            <p className="mt-4 max-w-2xl text-sm text-orange-100">
              Monitoring sekolah dengan prioritas bantuan tertinggi berdasarkan
              AI Risk Analysis.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap gap-3">
          {["Semua", "Tinggi", "Sedang", "Rendah"].map((item) => (
            <button
              key={item}
              onClick={() => setActiveRisk(item)}
              className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                activeRisk === item
                  ? "bg-orange-600 text-white"
                  : "border border-slate-200 bg-white text-slate-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* Table */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {[
                  "Sekolah",
                  "Kecamatan",
                  "Risk",
                  "Jumlah Siswa",
                  "Kebutuhan",
                  "Aksi",
                ].map((item) => (
                  <th
                    key={item}
                    className="px-6 py-4 text-left text-sm font-bold text-slate-700"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredSchools.map((school, index) => (
                <tr key={index} className="border-b border-slate-100">
                  <td className="px-6 py-5 font-semibold text-slate-800">
                    {school.name}
                  </td>

                  <td className="px-6 py-5 text-sm text-slate-600">
                    {school.district}
                  </td>

                  <td className="px-6 py-5">
                    <div
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${getRiskBgColor(
                        school.risk,
                      )} ${getRiskTextColor(school.risk)}`}
                    >
                      <div className="h-2 w-2 rounded-full bg-current"></div>
                      {school.risk} - {getRiskLabel(school.risk)}
                    </div>
                  </td>

                  <td className="px-6 py-5 text-sm text-slate-600">
                    {school.students}
                  </td>

                  <td className="px-6 py-5 text-sm text-slate-700">
                    {school.assistance}
                  </td>

                  <td className="px-6 py-5">
                    <AppButton icon={ShieldAlert} className="px-4 py-2">
                      Ajukan Bantuan
                    </AppButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
