import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Settings as SettingsIcon,
  User,
  Building,
  Lock,
} from "lucide-react";

export default function Settings() {
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@wrl.com",
  });

  const [company, setCompany] = useState({
    companyName: "WRL EMS",
    website: "https://wrl-ems.com",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // HANDLE PROFILE CHANGE
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // HANDLE COMPANY CHANGE
  const handleCompanyChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  // HANDLE PASSWORD CHANGE
  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  // SAVE (UI ONLY)
  const handleSave = () => {
    console.log("Saved Settings:", {
      profile,
      company,
      password,
    });
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <SettingsIcon className="text-primary" />
          Settings
        </h1>

        <p className="text-muted-foreground">
          Manage your account and system settings
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* PROFILE */}
        <Card>
          <CardContent className="p-6 space-y-4">

            <div className="flex items-center gap-2 mb-2">
              <User className="text-primary" />
              <h2 className="font-semibold">
                Profile Settings
              </h2>
            </div>

            <div>
              <Label>Name</Label>
              <Input
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
              />
            </div>

          </CardContent>
        </Card>

        {/* COMPANY */}
        <Card>
          <CardContent className="p-6 space-y-4">

            <div className="flex items-center gap-2 mb-2">
              <Building className="text-primary" />
              <h2 className="font-semibold">
                Company Settings
              </h2>
            </div>

            <div>
              <Label>Company Name</Label>
              <Input
                name="companyName"
                value={company.companyName}
                onChange={handleCompanyChange}
              />
            </div>

            <div>
              <Label>Website</Label>
              <Input
                name="website"
                value={company.website}
                onChange={handleCompanyChange}
              />
            </div>

          </CardContent>
        </Card>

        {/* PASSWORD */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6 space-y-4">

            <div className="flex items-center gap-2 mb-2">
              <Lock className="text-primary" />
              <h2 className="font-semibold">
                Change Password
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">

              <div>
                <Label>Current Password</Label>
                <Input
                  type="password"
                  name="current"
                  value={password.current}
                  onChange={handlePasswordChange}
                />
              </div>

              <div>
                <Label>New Password</Label>
                <Input
                  type="password"
                  name="new"
                  value={password.new}
                  onChange={handlePasswordChange}
                />
              </div>

              <div>
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  name="confirm"
                  value={password.confirm}
                  onChange={handlePasswordChange}
                />
              </div>

            </div>

          </CardContent>
        </Card>

      </div>

      {/* SAVE BUTTON */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="px-6">
          Save Changes
        </Button>
      </div>

    </div>
  );
}