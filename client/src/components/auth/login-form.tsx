import { CardWrapper } from "./card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage }from "@/components/ui/form"
import * as z from "zod"
import { LoginSchema } from "@/schemas"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../app/form-error"
import { useEffect, useState } from "react"
import { useRouter } from "@tanstack/react-router"
import { useDispatch, useSelector } from "react-redux"
import { useGetProfileMutation, useLoginMutation } from "@/slices/user.api.slice"
import { RootState } from "@/store"
import { setCredentials } from "@/slices/auth.slice"

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");

  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { user } = useSelector((state: RootState) => state.auth);
  const [getProfile] = useGetProfileMutation();

  useEffect(() => {
    console.clear();
    if(user) router.navigate({ to: '/settings' });
  }, [router, user]);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    try {
      const loginResponse = await login(values).unwrap();

      if (loginResponse) {
        const userdata = await getProfile({}).unwrap();
        dispatch(setCredentials({ ...userdata }));
        router.navigate({ to: '/settings' });
        console.clear();
      }
    } catch (error: any) {
      if(error && error.data && error.data.error) {
        setError(error.data.error);
      } else {
        setError("An unexpected error occured");
      }
    }
  }

  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Forgot your password?"
      backButtonHref="/reset-password"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField 
              disabled={isLoading}
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex w-full justify-between items-center">
                    <p>Email</p>
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="someone@example.com" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField 
              disabled={isLoading}
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex w-full justify-between items-center">
                    <p>Password</p>
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="******" type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormError message={error}/>
          <Button type="submit" className="w-full" disabled={isLoading}> 
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
