import {
  ArrowRight,
  Brain,
  Building2,
  ChartColumn,
  ShieldAlert,
  Sparkles,
  MapPinned,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#F4F7FB]">
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-200/30 blur-3xl"></div>

      <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-indigo-200/30 blur-3xl"></div>

      {/* Navbar */}
      <header className="relative z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          {/* Logo */}
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-800">
              PINTARIN
            </h1>

            <p className="mt-1 text-xs font-medium tracking-wider text-slate-500">
              EDUCATION INTELLIGENCE SYSTEM
            </p>
          </div>

          {/* Menu */}
          <div className="hidden items-center gap-8 lg:flex">
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Fitur
            </a>

            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Cara Kerja
            </a>

            <a
              href="#about"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Tentang
            </a>
          </div>

          {/* Action */}
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Masuk Dashboard
            <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-10 lg:grid-cols-2 lg:items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              <Sparkles size={16} />
              AI Powered Education Monitoring
            </div>

            <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-slate-900 xl:text-6xl">
              Platform Intelligence untuk Monitoring Risiko Pendidikan
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-600">
              PINTARIN membantu Dinas Pendidikan dan CSR memonitor risiko
              pendidikan, memprioritaskan bantuan, dan mengambil keputusan
              berbasis data menggunakan teknologi AI.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-2xl bg-blue-700 px-7 py-4 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                Mulai Monitoring
                <ArrowRight size={18} />
              </Link>

              <button className="rounded-2xl border border-slate-200 bg-white px-7 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                Pelajari Sistem
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap gap-10">
              <div>
                <h3 className="text-3xl font-black tracking-tight text-slate-900">
                  2.3K+
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Sekolah Termonitor
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-black tracking-tight text-slate-900">
                  96%
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Akurasi Prediksi AI
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-black tracking-tight text-slate-900">
                  120+
                </h3>

                <p className="mt-2 text-sm text-slate-500">Bantuan Tersalur</p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            {/* Dashboard Card */}
            <div className="relative overflow-hidden rounded-[36px] border border-white/50 bg-white/80 p-6 shadow-2xl backdrop-blur">
              {/* Top */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Education Analytics
                  </p>

                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-800">
                    Dashboard Overview
                  </h3>
                </div>

                <div className="rounded-2xl bg-red-100 px-4 py-3 text-right">
                  <p className="text-xs font-semibold uppercase tracking-wider text-red-500">
                    High Risk
                  </p>

                  <h2 className="mt-1 text-3xl font-black text-red-600">328</h2>
                </div>
              </div>

              {/* Grid */}
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {/* Card */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                    <Brain size={24} />
                  </div>

                  <h4 className="mt-5 text-lg font-bold tracking-tight text-slate-800">
                    AI Prediction
                  </h4>

                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    Analisis sekolah prioritas berbasis AI.
                  </p>
                </div>

                {/* Card */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                    <ShieldAlert size={24} />
                  </div>

                  <h4 className="mt-5 text-lg font-bold tracking-tight text-slate-800">
                    Risk Monitoring
                  </h4>

                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    Monitoring wilayah risiko pendidikan.
                  </p>
                </div>

                {/* Card */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <Building2 size={24} />
                  </div>

                  <h4 className="mt-5 text-lg font-bold tracking-tight text-slate-800">
                    CSR Integration
                  </h4>

                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    Distribusi bantuan lebih tepat sasaran.
                  </p>
                </div>

                {/* Card */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                    <ChartColumn size={24} />
                  </div>

                  <h4 className="mt-5 text-lg font-bold tracking-tight text-slate-800">
                    Smart Analytics
                  </h4>

                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    Statistik pendidikan berbasis data realtime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              <Sparkles size={16} />
              Platform Features
            </div>

            <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight text-slate-900">
              Sistem Monitoring Pendidikan Modern Berbasis AI
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Platform dirancang untuk membantu Dinas Pendidikan, sekolah, dan
              CSR melakukan monitoring serta distribusi bantuan secara lebih
              efektif.
            </p>
          </div>

          {/* Grid */}
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {/* Feature */}
            <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-100 text-blue-700">
                <Brain size={28} />
              </div>

              <h3 className="mt-7 text-2xl font-bold tracking-tight text-slate-800">
                AI Prediction
              </h3>

              <p className="mt-4 leading-relaxed text-slate-600">
                Sistem AI menganalisis sekolah berisiko tinggi dan memberikan
                rekomendasi prioritas bantuan.
              </p>
            </div>

            {/* Feature */}
            <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-red-100 text-red-700">
                <MapPinned size={28} />
              </div>

              <h3 className="mt-7 text-2xl font-bold tracking-tight text-slate-800">
                Geographic Intelligence
              </h3>

              <p className="mt-4 leading-relaxed text-slate-600">
                Visualisasi peta risiko pendidikan berbasis wilayah untuk
                monitoring yang lebih akurat.
              </p>
            </div>

            {/* Feature */}
            <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                <Building2 size={28} />
              </div>

              <h3 className="mt-7 text-2xl font-bold tracking-tight text-slate-800">
                CSR Collaboration
              </h3>

              <p className="mt-4 leading-relaxed text-slate-600">
                Menghubungkan Dinas Pendidikan dan perusahaan CSR dalam
                distribusi bantuan pendidikan.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
