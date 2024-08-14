import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "@tanstack/react-router";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useEffect } from "react";
import { FormError } from "./form-error";

export const LoginForm = () => {
  const { state } = useAuthContext();
  const { user } = state;
  const router = useRouter();

  useEffect(() => {
    if(user) router.navigate({ to: "/v1/settings" })
  }, [user, router])
  
  const { login, loading, error } = useLogin();
 
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    await login(values.email, values.password);
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Tkdathletics
          </h2>
          <p className="mt-2 text-center text-base text-muted-foreground" >
            Please log into your account.
          </p>
        </div>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-muted-foreground"
              >
                Email address
              </Label>
              <div className="mt-1">
                <FormField
                  disabled={loading}
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="you@example.com"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-muted-foreground"
              >
                Password
              </Label>
              <div className="mt-1">
                <FormField
                  disabled={loading}
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="******"
                          type="password"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex items-center justify-end">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-primary hover:text-primary/90"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <Button
                disabled={loading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-2"
              >
                Login
              </Button>
            </div>
            {error && (
              <FormError message={error}/>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};
