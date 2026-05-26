import { TrendingUp, Clock, Shield, Users } from "lucide-react";
import Logo from "../layout/Logo";

const features = [
  {
    icon: Users,
    label: "People Management",
    desc: "Manage employees, onboarding and records centrally.",
  },
  {
    icon: TrendingUp,
    label: "Payroll & Analytics",
    desc: "Track salaries, expenses and HR insights in real time.",
  },
  {
    icon: Clock,
    label: "Attendance Tracking",
    desc: "Monitor shifts, leaves and working hours effortlessly.",
  },
  {
    icon: Shield,
    label: "Compliance & Security",
    desc: "Secure HR operations with policy and leave controls.",
  },
];

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen flex bg-[#F8F9FC]">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#0F172A]">
        {/* Background gradients */}
        <div className="absolute top-[-120px] left-[-120px] w-[380px] h-[380px] rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] rounded-full bg-emerald-400/10 blur-3xl" />

        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        <div className="relative z-10 flex flex-col justify-between w-full px-14 py-12">
          {/* Logo */}
          <div>
            <Logo />
          </div>

          {/* Hero */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-7">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-white/70 font-medium tracking-wide">
                Smart HR Management Platform
              </span>
            </div>

            <h1 className="text-5xl font-bold leading-tight text-white tracking-tight">
              Manage your
              <span className="block text-[#60A5FA]">workforce smarter.</span>
            </h1>

            <p className="mt-6 text-base leading-relaxed text-slate-400 max-w-lg">
              Simplify HR operations with payroll automation, attendance
              tracking, employee management and performance insights — all in
              one unified platform.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mt-14">
            {features.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 hover:bg-white/[0.07] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#60A5FA]" />
                </div>

                <h3 className="text-sm font-semibold text-white mb-1">
                  {label}
                </h3>

                <p className="text-xs leading-relaxed text-slate-400">{desc}</p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-8">
            <p className="text-xs text-slate-500">
              © 2026 WRL HRMS. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex justify-center mb-10 lg:hidden">
            <Logo />
          </div>

          {/* Auth Card */}
          <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
            {/* Top Accent */}
            <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-400 to-emerald-400" />

            <div className="px-8 py-10">
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                  {title}
                </h2>

                <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
              </div>

              {children}
            </div>
          </div>

          {/* Trust Note */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
            <Shield className="w-4 h-4" />
            <span>Protected with enterprise-grade security</span>
          </div>
        </div>
      </div>
    </div>
  );
}
