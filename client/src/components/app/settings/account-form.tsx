import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useUpdateUserAsUser } from "@/hooks/useUpdateUserAsUser";
import { UpdateUserAsUserSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormError } from "../form-error";

export const AccountForm = () => {
  const { state } = useAuthContext();
  const { user } = state;
  const { error, loading, update } = useUpdateUserAsUser();

  if (!user) {
    return null;
  }
  
  const form = useForm<z.infer<typeof UpdateUserAsUserSchema>>({
    resolver: zodResolver(UpdateUserAsUserSchema),
    defaultValues: {
      username: user.username,
      name: user.name,
      surename: user.surename,
      email: user.email,
    },
  });

  const onSubmit = async (values: z.infer<typeof UpdateUserAsUserSchema>) => {
    if (user.id) {
      await update(values, user.id);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-4 mb-3 w-full">
            <FormField
              control={form.control}
              name="username"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="username" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              disabled={loading}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="name" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              disabled={loading}
              control={form.control}
              name="surename"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surename</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="surename" />
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
                    <Input {...field} placeholder="email" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div>{error && <FormError message={error} />}</div>
          <Button type="submit" disabled={loading}>
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};
