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

  if (user) {
    const form = useForm<z.infer<typeof UpdateUserAsUserSchema>>({
      resolver: zodResolver(UpdateUserAsUserSchema),
      defaultValues: {
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
      <div className="mt-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-x-2 mb-3">
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
            <Button type="submit" disabled={loading}>Save</Button>
            <div>
              {error && (
                <FormError message={error}/>
              )}
            </div>
          </form>
        </Form>
      </div>
    );
  }
};
