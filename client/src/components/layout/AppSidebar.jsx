import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Wallet,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

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
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-background">
      {/* LOGO */}
      <div className="h-16 border-b flex items-center px-6 gap-3">
        <img src={logo} alt="WRL EMS" className="h-10 w-auto object-contain" />

        <span className="text-lg font-bold tracking-tight">WRL EMS</span>
      </div>

      {/* NAV */}
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

      {/* LOGOUT */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition cursor-pointer"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
