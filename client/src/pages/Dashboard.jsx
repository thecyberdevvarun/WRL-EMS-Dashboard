import {
  Card,
  CardContent,
} from "@/components/ui/card";

const stats = [
  {
    title: "Total Employees",
    value: "248",
  },
  {
    title: "Present Today",
    value: "220",
  },
  {
    title: "On Leave",
    value: "18",
  },
  {
    title: "Payroll Processed",
    value: "$120K",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-muted-foreground">
          Welcome to WRL EMS Dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                {stat.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {stat.value}
              </h2>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6 h-75">
            Attendance Analytics
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 h-75">
            Department Statistics
          </CardContent>
        </Card>
      </div>
    </div>
  );
}