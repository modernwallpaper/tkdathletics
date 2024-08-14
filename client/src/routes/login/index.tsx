import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/app/login-form";

export const Route = createFileRoute("/login/")({
  component: () => <LoginForm />,
});
