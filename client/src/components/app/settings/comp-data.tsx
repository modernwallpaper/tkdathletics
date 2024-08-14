import { PageHeader } from "../page-header";
import { CompDataForm } from "./comp-data-form";

export const CompDataPage = () => {
  return (
    <div>
      <PageHeader label="Competition Data" />
      <CompDataForm />
    </div>
  );
};
