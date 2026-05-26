import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  BadgeCheck,
  Lock,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

function FieldWrapper({ label, icon: Icon, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-semibold uppercase tracking-widest text-[#6B7280]">
        {label}
      </label>
      <div className="relative">
        <Icon
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]"
          strokeWidth={1.8}
        />
        {children}
      </div>
    </div>
  );
}

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [empcod, setEmpcod] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!empcod || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const result = await login(empcod, password);
      if (result.success) {
        toast.success(result.message);
        navigate("/dashboard");
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FieldWrapper label="Employee Code" icon={BadgeCheck}>
        <Input
          type="text"
          placeholder="e.g. EMP-00123"
          value={empcod}
          onChange={(e) => setEmpcod(e.target.value)}
          disabled={loading}
          className="pl-10 h-11 bg-[#F9F8F6] border-[#E5E3DE] rounded-xl text-sm text-[#111827] placeholder:text-[#C4C2BC] focus:border-[#4F7EF8] focus:ring-[#4F7EF8]/15 focus:ring-4 transition-all duration-200"
        />
      </FieldWrapper>

      <FieldWrapper label="Password" icon={Lock}>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          className="pl-10 pr-10 h-11 bg-[#F9F8F6] border-[#E5E3DE] rounded-xl text-sm text-[#111827] placeholder:text-[#C4C2BC] focus:border-[#4F7EF8] focus:ring-[#4F7EF8]/15 focus:ring-4 transition-all duration-200"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" strokeWidth={1.8} />
          ) : (
            <Eye className="w-4 h-4" strokeWidth={1.8} />
          )}
        </button>
      </FieldWrapper>

      <div className="flex justify-end">
        <Link
          to="/forgot-password"
          className="text-xs text-[#4F7EF8] font-medium hover:underline underline-offset-2"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-11 bg-[#111827] hover:bg-[#1f2937] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-[0.98]"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Signing in…
          </>
        ) : (
          <>
            Sign in
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </>
        )}
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-3 py-1">
        <div className="flex-1 h-px bg-[#F0EDEA]" />
        <span className="text-[11px] text-[#C4C2BC] font-medium">
          NEW TO WRL EMS?
        </span>
        <div className="flex-1 h-px bg-[#F0EDEA]" />
      </div>

      <Link
        to="/signup"
        className="flex items-center justify-center w-full h-11 rounded-xl border border-[#E5E3DE] bg-white text-[#111827] text-sm font-semibold hover:bg-[#F9F8F6] transition-all duration-200 gap-2 active:scale-[0.98]"
      >
        Create an account
      </Link>
    </form>
  );
}
