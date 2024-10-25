import { useForm } from "react-hook-form";
import { CreateUserSchema } from "../../../../../schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/hooks/useRegister";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const CreateUserForm = () => {
  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
  });

  const { register, loading } = useRegister();

  const onSubmit = async (values: z.infer<typeof CreateUserSchema>) => {
    await register(values);
  };

  return (
    <div className="flex flex-col gap-y-2 w-[50%]">
      <CardHeader>
        <CardTitle>Create a user</CardTitle>
        <CardDescription>Enter the new user info</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            disabled={loading}
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="someone" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            disabled={loading}
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="someone" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            disabled={loading}
            control={form.control}
            name="authority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Authority</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={"Select a role"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="USER">User</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            disabled={loading}
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="******" />
                </FormControl>
                <FormDescription>Minimum of 6 characters</FormDescription>
              </FormItem>
            )}
          />
          <Separator className="mt-3" />
          <div className="flex gap-x-2">
            <Button
              disabled={loading}
              asChild
              className="w-full mt-3"
              variant={"secondary"}
            >
              <a href="/v1/admin">Cancel</a>
            </Button>
            <Button disabled={loading} className="w-full mt-3" type="submit">
              <p>Create</p>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
