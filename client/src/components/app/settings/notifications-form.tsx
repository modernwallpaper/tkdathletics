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
import { toast } from "@/components/ui/use-toast";
import { NotificationsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const NotificationsForm = () => {
  const storedValues = localStorage.getItem("notifications");
  const defaultValues = storedValues
    ? JSON.parse(storedValues)
    : {
      video_upload: false,
      register_competition: false,
    };

  const form = useForm<z.infer<typeof NotificationsSchema>>({
    resolver: zodResolver(NotificationsSchema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof NotificationsSchema>) => {
    localStorage.setItem("notifications", JSON.stringify(values));
    toast({ description: "Notifications saved successfully" });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 mb-3">
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
