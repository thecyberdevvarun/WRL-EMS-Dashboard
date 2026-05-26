import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  BadgeCheck,
  User,
  Lock,
  ShieldCheck,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
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

function PasswordStrength({ password }) {
  if (!password) return null;

  const rules = [
    { label: "At least 6 characters", ok: password.length >= 6 },
    { label: "Contains a number", ok: /\d/.test(password) },
    { label: "Contains a letter", ok: /[a-zA-Z]/.test(password) },
  ];

  return (
    <div className="pt-1 space-y-1.5">
      {rules.map(({ label, ok }) => (
        <div key={label} className="flex items-center gap-2">
          {ok ? (
            <CheckCircle2
              className="w-3.5 h-3.5 text-[#34D399] shrink-0"
              strokeWidth={2}
            />
          ) : (
            <XCircle
              className="w-3.5 h-3.5 text-[#E5E7EB] shrink-0"
              strokeWidth={2}
            />
          )}
          <span
            className={`text-[11px] ${ok ? "text-[#34D399]" : "text-[#9CA3AF]"}`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function SignupForm() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [empcod, setEmpcod] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;
  const passwordsMismatch = confirmPassword && password !== confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!empcod || !username || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const result = await signup(empcod, username, password);
      if (result.success) {
        toast.success(result.message);
        navigate("/");
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "pl-10 h-11 bg-[#F9F8F6] border-[#E5E3DE] rounded-xl text-sm text-[#111827] placeholder:text-[#C4C2BC] focus:border-[#4F7EF8] focus:ring-[#4F7EF8]/15 focus:ring-4 transition-all duration-200";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Employee Code + Username side-by-side */}
      <div className="grid grid-cols-2 gap-3">
        <FieldWrapper label="Employee Code" icon={BadgeCheck}>
          <Input
            type="text"
            placeholder="EMP-00123"
            value={empcod}
            onChange={(e) => setEmpcod(e.target.value)}
            disabled={loading}
            className={inputClass}
          />
        </FieldWrapper>

        <FieldWrapper label="Username" icon={User}>
          <Input
            type="text"
            placeholder="john.doe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            className={inputClass}
          />
        </FieldWrapper>
      </div>

      <FieldWrapper label="Password" icon={Lock}>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Create a strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          className={`${inputClass} pr-10`}
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

      <PasswordStrength password={password} />

      <FieldWrapper label="Confirm Password" icon={ShieldCheck}>
        <Input
          type={showConfirm ? "text" : "password"}
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
          className={`${inputClass} pr-10 ${passwordsMismatch ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""} ${passwordsMatch ? "border-[#34D399] focus:border-[#34D399] focus:ring-green-100" : ""}`}
        />
        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
          tabIndex={-1}
        >
          {showConfirm ? (
            <EyeOff className="w-4 h-4" strokeWidth={1.8} />
          ) : (
            <Eye className="w-4 h-4" strokeWidth={1.8} />
          )}
        </button>
      </FieldWrapper>

      {passwordsMismatch && (
        <p className="text-[11px] text-red-500 flex items-center gap-1.5 -mt-1">
          <XCircle className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
          Passwords do not match
        </p>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-11 bg-[#111827] hover:bg-[#1f2937] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-[0.98] mt-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Creating account…
          </>
        ) : (
          <>
            Create account
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </>
        )}
      </Button>

      <p className="text-center text-xs text-[#9CA3AF] pt-1">
        Already have an account?{" "}
        <Link
          to="/"
          className="text-[#4F7EF8] font-semibold hover:underline underline-offset-2"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
