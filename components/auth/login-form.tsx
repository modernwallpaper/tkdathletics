"use client"
import { CardWrapper } from "./card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel }from "@/components/ui/form"
import * as z from "zod"
import { LoginSchema } from "@/schemas"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../app/form-error"
import { FormSuccess } from "../app/form-success"
import { login } from "@/actions/login"
import { useState, useTransition } from "react"

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }

  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField 
              disabled={isPending}
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="name@example.com"/>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField 
              disabled={isPending}
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="******"/>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormError message={error}/>
          <FormSuccess message={success}/>
          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
