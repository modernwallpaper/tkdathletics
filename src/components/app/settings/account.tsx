import { Separator } from "@/components/ui/separator"
import { SmalllPageHeader } from "../page-header"
import { AccountForm } from "./account-form"

export const AccontPage = () => {
  return(
    <div className="w-full md:w-full">
      <SmalllPageHeader label="Account" />
      <p className="text-muted-foreground text-sm">On this page you can edit your information that is used to manage your account.</p>
      <Separator className="mt-6 mb-6" />
      <AccountForm />
    </div>
  )
}
