import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Users } from "lucide-react";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F4F3EF]">
        <div className="flex flex-col items-center gap-5">
          {/* Animated logo mark */}
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 rounded-2xl bg-[#111827] flex items-center justify-center">
              <Users className="w-7 h-7 text-white" strokeWidth={1.6} />
            </div>
            {/* Spinning ring */}
            <svg
              className="absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)] animate-spin"
              viewBox="0 0 64 64"
              fill="none"
            >
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="#4F7EF8"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="44 132"
              />
            </svg>
          </div>

          <div className="text-center space-y-1">
            <p className="text-sm font-semibold text-[#111827] tracking-wide">
              WRL EMS
            </p>
            <p className="text-xs text-[#9CA3AF]">
              Authenticating your session…
            </p>
          </div>

          {/* Skeleton shimmer bar */}
          <div className="w-48 h-1.5 bg-[#E5E3DE] rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-[#4F7EF8] via-[#7C9FFB] to-[#4F7EF8] rounded-full animate-pulse"
              style={{ backgroundSize: "200% 100%" }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
