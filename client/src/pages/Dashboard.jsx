import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Users,
  UserCheck,
  UserX,
  Wallet,
  CalendarCheck,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Total Employees",
    value: "248",
    icon: Users,
    color: "text-blue-500",
  },
  {
    title: "Present Today",
    value: "220",
    icon: UserCheck,
    color: "text-green-500",
  },
  {
    title: "On Leave",
    value: "18",
    icon: UserX,
    color: "text-yellow-500",
  },
  {
    title: "Payroll Processed",
    value: "$120K",
    icon: Wallet,
    color: "text-purple-500",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <p className="text-muted-foreground">
            Welcome back to WRL EMS — here’s what’s happening today.
          </p>
        </div>

        <Button>+ Add Employee</Button>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>

                <h2 className="text-2xl font-bold mt-1">{stat.value}</h2>
              </div>

              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ANALYTICS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance */}
        <Card className="shadow-sm">
          <CardContent className="p-6 h-80">
            <div className="flex items-center gap-2 mb-4">
              <CalendarCheck className="text-primary" />
              <h3 className="font-semibold">Attendance Overview</h3>
            </div>

            <div className="flex items-center justify-center h-full text-muted-foreground">
              {/* Replace later with charts */}
              Attendance chart will appear here
            </div>
          </CardContent>
        </Card>

        {/* Department Stats */}
        <Card className="shadow-sm">
          <CardContent className="p-6 h-80">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="text-primary" />
              <h3 className="font-semibold">Department Analytics</h3>
            </div>

            <div className="flex items-center justify-center h-full text-muted-foreground">
              Department chart will appear here
            </div>
          </CardContent>
        </Card>
      </div>

      {/* QUICK INSIGHTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <h4 className="font-semibold mb-2">Pending Approvals</h4>
            <p className="text-2xl font-bold">12</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h4 className="font-semibold mb-2">New Hires This Month</h4>
            <p className="text-2xl font-bold">7</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h4 className="font-semibold mb-2">Salary Pending</h4>
            <p className="text-2xl font-bold">$32K</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
