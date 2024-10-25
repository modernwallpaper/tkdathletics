import { Separator } from "@/components/ui/separator";
import { SmalllPageHeader } from "../page-header";
import { NotificationsForm } from "./notifications-form";

export const NotificationsPage = () => {
  return (
    <div>
      <SmalllPageHeader label="Notifications" />
      <p className="text-muted-foreground text-sm">
        Manage your settings for notifications.
      </p>
      <Separator className="mt-6 mb-6" />
      <NotificationsForm />
    </div>
  );
};
