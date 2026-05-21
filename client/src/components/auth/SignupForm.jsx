import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignupForm() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            First Name
          </label>

          <Input
            placeholder="John"
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Last Name
          </label>

          <Input
            placeholder="Doe"
            className="h-12"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Email
        </label>

        <Input
          type="email"
          placeholder="john@example.com"
          className="h-12"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Password
        </label>

        <Input
          type="password"
          placeholder="Create password"
          className="h-12"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Confirm Password
        </label>

        <Input
          type="password"
          placeholder="Confirm password"
          className="h-12"
        />
      </div>

      <Button className="w-full h-12 text-base">
        Create Account
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/"
          className="text-primary font-medium hover:underline"
        >
          Login
        </Link>
      </div>
    </form>
  );
}