import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import {
  CalendarCheck,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

const initialData = [
  {
    id: 1,
    name: "John Doe",
    date: "2026-05-21",
    status: "Present",
  },
  {
    id: 2,
    name: "Sarah Smith",
    date: "2026-05-21",
    status: "Absent",
  },
  {
    id: 3,
    name: "Michael Brown",
    date: "2026-05-21",
    status: "Leave",
  },
];

export default function Attendance() {
  const [records, setRecords] = useState(initialData);
  const [date, setDate] = useState("2026-05-21");

  // MARK ATTENDANCE
  const markAttendance = (id, status) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status } : r
      )
    );
  };

  // FILTER BY DATE (future-ready)
  const filtered = records.filter(
    (r) => r.date === date
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <CalendarCheck className="text-primary" />
            Attendance
          </h1>

          <p className="text-muted-foreground">
            Mark and track employee attendance
          </p>
        </div>

        <Input
          type="date"
          className="w-full md:w-52"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

      </div>

      {/* TABLE */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-muted/40 border-b">
              <tr>
                <th className="p-4 text-left">Employee</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-b hover:bg-muted/30"
                >

                  <td className="p-4 font-medium">
                    {emp.name}
                  </td>

                  <td className="p-4 text-muted-foreground">
                    {emp.date}
                  </td>

                  <td className="p-4">
                    <Badge
                      className={
                        emp.status === "Present"
                          ? "bg-green-500"
                          : emp.status === "Absent"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }
                    >
                      {emp.status}
                    </Badge>
                  </td>

                  <td className="p-4 flex justify-end gap-2">

                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        markAttendance(emp.id, "Present")
                      }
                    >
                      <CheckCircle size={16} />
                    </Button>

                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        markAttendance(emp.id, "Absent")
                      }
                    >
                      <XCircle size={16} />
                    </Button>

                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        markAttendance(emp.id, "Leave")
                      }
                    >
                      <Clock size={16} />
                    </Button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>

          {filtered.length === 0 && (
            <div className="p-6 text-center text-muted-foreground">
              No attendance records found
            </div>
          )}

        </CardContent>
      </Card>

    </div>
  );
}