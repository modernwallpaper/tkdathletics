import { Button } from "@/components/ui/button"
import { useLocation } from "@tanstack/react-router"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export const Navbar = () => {
  const pathname = useLocation();

  return(
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-between items-center h-[60px] md:pr-20 md:pl-20">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="ml-2 flex items-center justify-center" variant={"secondary"} size={"icon"}>
              <Menu className="h-4 w-4"/>
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetTitle>Menu</SheetTitle>
            <div className="flex-row gap-y-2 items-center">
              <ul>
                <li>
                  <Button asChild variant={"nav_link"} className={pathname.pathname === "/v1/admin" ?  "text-primary" : "text-muted-foreground hover:text-primary"}>
                    <a href={"/v1/admin"}>Admin</a>
                  </Button> 
                </li>
                <li>
                  <Button asChild variant={"nav_link"} className={pathname.pathname === "/v1/analysis" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
                    <a href={"/v1/analysis"}>Analysis</a>
                  </Button> 
                </li>
                <li>
                  <Button asChild variant={"nav_link"} className={pathname.pathname === "/v1/events" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
                    <a href={"/v1/events"}>Events</a>
                  </Button> 
                </li>
                <li>
                  <Button asChild variant={"nav_link"} className={pathname.pathname === "/v1/competitions" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
                    <a href={"/v1/competitions"}>Competitions</a>
                  </Button> 
                </li>
                <li>
                  <Button asChild variant={"nav_link"} className={pathname.pathname === "/v1/scoreboard" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
                    <a href={"/v1/scorecard"}>Scorecard</a>
                  </Button> 
                </li>
                <li>
                  <Button asChild variant={"nav_link"} className={pathname.pathname === "/v1/training" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
                    <a href={"/v1/training"}>Training</a>
                  </Button> 
                </li>
                <li>
                  <Button asChild variant={"nav_link"} className={pathname.pathname === "/v1/settings" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
                    <a href={"/v1/settings"}>Settings</a>
                  </Button> 
                </li>
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:flex gap-x-2 items-center">
        <Button asChild variant={"nav_link"} className={pathname.pathname === "/v1/admin" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
          <a href={"/v1/admin"}>Admin</a>
        </Button> 
        <Button asChild variant={"nav_link"} className={pathname.pathname === "/v1/analysis" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
          <a href={"/v1/analysis"}>Analysis</a>
        </Button> 
        <Button asChild variant={"nav_link"} className={pathname.pathname === "/v1/events" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
          <a href={"/v1/events"}>Events</a>
        </Button> 
        <Button asChild variant={"nav_link"} className={pathname.pathname === "/v1/competitions" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
          <a href={"/v1/competitions"}>Competitions</a>
        </Button> 
        <Button asChild variant={"nav_link"} className={pathname.pathname === "/v1/scoreboard" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
          <a href={"/v1/scorecard"}>Scorecard</a>
        </Button> 
        <Button asChild variant={"nav_link"} className={pathname.pathname === "/v1/training" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
          <a href={"/v1/training"}>Training</a>
        </Button> 
        <Button asChild variant={"nav_link"} className={pathname.pathname === "/v1/settings" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
          <a href={"/v1/settings"}>Settings</a>
        </Button> 
      </div>
    </header>
  )
}
