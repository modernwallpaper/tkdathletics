import { Separator } from "@/components/ui/separator";
import { PageHeader } from "../page-header";
import { Nav } from "./nav";
import { Outlet } from "@tanstack/react-router";

export const SettingsPage = () => {
  return (
    <div>
      <PageHeader label="Settings" />
      <div className="flex">
        <div className="md:hidden flex-col">
          <div>
            <Nav />
          </div>
          <div className="mt-6">
            <Outlet />
          </div>
        </div>
        <div className="md:flex hidden">
           <Nav />
          <Separator
            orientation="vertical"
            className="md:ml-20 md:h-28 md:mt-6"
          />
          <div className="md:mt-6 md:ml-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
