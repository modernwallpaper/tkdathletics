import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { NotificationsSchema } from "../../../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const NotificationsForm = () => {
  const storedValues = localStorage.getItem("notifications");
  const defaultValues = storedValues
    ? JSON.parse(storedValues)
    : {
        allowed: false,
        video_upload: false,
        register_competition: false,
      };

  const form = useForm<z.infer<typeof NotificationsSchema>>({
    resolver: zodResolver(NotificationsSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof NotificationsSchema>) => {
    if (
      (defaultValues.allowed === false && values.allowed === false) ||
      (defaultValues.allowed === true && values.allowed === false)
    ) {
      localStorage.setItem(
        "notifications",
        JSON.stringify({
          allowed: false,
          video_upload: false,
          register_competition: false,
        }),
      );
      sessionStorage.setItem(
        "toastMessage",
        "Notifications have been disabled",
      );
      window.location.reload();
    } else {
      localStorage.setItem("notifications", JSON.stringify(values));
      sessionStorage.setItem(
        "toastMessage",
        "Notifications updated successfully",
      );
      window.location.reload();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 mb-3">
          <FormField
            control={form.control}
            name="allowed"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Allow Notifications
                  </FormLabel>
                  <FormDescription>
                    Allow us to send you notifications.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="video_upload"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Video notifications
                  </FormLabel>
                  <FormDescription>
                    Receive notifications about new videos to analyze.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={defaultValues.allowed === false}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="register_competition"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Competition notifications
                  </FormLabel>
                  <FormDescription>
                    Receive notifications about new registrations for
                    competitions and more.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={defaultValues.allowed === false}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};
