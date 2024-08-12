import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLocation } from "@tanstack/react-router";
import { ModeToggle } from "./mode-toggle";
import { LogoutButton } from "./logout-button";

export const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-between items-center h-[60px] md:pr-20 md:pl-20">
      <div className="flex w-full md:hidden justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"outline"} size={"icon"} className="ml-2">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="h-full">
            <SheetTitle>Menu</SheetTitle>
            <div className="flex flex-col gap-y-2 items-start h-full justify-between">
              <div>
                <ul>
                  <li>
                    <Button
                      asChild
                      variant={"nav_link"}
                      className={
                        pathname === "/v1/admin"
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }
                    >
                      <a href="/v1/admin">Admin</a>
                    </Button>
                  </li>
                  <li>
                    <Button
                      asChild
                      variant={"nav_link"}
                      className={
                        pathname === "/v1/analysis"
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }
                    >
                      <a href={"/v1/analysis"}>Analysis</a>
                    </Button>
                  </li>
                  <li>
                    <Button
                      asChild
                      variant={"nav_link"}
                      className={
                        pathname === "/v1/events"
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }
                    >
                      <a href={"/v1/events"}>Events</a>
                    </Button>
                  </li>
                  <li>
                    <Button
                      asChild
                      variant={"nav_link"}
                      className={
                        pathname === "/v1/competitions"
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }
                    >
                      <a href={"/v1/competitions"}>Competitions</a>
                    </Button>
                  </li>
                  <li>
                    <Button
                      asChild
                      variant={"nav_link"}
                      className={
                        pathname === "/v1/scoreboard"
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }
                    >
                      <a href={"/v1/scorecard"}>Scorecard</a>
                    </Button>
                  </li>
                  <li>
                    <Button
                      asChild
                      variant={"nav_link"}
                      className={
                        pathname === "/v1/training"
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }
                    >
                      <a href={"/v1/training"}>Training</a>
                    </Button>
                  </li>
                  <li>
                    <Button
                      asChild
                      variant={"nav_link"}
                      className={
                        pathname === "/v1/settings"
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }
                    >
                      <a href={"/v1/settings"}>Settings</a>
                    </Button>
                  </li>
                </ul>
              </div>
              <div className="w-full mb-10">
                <LogoutButton />
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="mr-2">
          <ModeToggle />
        </div>
      </div>
      <div className="hidden md:flex items-center justify-between w-full">
        <div className="gap-x-2 items-center">
          <Button
            asChild
            variant={"nav_link"}
            className={
              pathname === "/v1/admin"
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }
          >
            <a href={"/v1/admin"}>Admin</a>
          </Button>
          <Button
            asChild
            variant={"nav_link"}
            className={
              pathname === "/v1/analysis"
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }
          >
            <a href={"/v1/analysis"}>Analysis</a>
          </Button>
          <Button
            asChild
            variant={"nav_link"}
            className={
              pathname === "/v1/events"
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }
          >
            <a href={"/v1/events"}>Events</a>
          </Button>
          <Button
            asChild
            variant={"nav_link"}
            className={
              pathname === "/v1/competitions"
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }
          >
            <a href={"/v1/competitions"}>Competitions</a>
          </Button>
          <Button
            asChild
            variant={"nav_link"}
            className={
              pathname === "/v1/scoreboard"
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }
          >
            <a href={"/v1/scorecard"}>Scorecard</a>
          </Button>
          <Button
            asChild
            variant={"nav_link"}
            className={
              pathname === "/v1/training"
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }
          >
            <a href={"/v1/training"}>Training</a>
          </Button>
          <Button
            asChild
            variant={"nav_link"}
            className={
              pathname === "/v1/settings"
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }
          >
            <a href={"/v1/settings"}>Settings</a>
          </Button>
        </div>
        <div className="flex items-center gap-x-2 justify-center">
          <div className="w-32">
            <LogoutButton />
          </div>
          <div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
