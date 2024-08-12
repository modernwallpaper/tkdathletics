import { Button } from "@/components/ui/button";
import { useLocation } from "@tanstack/react-router";
import { Bell, FileText, User } from "lucide-react";

export const Nav = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col items-center justify-start mt-6 w-min">
      <ul>
        <li>
          <a href="/v1/settings/account/">
            <Button
              variant={"nav_link"}
              size={"sm"}
              className={
                pathname === "/v1/settings/account/"
                  ? "text-primary font-normal"
                  : "text-muted-foreground hover:text-primary font-normal"
              }
            >
              <User className="h-4 w-4 mr-2" />
              <p>Account</p>
            </Button>
          </a>
        </li>
        <li>
          <a href="/v1/settings/competition-data/">
            <Button
              variant={"nav_link"}
              size={"sm"}
              className={
                pathname === "/v1/settings/competition-data/"
                  ? "text-primary font-normal"
                  : "text-muted-foreground hover:text-primary font-normal"
              }
            >
              <FileText className="h-4 w-4 mr-2" />
              <p>Competition data</p>
            </Button>
          </a>
        </li>
        <li>
          <a href="/v1/settings/notifications/">
            <Button
              variant={"nav_link"}
              size={"sm"}
              className={
                pathname === "/v1/settings/notifications/"
                  ? "text-primary font-normal"
                  : "text-muted-foreground hover:text-primary font-normal"
              }
            >
              <Bell className="w-4 h-4 mr-2"/>
              <p>Notifications</p>
            </Button>
          </a>
        </li>
      </ul>
    </div>
  );
};
