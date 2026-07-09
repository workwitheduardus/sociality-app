import { AuthBackground } from "@/components/auth/auth-background";
import { AuthCard } from "@/components/auth/auth-card";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center py-10">
      <AuthBackground />
      <AuthCard title="Register">
        <RegisterForm />
      </AuthCard>
    </div>
  );
}
