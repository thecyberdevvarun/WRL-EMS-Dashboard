import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";

export default function Signup() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start managing your organization with WRL EMS."
    >
      <SignupForm />
    </AuthLayout>
  );
}