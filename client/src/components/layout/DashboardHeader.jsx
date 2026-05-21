import ThemeToggle from "./ThemeToggle";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

export default function DashboardHeader() {
  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-6">
      <div>
        <h2 className="text-xl font-semibold">
          Employee Management System
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <Avatar>
          <AvatarFallback>VP</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}