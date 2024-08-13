import { Button } from "@/components/ui/button";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import { useAuthContext } from "@/hooks/useAuthContext";
import { LoginForm } from "@/components/app/login-form";

export const Route = createFileRoute("/login/")({
  component: () => <LoginForm />,
});

const Comp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, loading } = useLogin();

  const router = useRouter();

  const { state } = useAuthContext();
  const { user } = state;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      router.navigate({ to: "/v1/settings" });
    }
  };

  if (user) {
    router.navigate({ to: "/v1/settings" });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 w-96 m-5">
        <h3>Login</h3>
        <div className="flex flex-col">
          <label>Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="flex flex-col">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <Button type="submit" disabled={loading}>
          Login
        </Button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};
