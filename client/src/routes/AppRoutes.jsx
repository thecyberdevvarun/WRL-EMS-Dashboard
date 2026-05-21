import { Routes, Route } from "react-router-dom";

import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

import Dashboard from "@/pages/Dashboard";
import Employees from "@/pages/Employees";
import Attendance from "@/pages/Attendance";
import Payroll from "@/pages/Payroll";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/employees" element={<Employees />} />

        <Route path="/attendance" element={<Attendance />} />

        <Route path="/payroll" element={<Payroll />} />

        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
