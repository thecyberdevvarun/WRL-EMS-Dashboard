import Logo from "@/components/layout/Logo";

export default function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Section */}
      <div className="hidden lg:flex flex-col justify-between bg-primary p-10 text-white">
        <Logo />

        <div className="space-y-6 max-w-md">
          <h2 className="text-5xl font-bold leading-tight">
            Manage Your Workforce Smarter
          </h2>

          <p className="text-lg text-white/80">
            Modern employee management dashboard for HR,
            payroll, attendance, analytics and more.
          </p>
        </div>

        <div className="text-sm text-white/70">
          © 2026 WRL EMS. All rights reserved.
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>

          <div className="space-y-2 mb-8">
            <h1 className="text-4xl font-bold">
              {title}
            </h1>

            <p className="text-muted-foreground">
              {subtitle}
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}