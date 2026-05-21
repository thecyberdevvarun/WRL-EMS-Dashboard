import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";

import { Users, Search, Plus, Trash2, Edit } from "lucide-react";

const initialEmployees = [
  {
    id: 1,
    name: "John Doe",
    email: "john@company.com",
    role: "Developer",
    department: "IT",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@company.com",
    role: "HR Manager",
    department: "HR",
    status: "On Leave",
  },
];

export default function Employees() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    status: "Active",
  });

  // FILTER
  const filtered = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()),
  );

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // RESET
  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      role: "",
      department: "",
      status: "Active",
    });
    setEditId(null);
  };

  // OPEN ADD
  const openAdd = () => {
    resetForm();
    setOpen(true);
  };

  // SUBMIT (ADD / EDIT)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === editId ? { ...emp, ...form } : emp)),
      );
    } else {
      setEmployees([...employees, { id: Date.now(), ...form }]);
    }

    setOpen(false);
    resetForm();
  };

  // DELETE
  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  // EDIT
  const handleEdit = (emp) => {
    setForm(emp);
    setEditId(emp.id);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Users className="text-primary" />
            Employees
          </h1>

          <p className="text-muted-foreground">
            Manage your workforce efficiently
          </p>
        </div>

        {/* ADD BUTTON */}
        <Button onClick={openAdd} className="gap-2">
          <Plus size={16} />
          Add Employee
        </Button>
      </div>

      {/* SEARCH */}
      <div className="relative w-full md:w-80">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

        <Input
          placeholder="Search employees..."
          className="pl-10"
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
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Department</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((emp) => (
                <tr key={emp.id} className="border-b hover:bg-muted/30">
                  <td className="p-4 font-medium">{emp.name}</td>

                  <td className="p-4 text-muted-foreground">{emp.email}</td>

                  <td className="p-4">{emp.role}</td>

                  <td className="p-4">{emp.department}</td>

                  <td className="p-4">
                    <Badge
                      className={
                        emp.status === "Active"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }
                    >
                      {emp.status}
                    </Badge>
                  </td>

                  <td className="p-4 text-right flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleEdit(emp)}
                    >
                      <Edit size={16} />
                    </Button>

                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDelete(emp.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="p-6 text-center text-muted-foreground">
              No employees found
            </div>
          )}
        </CardContent>
      </Card>

      {/* MODAL (CONTROLLED) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editId ? "Edit Employee" : "Add Employee"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input name="name" value={form.name} onChange={handleChange} />
            </div>

            <div>
              <Label>Email</Label>
              <Input name="email" value={form.email} onChange={handleChange} />
            </div>

            <div>
              <Label>Role</Label>
              <Input name="role" value={form.role} onChange={handleChange} />
            </div>

            <div>
              <Label>Department</Label>
              <Input
                name="department"
                value={form.department}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>

              <Button type="submit">{editId ? "Update" : "Save"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
