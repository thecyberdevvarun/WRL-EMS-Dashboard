import { Building2 } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-primary text-primary-foreground p-2 rounded-xl shadow-lg">
        <Building2 className="w-6 h-6" />
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          WRL EMS
        </h1>

        <p className="text-xs text-muted-foreground">
          Employee Management System
        </p>
      </div>
    </div>
  );
}