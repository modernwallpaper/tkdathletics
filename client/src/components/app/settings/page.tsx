import { PageHeader } from "../page-header";
import { Nav } from "./nav";
import { Outlet } from "@tanstack/react-router";

export const SettingsPage = () => {
  return (
    <div className="h-full w-full">
      <PageHeader label="Settings" />
      <div className="flex h-full w-full">
        <div className="md:hidden flex-col">
          <div>
            <Nav />
          </div>
          <div className="mt-6">
            <Outlet />
          </div>
        </div>
        <div className="md:flex hidden w-full h-full">
          <div className="mr-8">
            <Nav />
          </div>
          <div className="mt-6 ml-10 w-full h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
