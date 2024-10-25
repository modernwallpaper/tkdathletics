import { Separator } from "@/components/ui/separator";
import { SmalllPageHeader } from "../page-header";
import { CompDataForm } from "./comp-data-form";

export const CompDataPage = () => {
  return (
    <div>
      <SmalllPageHeader label="Competition Data" />
      <p className="text-sm text-muted-foreground">
        On this page you can edit the information that is used to register you
        for a competition.
      </p>
      <Separator className="mt-6 mb-6" />
      <CompDataForm />
    </div>
  );
};
