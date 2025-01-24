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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useAuthContext } from "@/hooks/useAuthContext";

export const Navbar = () => {
  // Get the current pathname
  const location = useLocation();
  const pathname = location.pathname;

  //Get the current user
  const { state } = useAuthContext();
  const user = state.user;

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md supports-[backdrop-filter]:bg-background/60 flex justify-between items-center h-[60px] lg:pr-14 lg:pl-14">
      <div className="flex w-full lg:hidden justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"outline"} size={"icon"} className="ml-2">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="h-full">
            <SheetTitle className="pl-3">Tkdatheltics</SheetTitle>
            <div className="flex flex-col gap-y-2 items-start h-full justify-between">
              <div className="w-full">
                <ul>
                  {user?.authority === "ADMIN" && (
                    <li>
                      <Button
                        asChild
                        variant={"nav_link"}
                        className={
                          pathname === "/v1/admin"
                            || pathname.startsWith("/v1/admin")
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary"
                        }
                      >
                        <a href="/v1/admin">Admin</a>
                      </Button>
                    </li>
                  )}
                  <li>
                    <Button
                      asChild
                      variant={"nav_link"}
                      className={
                        pathname === "/v1/analysis"
                          || pathname.startsWith("/v1/analysis")
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
                          || pathname.startsWith("/v1/events")
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
                          || pathname.startsWith("/v1/competitions")
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
                          || pathname.startsWith("/v1/scoreboard")
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
                          || pathname.startsWith("/v1/training")
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }
                    >
                      <a href={"/v1/training"}>Training</a>
                    </Button>
                  </li>
                  <li className="w-full">
                    <Accordion
                      type="single"
                      className="ml-4 w-[90%] no-underline p-0"
                      collapsible
                    >
                      <AccordionItem value="item-1" className="w-full">
                        <AccordionTrigger
                          className={
                            pathname === "/v1/settings"
                            || pathname.startsWith("/v1/settings")
                              ? "text-sm no-underline"
                              : "text-muted-foreground text-sm"
                          }
                        >
                          Settings
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col justify-start items-start w-full">
                          <Button
                            asChild
                            variant={"nav_link"}
                            className={
                              pathname === "/v1/settings/account"
                                || pathname.startsWith("/v1/settings/account")
                                ? "text-foreground pl-0 ml-0"
                                : "text-muted-foreground pl-0 ml-0"
                            }
                          >
                            <a href="/v1/settings/account">Account</a>
                          </Button>
                          <Button
                            asChild
                            variant={"nav_link"}
                            className={
                              pathname === "/v1/settings/competition-data"
                                || pathname.startsWith("/v1/settings/competition-data")
                                ? "text-foreground pl-0 ml-0"
                                : "text-muted-foreground pl-0 ml-0"
                            }
                          >
                            <a href="/v1/settings/competition-data">
                              Competition Data
                            </a>
                          </Button>
                          <Button
                            asChild
                            variant={"nav_link"}
                            className={
                              pathname === "/v1/settings/notifications"
                                || pathname.startsWith("/v1/settings/notifications")
                                ? "text-foreground pl-0 ml-0"
                                : "text-muted-foreground pl-0 ml-0"
                            }
                          >
                            <a href="/v1/settings/notifications">
                              Notifications
                            </a>
                          </Button>
                          <Button
                            asChild
                            variant={"nav_link"}
                            className={
                              pathname === "/v1/settings/offline"
                                || pathname.startsWith("/v1/settings/offline")
                                ? "text-foreground pl-0 ml-0"
                                : "text-muted-foreground pl-0 ml-0"
                            }
                          >
                            <a href="/v1/settings/offline">
                              Offline 
                            </a>
                          </Button>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
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
      <div className="hidden lg:flex items-center justify-between w-full">
        <p className="font-semibold">TKDATHLETICS</p>
        <div className="gap-x-2 items-center">
          {user?.authority === "ADMIN" && (
            <Button
              asChild
              variant={"nav_link"}
              className={
                pathname === "/v1/admin" 
                  || pathname.startsWith("/v1/admin")
                  ? "text-primary border-b border-b-secondary"
                  : "text-muted-foreground hover:text-primary"
              }
            >
              <a href={"/v1/admin"}>Admin</a>
            </Button>
          )}
          <Button
            asChild
            variant={"nav_link"}
            className={
              pathname === "/v1/analysis"
                || pathname.startsWith("/v1/analysis")
                ? "text-primary border-b border-b-secondary"
                : "text-muted-foreground hover:text-primary"
            }
          >
            <div className="flex flex-col h-full">
              <a href={"/v1/analysis"}>Analysis</a>
            </div>
          </Button>
          <Button
            asChild
            variant={"nav_link"}
            className={
              pathname === "/v1/events"
                || pathname.startsWith("/v1/events")
                ? "text-primary border-b border-b-secondary"
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
                || pathname.startsWith("/v1/competitions")
                ? "text-primary border-b border-b-secondary"
                : "text-muted-foreground hover:text-primary"
            }
          >
            <a href={"/v1/competitions"}>Competitions</a>
          </Button>
          <Button
            asChild
            variant={"nav_link"}
            className={
              pathname === "/v1/scorecard"
                || pathname.startsWith("/v1/scorecard")
                ? "text-primary border-b border-b-secondary"
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
                || pathname.startsWith("/v1/training")
                ? "text-primary border-b border-b-secondary"
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
                || pathname.startsWith("/v1/settings")
                ? "text-primary border-b border-b-secondary"
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
