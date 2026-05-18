import { useState } from "react";

import {
  ArrowRight,
  Brain,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let role = "dinas";

    if (form.email.includes("school")) {
      role = "school";
    }

    login({
      name: "Aqmal Madani",
      role,
      email: form.email,
    });

    if (role === "school") {
      navigate("/school");
    } else {
      navigate("/dinas");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F4F7FB]">
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-200/30 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-indigo-200/30 blur-3xl"></div>

      {/* Main */}
      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
        {/* LEFT */}
        <div className="hidden flex-col justify-between border-r border-white/30 bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 p-10 text-white lg:flex">
          {/* Top */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <Brain size={16} />
              Education Intelligence System
            </div>

            <h1 className="mt-10 max-w-xl text-6xl font-black leading-tight tracking-tight">
              PINTARIN
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-blue-100">
              Platform intelligence untuk monitoring risiko pendidikan dan
              distribusi bantuan CSR berbasis AI.
            </p>
          </div>

          {/* Bottom */}
          <div className="space-y-6">
            {/* Card */}
            <div className="rounded-[32px] border border-white/10 bg-white/10 p-6 backdrop-blur">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10">
                  <ShieldCheck size={28} />
                </div>

                <div>
                  <h3 className="text-xl font-bold">
                    Secure Government Access
                  </h3>

                  <p className="mt-1 text-sm text-blue-100">
                    Sistem aman untuk Dinas Pendidikan, sekolah, dan CSR.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <h2 className="text-3xl font-black">2.3K+</h2>

                <p className="mt-2 text-sm text-blue-100">Sekolah</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <h2 className="text-3xl font-black">96%</h2>

                <p className="mt-2 text-sm text-blue-100">AI Accuracy</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <h2 className="text-3xl font-black">120+</h2>

                <p className="mt-2 text-sm text-blue-100">Bantuan</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            {/* Logo Mobile */}
            <div className="mb-8 lg:hidden">
              <h1 className="text-4xl font-black tracking-tight text-slate-800">
                PINTARIN
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Education Intelligence System
              </p>
            </div>

            {/* Card */}
            <div className="rounded-[36px] border border-white/50 bg-white/80 p-8 shadow-2xl backdrop-blur">
              {/* Header */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                  <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  Secure Login
                </div>

                <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900">
                  Masuk Dashboard
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-slate-500">
                  Login untuk mengakses sistem monitoring pendidikan dan
                  distribusi bantuan berbasis AI.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                {/* Email */}
                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Email
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 transition focus-within:border-blue-500 focus-within:bg-white">
                    <Mail size={18} className="text-slate-400" />

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Masukkan email"
                      className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700">
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-sm font-medium text-blue-700 hover:text-blue-800"
                    >
                      Lupa Password?
                    </button>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 transition focus-within:border-blue-500 focus-within:bg-white">
                    <Lock size={18} className="text-slate-400" />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Masukkan password"
                      className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 transition hover:text-slate-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Remember */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-3 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300"
                    />
                    Ingat saya
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 px-5 py-4 text-sm font-semibold text-white transition hover:bg-blue-800"
                >
                  Masuk Dashboard
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
