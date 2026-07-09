import { AuthBackground } from "@/components/auth/auth-background";
import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <AuthBackground />
      <AuthCard title="Welcome Back!">
        <LoginForm />
      </AuthCard>
    </div>
  );
}
