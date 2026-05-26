import logo from "@/assets/logo.png";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-30 h-30 rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
        <img
          src={logo}
          alt="WRL EMS Logo"
          className="w-full h-full object-contain"
        />
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          WRL HRMS
        </h1>

        <p className="text-xs text-muted-foreground">
          HR Management System
        </p>
      </div>
    </div>
  );
}