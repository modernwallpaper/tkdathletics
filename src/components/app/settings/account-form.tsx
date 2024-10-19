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
import { UpdateUserSchema } from "../../../../schemas";
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

  const form = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: user.name ? user.name : undefined,
      email: user.email ? user.email : undefined,
      surname: user.surname ? user.surname : undefined,
    },
  });

  console.log(user.surname)

  const onSubmit = async (values: z.infer<typeof UpdateUserSchema>) => {
    console.log("Submit requested")
    if (user.id) {
      await update({ ...values, timestamp: JSON.stringify(new Date()), id: user.id}, user.id);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={(e) => { 
          form.handleSubmit(onSubmit)(e);
          console.log("Form submission triggerd");
        }}>
          <div className="flex flex-col gap-y-4 mb-3 w-full">
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
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surname</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="surname" />
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
