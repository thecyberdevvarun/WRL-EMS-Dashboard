import { useState, useMemo } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ---------------- STATUS CONFIG ----------------
const STATUS = {
  P: { label: "P", color: "bg-green-500" },
  HD: { label: "HD", color: "bg-yellow-400" },
  PM: { label: "PM", color: "bg-orange-400" },
  WO: { label: "WO", color: "bg-blue-400" },
  A: { label: "A", color: "bg-red-500" },
};

// ---------------- DUMMY DATA ----------------
const dummyRecords = [
  {
    EmpCode: "EMP001",
    EmployeeName: "John Doe",
    Department: "HR",
    Contractor: "A-Group",
    AttendanceDate: "2026-05-20",
    AttendanceStatus: "Present",
  },
  {
    EmpCode: "EMP001",
    EmployeeName: "John Doe",
    Department: "HR",
    Contractor: "A-Group",
    AttendanceDate: "2026-05-21",
    AttendanceStatus: "Half Day",
  },
  {
    EmpCode: "EMP002",
    EmployeeName: "Sarah Smith",
    Department: "IT",
    Contractor: "B-Group",
    AttendanceDate: "2026-05-20",
    AttendanceStatus: "Absent",
  },
  {
    EmpCode: "EMP002",
    EmployeeName: "Sarah Smith",
    Department: "IT",
    Contractor: "B-Group",
    AttendanceDate: "2026-05-21",
    AttendanceStatus: "Present",
  },
  {
    EmpCode: "EMP003",
    EmployeeName: "Michael Brown",
    Department: "Admin",
    Contractor: "A-Group",
    AttendanceDate: "2026-05-21",
    AttendanceStatus: "Present",
  },
];

// ---------------- HELPERS ----------------
const formatDate = (d) => d.toISOString().slice(0, 10);

const buildRange = (from, to) => {
  const arr = [];
  const cur = new Date(from);
  const end = new Date(to);

  while (cur <= end) {
    arr.push(formatDate(new Date(cur)));
    cur.setDate(cur.getDate() + 1);
  }
  return arr;
};

const deriveStatus = (records = []) => {
  if (!records.length) return "A";

  const priority = {
    Present: 3,
    "Half Day": 2,
    "Punch Missing": 1,
  };

  const best = records.reduce((a, b) =>
    (priority[b.AttendanceStatus] || 0) > (priority[a.AttendanceStatus] || 0)
      ? b
      : a,
  );

  switch (best.AttendanceStatus) {
    case "Present":
      return "P";
    case "Half Day":
      return "HD";
    case "Punch Missing":
      return "PM";
    default:
      return "A";
  }
};

// ---------------- PIVOT ----------------
const buildPivot = (records, dates) => {
  const map = {};

  records.forEach((r) => {
    const key = `${r.EmpCode}`;

    if (!map[key]) {
      map[key] = {
        empCode: r.EmpCode,
        name: r.EmployeeName,
        department: r.Department,
        contractor: r.Contractor,
        byDate: {},
      };
    }

    const d = String(r.AttendanceDate).slice(0, 10);

    if (!map[key].byDate[d]) map[key].byDate[d] = [];
    map[key].byDate[d].push(r);
  });

  return Object.values(map).map((emp) => {
    const statusByDate = {};

    let P = 0,
      HD = 0,
      PM = 0,
      WO = 0,
      A = 0;

    dates.forEach((d) => {
      const day = new Date(d).getDay();
      const recs = emp.byDate[d];

      let st;
      if (!recs) st = day === 0 ? "WO" : "A";
      else st = deriveStatus(recs);

      statusByDate[d] = st;

      if (st === "P") P++;
      if (st === "HD") HD++;
      if (st === "PM") PM++;
      if (st === "WO") WO++;
      if (st === "A") A++;
    });

    return {
      ...emp,
      statusByDate,
      summary: { P, HD, PM, WO, A },
    };
  });
};

// ---------------- COMPONENT ----------------
export default function Attendance() {
  const [from, setFrom] = useState("2026-05-20");
  const [to, setTo] = useState("2026-05-25");
  const [search, setSearch] = useState("");

  const dates = useMemo(() => {
    return buildRange(from, to);
  }, [from, to]);

  const rows = useMemo(() => {
    const pivot = buildPivot(dummyRecords, dates);

    if (!search) return pivot;

    return pivot.filter((r) =>
      r.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [dates, search]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Attendance Register</h1>
        <p className="text-muted-foreground">
          Dummy data pivot attendance system
        </p>
      </div>

      {/* FILTERS */}
      <Card>
        <CardContent className="p-4 flex flex-wrap gap-3 items-end">
          <div>
            <p className="text-xs">From</p>
            <Input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>

          <div>
            <p className="text-xs">To</p>
            <Input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          <Input
            placeholder="Search employee"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />

          <Button onClick={() => setSearch("")}>Clear</Button>
        </CardContent>
      </Card>

      {/* TABLE */}
      <Card>
        <CardContent className="p-0 overflow-auto">
          <table className="w-full text-sm border">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-2">Code</th>
                <th className="p-2">Name</th>
                <th className="p-2">Dept</th>

                {dates.map((d) => (
                  <th key={d} className="p-2">
                    {new Date(d).getDate()}
                  </th>
                ))}

                <th className="p-2">P</th>
                <th className="p-2">HD</th>
                <th className="p-2">PM</th>
                <th className="p-2">WO</th>
                <th className="p-2">A</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r) => (
                <tr key={r.empCode} className="border-b">
                  <td className="p-2 font-mono">{r.empCode}</td>
                  <td className="p-2">{r.name}</td>
                  <td className="p-2">{r.department}</td>

                  {dates.map((d) => (
                    <td key={d} className="text-center">
                      <span
                        className={`px-1 rounded text-white text-xs ${
                          STATUS[r.statusByDate[d]]?.color || "bg-gray-300"
                        }`}
                      >
                        {STATUS[r.statusByDate[d]]?.label || "-"}
                      </span>
                    </td>
                  ))}

                  <td className="text-center">{r.summary.P}</td>
                  <td className="text-center">{r.summary.HD}</td>
                  <td className="text-center">{r.summary.PM}</td>
                  <td className="text-center">{r.summary.WO}</td>
                  <td className="text-center">{r.summary.A}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
