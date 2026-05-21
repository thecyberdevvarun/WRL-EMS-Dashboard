import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Wallet,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Employees",
    icon: Users,
    path: "/employees",
  },
  {
    title: "Attendance",
    icon: CalendarCheck,
    path: "/attendance",
  },
  {
    title: "Payroll",
    icon: Wallet,
    path: "/payroll",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function AppSidebar() {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-background">
<div className="h-16 border-b flex items-center px-6">
  <Logo />
</div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`
            }
          >
            <item.icon size={18} />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}