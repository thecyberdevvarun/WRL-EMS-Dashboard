import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import {
  Wallet,
  CheckCircle,
  Clock,
} from "lucide-react";

const initialPayroll = [
  {
    id: 1,
    name: "John Doe",
    basic: 50000,
    bonus: 5000,
    deduction: 2000,
    status: "Pending",
  },
  {
    id: 2,
    name: "Sarah Smith",
    basic: 60000,
    bonus: 8000,
    deduction: 3000,
    status: "Paid",
  },
  {
    id: 3,
    name: "Michael Brown",
    basic: 45000,
    bonus: 3000,
    deduction: 1000,
    status: "Pending",
  },
];

export default function Payroll() {
  const [payroll, setPayroll] = useState(initialPayroll);
  const [search, setSearch] = useState("");

  // CALCULATE NET SALARY
  const calculateNet = (p) => {
    return p.basic + p.bonus - p.deduction;
  };

  // MARK AS PAID
  const markPaid = (id) => {
    setPayroll((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "Paid" } : p
      )
    );
  };

  // FILTER
  const filtered = payroll.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Wallet className="text-primary" />
            Payroll
          </h1>

          <p className="text-muted-foreground">
            Manage employee salaries and payments
          </p>
        </div>

      </div>

      {/* SEARCH */}
      <div className="w-full md:w-80">
        <Input
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-muted/40 border-b">
              <tr>
                <th className="p-4 text-left">Employee</th>
                <th className="p-4 text-left">Basic</th>
                <th className="p-4 text-left">Bonus</th>
                <th className="p-4 text-left">Deduction</th>
                <th className="p-4 text-left">Net Salary</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-b hover:bg-muted/30"
                >

                  <td className="p-4 font-medium">
                    {p.name}
                  </td>

                  <td className="p-4">
                    ₹{p.basic}
                  </td>

                  <td className="p-4">
                    ₹{p.bonus}
                  </td>

                  <td className="p-4">
                    ₹{p.deduction}
                  </td>

                  <td className="p-4 font-semibold">
                    ₹{calculateNet(p)}
                  </td>

                  <td className="p-4">
                    <Badge
                      className={
                        p.status === "Paid"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }
                    >
                      {p.status}
                    </Badge>
                  </td>

                  <td className="p-4 text-right">

                    {p.status === "Pending" ? (
                      <Button
                        size="sm"
                        onClick={() => markPaid(p.id)}
                        className="gap-2"
                      >
                        <CheckCircle size={16} />
                        Pay
                      </Button>
                    ) : (
                      <span className="text-green-600 text-sm font-medium">
                        Paid
                      </span>
                    )}

                  </td>

                </tr>
              ))}
            </tbody>

          </table>

          {filtered.length === 0 && (
            <div className="p-6 text-center text-muted-foreground">
              No payroll records found
            </div>
          )}

        </CardContent>
      </Card>

    </div>
  );
}